import express from "express";

import userController from "../controllers/userController";

import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";

const router = express.Router();

// /api/user
router.get("/", jwtCheck, jwtParse, userController.getCurrentUser);
router.post("/", jwtCheck, userController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateUserRequest,
  userController.updateCurrentUser
);

export default router;
