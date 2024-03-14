import express from "express";
import multer from "multer";

import myRestaurantController from "../controllers/myRestaurantController";

import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1025, //5mb
  },
});

// /api/my/restuarnt
router.get("/", jwtCheck, jwtParse, myRestaurantController.getMyRestaurant);
router.post(
  "/",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  myRestaurantController.createMyRestaurant
);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  myRestaurantController.updateMyRestaurant
);

router.delete(
  "/",
  jwtCheck,
  jwtParse,
  myRestaurantController.deleteMyRestaurant
);

export default router;
