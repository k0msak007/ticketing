import express from "express";
import jwt from "jsonwebtoken";
import { currentUser, requireAuth } from "@sgtickets007/common";
import {  } from "@sgtickets007/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({currentUser: req.currentUser || null})
});

export { router as currentUserRouter };
