import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
} from "../controllers/movie-controller";
const movieRouter = express.Router();
movieRouter.get("/api/v1.0/moviebookings/", getAllMovies);
movieRouter.get("/api/v1.0/moviebooking/movie/:id", getMovieById);
movieRouter.post("/api/v1.0/moviebooking/addMovie", addMovie);

export default movieRouter;
