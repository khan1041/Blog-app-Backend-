import express from "express";
import {
  getAdmins,
  getMyProfile,
  login,
  logout,
  register
} from "../controler/usercontroler.js";
import { isAuthenticated } from "../midelware/isAdmin.js";
const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.get("/admins", getAdmins);

export default router;