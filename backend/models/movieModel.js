module.exports = {
    validateMovie(movie) {
      return movie.movie_id && movie.movie_name && movie.movie_category;
    }
};