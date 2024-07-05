import express from "express";
import AltiumCtrl from "./reviews.controller.js";

const router = express.Router();

router.route("/movie/:id").get(AltiumCtrl.apiGetReviews);
router.route("/new").post(AltiumCtrl.apiPostReview);
router.route("/:id")
    .get(AltiumCtrl.apiGetReview)
    .put(AltiumCtrl.apiUpdateReview)
    .delete(AltiumCtrl.apiDeleteReview)

export default router;