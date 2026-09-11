const { MongoClient } = require("mongodb");
const uri = 'mongodb://localhost:27017';
const dbName = 'movie_booking';

exports.getBookingHistoryByUserId = async (req, res) => {
  const userId = req.user.user_id;

  try {
    /*Connect to database */
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    /*Get user booking*/
    const bookings = await db.collection('bookings').find({ user_id: userId }).toArray();

    for (let booking of bookings) {
      /*Get movie name from showing_movie_id*/
      const movie = await db.collection("movies").findOne({ movie_id: booking.showing_movie_id });
      if (movie) {
        booking.movie_name = movie.movie_name;
      } 
    }

    /*Close connection and send data */
    await client.close();
    res.json(bookings);
  } catch (error) {
    /*return error */
    res.status(500).json({ error: error.message });
  }
};
