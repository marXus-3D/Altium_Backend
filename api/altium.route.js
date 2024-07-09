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
    .delete(AltiumCtrl.deleteFollowers)
    .post(AltiumCtrl.postFollower);
router.route("/followers/:id")
    .get(AltiumCtrl.getFollowers);
router.route("/posts")
    .post(AltiumCtrl.postPosts);
router.route("/posts/:id")
    .get(AltiumCtrl.getPost);
router.route("/like")
    .delete(AltiumCtrl.deleteLike)
    .post(AltiumCtrl.postLike);
// router.route("/movie/:id").get(AltiumCtrl.apiGetReviews);
// router.route("/new").post(AltiumCtrl.apiPostReview);
// router.route("/:id")
//     .get(AltiumCtrl.apiGetReview)
//     .put(AltiumCtrl.apiUpdateReview)
//     .delete(AltiumCtrl.apiDeleteReview)

export default router;