import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import Movie from "../models/Movie";
export const addMovie = async (req, res, next) => {
  console.log(req.headers);
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;

  // verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });
console.log(adminId,"adminId.....");
  //create new movie
// let adminId="6475bc42469f5cfc524db919"
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() == "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: adminId,
      posterUrl,
      title,
    });
    // const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    // session.startTransaction();
    await movie.save();
   await adminUser.addedMovies.push(movie);
    await adminUser.save();
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ movie });
};
export const addMovie1 = async (req, res, next) => {
  const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
    let movie;
      try {
        movie = await Movie.create({
          description,
          releaseDate: new Date(`${releaseDate}`),
          featured,
          actors,
          posterUrl,
          title,
        });
        
        return res.status(201).json({movie})

    }catch(err){
      console.log(err);
      return res.status(422).json({err:err})
    }
}
// export const getAllMovies=(req,res,next)=>{
//   console.log("hitting get all movies");
//   res.status(200).json({message:"calling"})
// }

export const getAllMovies= async (req, res, next) => {
  console.log("hitting get all movies");
  let movies;
  try {
    movies = await Movie.find();
    console.log(movies);
  } catch (err) {
    return console.log(err);
  }

  if (!movies) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ movies });
};

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie ID" });
  }

  return res.status(200).json({ movie });
};
