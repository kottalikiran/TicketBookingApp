import express from "express";
import {
  deleteUser,
  getAllUsers,
  getBookingsOfUser,
  getUserById,
  login,
  singup,
  updateUser,
} from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/api/v1.0/moviebooking/", getAllUsers);
userRouter.get("/api/v1.0/moviebooking/:id", getUserById);
userRouter.post("/api/v1.0/moviebooking/register", singup);
userRouter.put("/api/v1.0/moviebooking/:id", updateUser);
userRouter.delete("/api/v1.0/moviebooking/:id", deleteUser);
userRouter.post("/api/v1.0/moviebooking/login", login);
userRouter.get("/api/v1.0/moviebooking/bookings/:id", getBookingsOfUser);

export default userRouter;
