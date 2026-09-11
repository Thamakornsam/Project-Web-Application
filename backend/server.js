const express = require('express');
const cors = require('cors');
const bookingRoutes = require("./routes/bookingRoutes")
const couponRoutes = require("./routes/couponRoutes")
const movieRoutes = require("./routes/movieRoutes")
const userRoutes = require("./routes/userRoutes")
const historyRoutes = require("./routes/historyRoutes");
const paymentRoutes = require('./routes/paymentRoute'); 
const path = require('path');

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors());

//Declare Router 
app.use('/api/bookings', bookingRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use("/api/history", historyRoutes);
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/api/payments', paymentRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

