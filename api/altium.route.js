import express from "express";
import AltiumCtrl from "./altium.controller.js";

const router = express.Router();

router.route("/users/:id")
    .get((req,res) => {
        res.send(
            {
                "User with specific id":req.headers,
            }
        );
    })
    .put(AltiumCtrl.updateUser);
router.route("/users").get((req,res) => {
    res.send(
        {
            "All users":req.headers,
        }
    );
});
router.route("/users").post(AltiumCtrl.postUser);
// router.route("/movie/:id").get(AltiumCtrl.apiGetReviews);
// router.route("/new").post(AltiumCtrl.apiPostReview);
// router.route("/:id")
//     .get(AltiumCtrl.apiGetReview)
//     .put(AltiumCtrl.apiUpdateReview)
//     .delete(AltiumCtrl.apiDeleteReview)

export default router;