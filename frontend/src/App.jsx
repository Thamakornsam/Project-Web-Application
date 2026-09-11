import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, useLocation } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import MovieShowtime from "./pages/MovieShowtime";
import BookingSeats from "./pages/BookingSeats";
import Coupon from "./pages/Coupon";
import History from "./pages/History";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import MovieShowDescription from "./pages/MovieShowDescription";
import Payment from "./pages/Payment";

import { Outlet } from "react-router-dom";
import "./App.css";
import background from './images/background.jpg';

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div id="root">
      {!isAuthPage && (
        <header style={{position: "fixed", width: "100%"}}>
          <Menu />  
        </header>
      )}

      <div className="container" style={{ paddingTop: "80px" }}>
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="movieShowtime/:movieId" element={<MovieShowtime />} />
      <Route path="movieShowtime/:movieId/description" element={<MovieShowDescription />} /> 
      <Route path="bookingSeats/:movieId/:date/:cinema/:theaterName/:time" element={<BookingSeats />} /> 
      <Route path="bookingSeats/:movieId/:date/:cinema/:theaterName/:time/:seats/:price" element={<Payment />} /> 
      <Route path="coupon" element={<Coupon />} />
      <Route path="history" element={<History />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

const App = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        height: "auto",
      }}
    >
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
