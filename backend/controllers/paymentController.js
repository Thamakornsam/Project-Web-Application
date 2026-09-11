const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'movie_booking';

// Handles payment processing and booking confirmation.
exports.processPayment = async (req, res) => {
    let client;
    try {
        const userId = req.user.user_id;

        const {
            showing_movie_id,
            date,
            cinema,
            theaterName,
            time,
            seats,
            totalAmount,
            paymentMethod,
            coupon_id
        } = req.body;

        // Validate incoming data
        if (!showing_movie_id || !userId || !date || !cinema || !theaterName || !time || !seats || !Array.isArray(seats) || seats.length === 0 || !totalAmount || !paymentMethod || coupon_id === undefined) {
            return res.status(400).json({ message: 'Missing or invalid booking/payment details.' });
        }

        client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const bookingsCollection = db.collection('bookings');
        const showingMoviesCollection = db.collection('showing_movies');

        // Simulate Payment Gateway Interaction
        const paymentSuccessful = Math.random() > 0.01; // Simulate success/failure (99% success)

        if (!paymentSuccessful) {
            return res.status(400).json({
                message: 'Payment failed. Please try again.',
                status: 'failed'
            });
        }

        // Generate next booking_id
        const latestBooking = await bookingsCollection.find().sort({ booking_id: -1 }).limit(1).toArray();
        const nextBookingId = latestBooking.length > 0 ? latestBooking[0].booking_id + 1 : 1;

        // Insert into 'bookings' collection
        const bookingRecord = {
            booking_id: nextBookingId,
            user_id: parseInt(userId),
            showing_movie_id: parseInt(showing_movie_id),
            date: date,
            cinema_name: cinema,
            theater_name: theaterName,
            time: time,
            seat_number: seats,
            type_payment: paymentMethod,
            total_price: parseFloat(totalAmount),
            coupon_id: parseFloat(coupon_id),
        };

        await bookingsCollection.insertOne(bookingRecord);

        //  Update 'showing_movies' seats status
        const parsedShowingMovieId = parseInt(showing_movie_id);

        const updateResult = await showingMoviesCollection.updateOne(
            {
                "movie_id": parsedShowingMovieId,
                "dates.date": date,
                "dates.cinemas.cinema": cinema,
                "dates.cinemas.theaterDetails.theaterName": theaterName,
                "dates.cinemas.theaterDetails.times.time": time,
                "dates.cinemas.theaterDetails.times.seats": {
                    $elemMatch: { seatId: { $in: seats }, isBooked: false }
                }
            },
            {
                $set: {
                    "dates.$[dateElem].cinemas.$[cinemaElem].theaterDetails.$[theaterDetailElem].times.$[timeElem].seats.$[seatElem].isBooked": true
                }
            },
            {
                arrayFilters: [
                    { "dateElem.date": date },
                    { "cinemaElem.cinema": cinema },
                    { "theaterDetailElem.theaterName": theaterName },
                    { "timeElem.time": time },
                    { "seatElem.seatId": { $in: seats }, "seatElem.isBooked": false }
                ]
            }
        );

        // Ensure seats were actually updated after payment
        if (updateResult.matchedCount === 0 || updateResult.modifiedCount === 0) {
            console.error("CRITICAL: Payment succeeded, but unable to mark seats as booked in showing_movies.");
        }

        // Success response
        res.status(200).json({
            message: 'Payment processed and booking confirmed successfully!',
            status: 'success',
            booking_id: nextBookingId,
            seats_booked: seats
        });

    } catch (error) {
        console.error('Error processing payment or booking:', error);
        res.status(500).json({
            message: 'Internal server error during payment and booking confirmation.',
            error: error.message
        });
    } finally {
        if (client) {
            await client.close();
        }
    }
};