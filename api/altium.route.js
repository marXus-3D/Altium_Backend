import express from "express";
import AltiumCtrl from "./altium.controller.js";

const router = express.Router();

router.route("/users/:id").get(AltiumCtrl.getUser).put(AltiumCtrl.updateUser);
router.route("/users").get(AltiumCtrl.getUsers).post(AltiumCtrl.postUser);
router.route("/users/:id/posts").get(AltiumCtrl.getPostByUser);
router
  .route("/followers")
  .delete(AltiumCtrl.deleteFollowers)
  .post(AltiumCtrl.postFollower);
router.route("/followers/:id").get(AltiumCtrl.getFollowers);
router
  .route("/posts")
  .get(AltiumCtrl.getPostForUser)
  .post(AltiumCtrl.postPosts);
router.route("/posts/:id").get(AltiumCtrl.getPost);
router.route("/like").delete(AltiumCtrl.deleteLike).post(AltiumCtrl.postLike);



  // messages and chats
  //fix the routes as fit
router.post("/", addMessage);
router.get("/:chatId", getMessages);

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);
export default router;
