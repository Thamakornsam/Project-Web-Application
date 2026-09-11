module.exports = {
    validateBooking(booking) {
      return booking.booking_id && booking.user_id && booking.showing_movie_id;
    }
};