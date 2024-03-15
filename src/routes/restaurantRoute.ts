import express from "express";
import { param } from "express-validator";

import restaurantController from "../controllers/restaurantController";

const router = express.Router();

// /api/restaurant/search/{params}
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City paramenter must be a valid string"),
  restaurantController.searchRestaurant
);

export default router;
