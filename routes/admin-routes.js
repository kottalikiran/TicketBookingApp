import express from "express";
import {
  addAdmin,
  adminLogin,
  getAdminById,
  getAdmins,
  
} from "../controllers/admin-controller";

const adminRouter = express.Router();

adminRouter.post("/api/v1.0/moviebooking/adminsignup", addAdmin);
adminRouter.post("/api/v1.0/moviebooking/adminlogin", adminLogin);
adminRouter.get("/api/v1.0/moviebookings/admin/:id", getAdminById);

export default adminRouter;
