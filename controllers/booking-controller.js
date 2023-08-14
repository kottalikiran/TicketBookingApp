import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Movie from "../models/Movie";
import User from "../models/User";

export const newBooking = async (req, res, next) => {
  console.log("calling new booking");
  const { movie, date, seatNumber, user } = req.body;
  console.log(movie);

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById({_id:movie});
    existingUser = await User.findById({_id:user});
  } catch (err) {
    return console.log(err);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found with given ID " });
  }
  let booking;

  try {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    booking = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    // await booking.save({ session });

    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await Promise.all([
      booking.save(),
      existingUser.save(),
      existingMovie.save()
    ])
    //  await session.commitTransaction();
    //  session.endSession();
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("user movie");
    console.log(booking);
    // const session = await mongoose.startSession();
    // session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save();
    await booking.user.save();
    // session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
