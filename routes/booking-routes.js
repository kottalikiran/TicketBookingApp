import express from "express";
import {
  deleteBooking,
  getBookingById,
  newBooking,
} from "../controllers/booking-controller";

const bookingsRouter = express.Router();

bookingsRouter.get("/api/v1.0/moviebookings/movie/:id", getBookingById);
bookingsRouter.post("/api/v1.0/moviebooking/newbooking/", newBooking);
bookingsRouter.delete("/api/v1.0/moviebooking/movie/:id", deleteBooking);
export default bookingsRouter;
