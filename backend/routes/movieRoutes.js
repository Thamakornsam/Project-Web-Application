const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

//Route Get for get all movies
router.get('/', movieController.getAllMovies);

//Route Get for get movie by id
router.get('/:id', movieController.getMovieById);

//Route Get for get movie's showtimes by movieId
router.get('/:id/showtime', movieController.showingMovieById);

//Route Get for get movie's showtimes by movieId (Only BookingSeats page)
router.get('/:movieId/showtimes_details', movieController.getShowtimeDetails); 

//Route Post for get movie's bookSeats by movieId
router.post('/book_seats', movieController.bookSeats);


module.exports = router;
