const { MongoClient } = require('mongodb'); 
const uri = 'mongodb://localhost:27017';
const dbName = 'movie_booking';
const connect = require('../db/connection'); 

// Generates the next sequential ID value for a given sequence name.
async function getNextSequenceValue(sequenceName) {
    const clientForSequence = new MongoClient(uri);

    try { // Try to establish a connection to the MongoDB server.
        if (!clientForSequence.isConnected) { // .isConnected connection.js 
            await clientForSequence.connect();
        }
        const db = clientForSequence.db(dbName); // Gets the database instance once connected.
        // Finds and updates a document in the 'counters' collection.
        const sequenceDoc = await db.collection('counters').findOneAndUpdate(
            { _id: sequenceName }, // Filter targets the specific counter document.
            { $inc: { sequence_value: 1 } },  // Update increments the 'sequence_value' field by 1.
            { returnDocument: 'after', upsert: true } // document after the update is returned or if the document doesn't exist, creates a new one and then applies the update.
        );
        if (!sequenceDoc.value) { // If 'findOneAndUpdate' didn't return a value --> starting from 1.
            await db.collection('counters').insertOne({ _id: sequenceName, sequence_value: 1 });
            return 1;
        }
        return sequenceDoc.value.sequence_value;
    } catch (error) {
        console.error("Error in getNextSequenceValue:", error);
        throw new Error("Failed to generate sequence value.");
    } finally {
        if (clientForSequence && clientForSequence.isConnected) {
            await clientForSequence.close();
        }
    }
}

// Get specific showtime details for a given movie, date, cinema, theater, and time.
exports.getShowtimeDetails = async (req, res) => {
    const { movieId, date, cinema, theaterName, time } = req.query; // query params

    if (!movieId || !date || !cinema || !theaterName || !time) {
        return res.status(400).json({ error: 'Missing required showtime parameters.' });
    }

    try {
        const db = await connect();
        const movie_id_int = parseInt(movieId);
        if (isNaN(movie_id_int)) {
            return res.status(400).json({ error: 'Invalid Movie ID.' });
        }

        // To find specific showtime. (on showing_movies)
        const showtimeDetails = await db.collection('showing_movies').aggregate([
            {
                $match: { // Filters documents early in the pipeline that contain the criteria.
                    movie_id: movie_id_int,
                    'dates.date': date,
                    'dates.cinemas.cinema': cinema,
                    'dates.cinemas.theaterDetails.theaterName': theaterName,
                    'dates.cinemas.theaterDetails.times.time': time
                }
            }, // Deconstructs arrays within the documents.
            { $unwind: '$dates' },
            { $unwind: '$dates.cinemas' },
            { $unwind: '$dates.cinemas.theaterDetails' },
            { $unwind: '$dates.cinemas.theaterDetails.times' },
            {
                $match: { // Ensure the criteria match
                    'dates.date': date,
                    'dates.cinemas.cinema': cinema,
                    'dates.cinemas.theaterDetails.theaterName': theaterName,
                    'dates.cinemas.theaterDetails.times.time': time
                }
            },
            { // Reshapes the output document, including only the necessary fields.
                $project: {
                    _id: 0,
                    cinema: '$dates.cinemas.cinema',
                    theaterName: '$dates.cinemas.theaterDetails.theaterName',
                    price: '$dates.cinemas.price',
                    voice: '$dates.cinemas.theaterDetails.voice',
                    time: '$dates.cinemas.theaterDetails.times.time',
                    seats: '$dates.cinemas.theaterDetails.times.seats'
                }
            },
            { $limit: 1 }
        ]).toArray();

        if (showtimeDetails.length === 0) {
            return res.status(404).json({ error: 'Showtime details not found for the selected criteria.' });
        }

        res.json(showtimeDetails[0]);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};


// Create a new booking
exports.createBooking = async (req, res) => {
    
    const { user_id, movie_id, date, cinema, theaterName, time, selectedSeats, total_price, type_payment, coupon_code } = req.body;

    // Input validation
    if (!user_id || !movie_id || !date || !cinema || !theaterName || !time || !selectedSeats || selectedSeats.length === 0 || !total_price || !type_payment) {
        return res.status(400).json({ error: 'Missing required booking information.' });
    }
    if (isNaN(parseInt(user_id)) || isNaN(parseInt(movie_id)) || isNaN(parseFloat(total_price))) {
        return res.status(400).json({ error: 'Invalid numeric values for user_id, movie_id, or total_price.' });
    }

    try {
        const db = await connect();

        // Prepares a list of bulk write operations. Each operation attempts to update a single selected seat.
        const bulkOps = selectedSeats.map(seatName => {
            return {
                updateOne: {
                    filter: { // Ensures that the seat is found and not already booked.
                        movie_id: parseInt(movie_id),
                        'dates.date': date,
                        'dates.cinemas.cinema': cinema,
                        'dates.cinemas.theaterDetails.theaterName': theaterName,
                        'dates.cinemas.theaterDetails.times.time': time,
                        'dates.cinemas.theaterDetails.times.seats': {
                            $elemMatch: {
                                seatId: seatName,
                                isBooked: false
                            }
                        }
                    },
                    update: {
                        $set: { 'dates.$[dateElem].cinemas.$[cinemaElem].theaterDetails.$[detailElem].times.$[timeElem].seats.$[seatElem].isBooked': true }
                    }, // Macth correct data.
                    arrayFilters: [
                        { 'dateElem.date': date },
                        { 'cinemaElem.cinema': cinema },
                        { 'detailElem.theaterName': theaterName },
                        { 'timeElem.time': time },
                        { 'seatElem.seatId': seatName, 'seatElem.isBooked': false }
                    ]
                }
            };
        });

        // Update
        const bulkWriteResult = await db.collection('showing_movies').bulkWrite(bulkOps);

        // Checks if all selected seats were successfully modified
        if (bulkWriteResult.modifiedCount !== selectedSeats.length) {
            const currentlyBookedSeats = [];
            // Re-fetches the showtime details to determine which specific seats caused the conflict.
            const showtimeAfterUpdate = await db.collection('showing_movies').findOne({
                movie_id: parseInt(movie_id),
                'dates.date': date,
                'dates.cinemas.cinema': cinema,
                'dates.cinemas.theaterDetails.theaterName': theaterName,
                'dates.cinemas.theaterDetails.times.time': time
            }, {
                projection: { 'dates.$': 1 }
            });

             // Iterates through the originally selected seats to find out which ones are now booked.
            if (showtimeAfterUpdate && showtimeAfterUpdate.dates && showtimeAfterUpdate.dates.length > 0) {
                const targetDate = showtimeAfterUpdate.dates[0];
                const targetCinema = targetDate.cinemas.find(t => t.cinema === cinema);
                const targetTheaterDetail = targetCinema?.theaterDetails.find(td => td.theaterName === theaterName);
                const targetTimeSlot = targetTheaterDetail?.times.find(t => t.time === time);

                if (targetTimeSlot) {
                    for (const seatName of selectedSeats) {
                        const seat = targetTimeSlot.seats.find(s => s.seatId === seatName);
                        if (seat && seat.isBooked) {
                            currentlyBookedSeats.push(seatName);
                        }
                    }
                }
            }
            return res.status(409).json({
                error: 'Some selected seats are already booked or invalid.',
                failedSeats: currentlyBookedSeats
            });
        }

        const booking_id = await getNextSequenceValue('bookingid');
        const bookingDate = new Date(); // current date and time of the booking.

        // Constructs the new booking document.
        const newBooking = {
            booking_id: booking_id,
            user_id: parseInt(user_id),
            movie_id: parseInt(movie_id),
            date: date,
            cinema: cinema,
            theaterName: theaterName,
            time: time,
            selected_seats: selectedSeats,
            total_price: parseFloat(total_price),
            type_payment: type_payment,
            booking_date: bookingDate,
            status: 'confirmed',
            coupon_code: coupon_code || null
        };

        // Inserts the new booking document into the 'bookings' 
        const result = await db.collection('bookings').insertOne(newBooking);

        // If a coupon code was used, updates its status in the 'coupons'.
        if (coupon_code) {
            const couponUpdateResult = await db.collection('coupons').updateOne(
                { code: coupon_code, status: 'available' },
                { $set: { status: 'used', used_at: new Date(), booking_id: newBooking.booking_id, used_by_user_id: parseInt(user_id) } }
            );
            if (couponUpdateResult.modifiedCount === 0) {
                console.warn(`Coupon ${coupon_code} not found or already used for booking ${newBooking.booking_id}.`);
            }
        }

        res.status(201).json({
            message: 'Booking created successfully',
            booking_id: newBooking.booking_id,
            insertedId: result.insertedId
        });

    } catch (err) {
        res.status(500).json({ error: 'Internal server error during booking.' });
    }
};

// Get all bookings for a specific user
exports.getUserBookings = async (req, res) => {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid User ID.' });
    }

    try {
        const db = await connect();
        const userBookings = await db.collection('bookings').find({ user_id: userId }).toArray();
        res.json(userBookings);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};