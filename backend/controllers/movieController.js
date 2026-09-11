const { MongoClient } = require('mongodb'); 
const uri = 'mongodb://localhost:27017';
const dbName = 'movie_booking';

//Get all movies's information.
exports.getAllMovies = async (req, res) => {
    try {

        //Connect database.
        const client = new MongoClient(uri);
        await client.connect();

        //Find all movies in collection movies.
        const movies = await client.db(dbName).collection('movies').find({}).toArray();
        await client.close();

        //return all movies.
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Get movie 's information by id.
exports.getMovieById = async (req, res) => {
    const movieId = parseInt(req.params.id);
    try {

        //Connect database.
        const client = new MongoClient(uri);
        await client.connect();

        //Find movie in collection movies by movie_id.
        const movie = await client.db(dbName).collection('movies').findOne({ movie_id: movieId });
        await client.close();

        //If don't find movie, return error 404.
        if (!movie) return res.status(404).json({ error: 'Movie not found' });

        //If find movie, return movie.
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//Get movie's showtime by id.
exports.showingMovieById = async (req, res) => {
    const movieId = parseInt(req.params.id);
    try {

        //Connect database.
        const client = new MongoClient(uri);
        await client.connect();

        //Find movie's showtime in collection showing_movies by movie_id.
        const showing_movies = await client.db(dbName).collection('showing_movies').findOne({ movie_id: movieId });
        await client.close();

        //If don't find movie's showtime, return error 404.
        if (!showing_movies) return res.status(404).json({ error: 'Movie not found' });

        //If find movie's showtime, return movie.
        res.json(showing_movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Get specific showtime details (seat availability for booking.)
exports.getShowtimeDetails = async (req, res) => {
  let client;
    try {
        const { movieId } = req.params;
        const { date, cinema, theaterName, time } = req.query;

        const parsedMovieId = parseInt(movieId);

        client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const moviesCollection = db.collection('showing_movies');

        // Find the exact showtime and project relevant details including seats.
        const aggregationPipeline = [
            {
                $match: {
                    movie_id: parsedMovieId,
                    'dates.date': date
                }
            },
            {
                $unwind: '$dates'
            },
            {
                $match: {
                    'dates.date': date // Match date again after unwind
                }
            },
            {
                $unwind: '$dates.cinemas'
            },
            {
                $match: {
                    'dates.cinemas.cinema': cinema // Match cinema after unwind
                }
            },
            {
                $unwind: '$dates.cinemas.theaterDetails'
            },
            {
                $match: {
                    'dates.cinemas.theaterDetails.theaterName': theaterName // Match theaterName after unwind
                }
            },
            {
                $unwind: '$dates.cinemas.theaterDetails.times'
            },
            {
                $match: {
                    'dates.cinemas.theaterDetails.times.time': time // Match time after unwind
                }
            },
            {
                // Project for specific field that Frontend want.
                $project: {
                    _id: 0, 
                    date: '$dates.date',
                    cinema: '$dates.cinemas.cinema',
                    theaterName: '$dates.cinemas.theaterDetails.theaterName',
                    price: '$dates.cinemas.price',
                    time: '$dates.cinemas.theaterDetails.times.time',
                    seats: '$dates.cinemas.theaterDetails.times.seats'
                }
            }
        ];

        const result = await moviesCollection.aggregate(aggregationPipeline).toArray();


        if (result.length > 0) {
            const specificShowtimeDetails = result[0]; 
            return res.status(200).json(specificShowtimeDetails);
        } else {
            return res.status(404).json({ message: 'Movie showtime details not found.' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    } finally {
      if (client) { 
        await client.close();
    }
    }

};

// Handles the booking of specific seats for a showtime by marking them as booked.
exports.bookSeats = async (req, res) => {
  let client;
  try {
      const { movieId, date, cinema, theaterName, time, seats } = req.body; 

      if (!movieId || !date || !cinema || !theaterName || !time || !seats || !Array.isArray(seats) || seats.length === 0) {
          return res.status(400).json({ message: 'Missing or invalid booking details.' });
      }

      client = new MongoClient(uri);
      await client.connect();
      const db = client.db(dbName);
      const moviesCollection = db.collection('showing_movies');

      const parsedMovieId = parseInt(movieId);
      if (isNaN(parsedMovieId)) {
          return res.status(400).json({ message: 'Invalid movie ID.' });
      }

    // Constructs update operations for each seat.
      const updateOperations = seats.map(seatId => ({
          [`dates.$.cinemas.$[cinemaElem].theaterDetails.$[theaterDetailElem].times.$[timeElem].seats.$[seatElem].isBooked`]: true
      }));

      const result = await moviesCollection.updateOne(
          {
              "movie_id": parsedMovieId,
              "dates.date": date,
              "dates.cinemas.cinema": cinema,
              "dates.cinemas.theaterDetails.theaterName": theaterName,
              "dates.cinemas.theaterDetails.times.time": time
          },
          {
              $set: Object.assign({}, ...updateOperations) // combine multiple updates into one $set
          },
          {
              arrayFilters: [
                  { "cinemaElem.cinema": cinema },
                  { "theaterDetailElem.theaterName": theaterName },
                  { "timeElem.time": time },
                  { "seatElem.seatId": { $in: seats } } // Attempts to match multiple seats for a single update.
              ]
          }
      );

      if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'No matching showtime found to book seats.' });
      }

      if (result.modifiedCount === 0) {
          return res.status(409).json({ message: 'Seats might already be booked or seat IDs are incorrect.' });
      }

      res.status(200).json({ message: 'Seats booked successfully!', modifiedCount: result.modifiedCount });

  } catch (error) {
      res.status(500).json({ message: 'Internal server error during seat booking.', error: error.message });
  } finally {
      if (client) {
          await client.close();
      }
  }
};