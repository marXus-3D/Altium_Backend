import express from "express";
import AltiumCtrl from "./altium.controller.js";

const router = express.Router();

router.route("/users/:id")
    .get(AltiumCtrl.getUser)
    .put(AltiumCtrl.updateUser);
router.route("/users")
    .get(AltiumCtrl.getUsers)
    .post(AltiumCtrl.postUser);
router.route("/followers")
    .post(AltiumCtrl.postFollower);
// router.route("/movie/:id").get(AltiumCtrl.apiGetReviews);
// router.route("/new").post(AltiumCtrl.apiPostReview);
// router.route("/:id")
//     .get(AltiumCtrl.apiGetReview)
//     .put(AltiumCtrl.apiUpdateReview)
//     .delete(AltiumCtrl.apiDeleteReview)

export default router;