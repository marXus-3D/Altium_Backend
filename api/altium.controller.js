import AltiumDAO from "../dao/altiumDAO.js";

export default class AltiumController {
  static async postUser(req, res, next) {
    try {
      console.log("Posting user....");
      // const uid = AltiumController.uuidv4();
      const user = {
        user_id: req.body.user_id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        f_name: req.body.fname,
        l_name: req.body.lname,
        bio: req.body.bio,
        profile_picture: req.body.ppic,
        followers: 0,
        following: 0,
        acc_type: req.body.acc_type,
      };
      let account;
      if (user.acc_type == "Student") {
        account = {
          user_id: user.user_id,
          student_id: user.f_name + user.l_name,
          batch: req.body.batch,
        };
      } else {
        account = {
          user_id: user.user_id,
          education_level: req.body.education_level,
          f,
        };
      }

      const userResponse = await AltiumDAO.addUser(user, account);
      res.status(200).json({ status: "success" });
      console.log(user);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  static async updateUser(req, res, next) {
    try {
      console.log("updating user....");
      const user = {
        user_id: req.params.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        f_name: req.body.fname,
        l_name: req.body.lname,
        bio: req.body.bio,
        profile_picture: req.body.ppic,
        followers: parseInt(req.body.followers),
        acc_type: req.body.acc_type,
      };
      const userResponse = await AltiumDAO.updateUser(user);

      res.status(200).json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async deleteUser(req, res, next) {
    try {
      console.log(
        `deleting user ${req.params.id}`
      );
      const deleteResponse = await AltiumDAO.deleteUser(req.params.id);
      res.status(200).json({ status: "success" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  static async getUser(req, res, next) {
    try {
      console.log(`getting user.... ${req.params.id}`);

      const id = req.params.id;

      if (AltiumController.isValidEmail(id)) {
        const userResponse = await AltiumDAO.getUserWithEmail(id);
        res.status(200).json(userResponse);
      } else {
        const userResponse = await AltiumDAO.getUser(id);
        res.status(200).json(userResponse);
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Return true if the email matches the regex, false otherwise
    return emailRegex.test(email);
  }

  static async getUsers(req, res, next) {
    try {
      console.log(`getting users....`);
      const userResponse = await AltiumDAO.getUsers();

      res.status(200).json(userResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static generatePostId() {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000000); // More random digits
    return `post-${timestamp}-${randomPart}`;
  }

  static async postFollower(req, res, next) {
    try {
      console.log(
        `${req.body.follower_id} Following user ${req.body.following_id}`
      );
      const followers = {
        follower_id: req.body.follower_id,
        following_id: req.body.following_id,
      };
      let userResponse, followingUpdate;
      const followResponse = await AltiumDAO.addFollowers(followers).then(
        (userResponse = await AltiumDAO.getUser(followers.following_id)),
        userResponse.followers++,
        AltiumDAO.updateUser(userResponse).then(
          (followingUpdate = await AltiumDAO.getUser(followers.follower_id)),
          followingUpdate.following++,
          AltiumDAO.updateUser(followingUpdate)
        )
      );
      res.status(200).json({ status: "success" });
      console.log(userResponse);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }
  static async getFollowers(req, res, next) {
    try {
      console.log(`getting user.... ${req.params.id}`);

      const id = req.params.id;
      const userResponse = await AltiumDAO.getFollowers(id);

      res.status(200).json(userResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async deleteFollowers(req, res, next) {
    try {
      console.log(
        `${req.body.follower_id} Following user ${req.body.following_id}`
      );
      const followers = {
        follower_id: req.body.follower_id,
        following_id: req.body.following_id,
      };
      let userResponse;
      const followResponse = await AltiumDAO.deleteFollowers(followers).then(
        (userResponse = await AltiumDAO.getUser(followers.following_id)),
        userResponse.followers--,
        AltiumDAO.updateUser(userResponse)
      );
      res.status(200).json({ status: "success" });
      console.log(userResponse);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  static async postPosts(req, res, next) {
    try {
      console.log(`$user ${req.body.user_id} posted ${req.body.content}`);
      const post = {
        post_id: AltiumController.generatePostId(),
        user_id: req.body.user_id,
        content: req.body.content,
        media_type: req.body.media_type,
        media_url: req.body.media_url,
        timestamp: Date.now().toString(),
        no_like: 0,
        no_comments: 0,
        name: req.body.name,
      };
      console.log(post);
      const followResponse = await AltiumDAO.addPost(post).then((value) => {
        if (!value) {
          throw new Error("Error while posting");
        }
      });
      res.status(200).json({ status: "success" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  static async getPost(req, res, next) {
    try {
      console.log(`getting post.... ${req.params.id}`);

      const id = req.params.id;
      const userResponse = await AltiumDAO.getPost(id);

      res.status(200).json(userResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async getPostByUser(req, res, next) {
    try {
      console.log(`getting post by id.... ${req.body.user_id}`);

      // const id = req.body.user_id;
      const id = req.params.id;
      // const userResponse = await AltiumDAO.getPostByUser(id);
      const userResponse = await AltiumDAO.getPosts(id);

      res.status(200).json(userResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async getPostForUser(req, res, next) {
    try {
      console.log(`getting post by id.... ${req.body.user_id}`);

      // const id = req.body.user_id;
      // const id = req.params.id;
      // const userResponse = await AltiumDAO.getPostByUser(id);
      const userResponse = await AltiumDAO.getRecommendationPosts();

      res.status(200).json(userResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async postLike(req, res, next) {
    try {
      console.log(`user ${req.body.user_id} liked post ${req.body.post_id}`);
      const like = {
        like_id: AltiumController.generateLikeId(),
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        timestamp: Date.now().toString(),
      };
      let userResponse;
      const followResponse = await AltiumDAO.addLike(like).then(
        (userResponse = await AltiumDAO.getPost(like.post_id)),
        userResponse.no_like++,
        await AltiumDAO.updatePost(userResponse)
      );
      res.status(200).json({ status: "success" });
      console.log(userResponse);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }
  static generateLikeId() {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000000); // More random digits
    return `like-${timestamp}-${randomPart}`;
  }
  static async deleteLike(req, res, next) {
    try {
      console.log(`${req.body.user_id} unliked post ${req.body.post_id}`);
      const like = {
        user_id: req.body.user_id,
        post_id: req.body.post_id,
      };
      let userResponse;
      const followResponse = await AltiumDAO.deleteLike(like).then(
        (userResponse = await AltiumDAO.getPost(like.post_id)),
        userResponse.no_like--,
        AltiumDAO.updatePost(userResponse)
      );
      res.status(200).json({ status: "success" });
      console.log(userResponse);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }
  static async sendMessage(req, res, next) {
    try {
      console.log(
        `user ${req.body.sender_id} sent user ${req.body.reciever_id} ${req.body.content}`
      );
      const message = {
        message_id: AltiumController.generateMsgId(),
        sender_id: req.body.sender_id,
        reciever_id: req.body.reciever_id,
        content: req.body.content,
        name: req.body.name,
        timestamp: Date.now().toString(),
      };
      const userResponse = await AltiumDAO.postMessage(message);
      res.status(200).json({ status: "success" });
      console.log(userResponse);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }
  static generateMsgId() {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000000); // More random digits
    return `msg-${timestamp}-${randomPart}`;
  }
  static async getMessages(req, res, next) {
    try {
      const senderId = req.query.sender_id;
      const receiverId = req.query.reciever_id;

      console.log(`getting messages for ${senderId} and ${receiverId}`);

      const messageFilter = {
        $or: [
          { sender_id: senderId, reciever_id: receiverId },
          { sender_id: receiverId, reciever_id: senderId },
        ],
      };
      const userResponse = await AltiumDAO.getMessages(messageFilter);

      res.status(200).json(userResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // static async html(req,res,next)
  // {
  //     try {
  //         console.log(`getting messages for ${req.body.sender_id} and ${req.body.reciever_id}`);

  //         const id = {
  //           sender_id : req.body.sender_id,
  //           reciever_id : req.body.reciever_id,
  //         };
  //         const userResponse = `<!DOCTYPE html>
  //           <html lang="en">
  //           <head>
  //               <meta charset="UTF-8">
  //               <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //               <title>Responsive</title>
  //               <link rel="stylesheet" href="style.css">
  //           </head>
  //           <body>
  //               <!-- 0-480
  //                   481-768
  //                   769-1279
  //                   1280+  -->
  //               <!-- <div class="wrapper">
  //                   <div class="blue">blue</div>
  //                   <div class="desktop">
  //                       <div class="green">green</div>
  //                       <div class="tablet">
  //                           <div class="red">red</div>
  //                           <div class="yellow">yellow</div>
  //                       </div>
  //                   </div>
  //               </div> -->
  //               <div class="wrapper">
  //                   <div class="blue">blue</div>
  //                   <div class="green">green</div>
  //                   <div class="red">red</div>
  //                   <div class="yellow">yellow</div>
  //               </div>
  //           </body>
  //           </html>`;
  //       res.setHeader('Content-Type', 'text/html');
  //       res.status(200).send(userResponse);
  //     } catch (e) {
  //       res.status(500).json({ error: e.message });
  //     }
  // }
  static generateCommentId() {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000000); // More random digits
    return `comment-${timestamp}-${randomPart}`;
  }

  static async getComments(req, res, next) {
    try {
      console.log(`getting comment.... ${req.params.id}`);

      const id = req.params.id;
      const userResponse = await AltiumDAO.getComments(id);

      res.status(200).json(userResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async postComment(req, res, next) {
    try {
      console.log(`posting comment.... for ${req.params.id}`);

      const comment = {
        comment_id: AltiumController.generateCommentId(),
        user_id: req.body.user_id,
        post_id: req.params.id,
        name: req.body.name,
        content: req.body.content,
        timestamp: Date.now().toString(),
      };
      let userResponse;
      const commentResponse = await AltiumDAO.addComment(comment).then(
        (userResponse = await AltiumDAO.getPost(comment.post_id)),
        userResponse.no_comments++,
        await AltiumDAO.updatePost(userResponse)
      );
      res.status(200).json({ status: "success" });
      console.log(userResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async fetchReceiver(req, res, next) {
    try {
      const userId = req.params.id;

      const receivers = await AltiumDAO.getReceivers(userId);
      res.status(200).json(receivers);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static generateEventId() {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000000); // More random digits
    return `event-${timestamp}-${randomPart}`;
  }

  static async getEvents(req, res, next) {
    try {
      const eventMonth = req.params.id;

      const receivers = await AltiumDAO.getEvents(eventMonth);
      res.status(200).json(receivers);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async postEvent(req, res, next) {
    try {
      console.log(`posting event.... for ${req.body}`);

      const event = {
        event_Id: AltiumController.generateEventId(),
        month: req.body.month,
        day: req.body.day,
        title: req.body.title,
        time: req.body.time,
      };
      let serverRes = await AltiumDAO.addEvent(event);
      res.status(200).json({ status: "success" });
      console.log(serverRes);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async getCourses(req, res, next) {
    try {
      const tid = req.query.tid;

      const students = await AltiumDAO.getCourses(tid);
      res.status(200).json(students);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async postCourses(req, res, next) {
    try {
      console.log(`posting course.... for ${req.body}`);

      const course = {
        cid: req.body.cid,
        tid: req.body.tid,
        name: req.body.name,
        desc: req.body.desc,
      };
      let serverRes = await AltiumDAO.addCourse(course);
      res.status(200).json({ status: "success" });
      console.log(serverRes);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async putCourses(req, res, next) {
    try {
      console.log(`updating student courses.... for ${req.body.students}`);

      const students = req.body.students;/* {
        cid: req.body.cid,
        sid: req.body.sid,
        grade: req.body.grade
      };*/
      let serverRes = await AltiumDAO.updateStudents(students);
      res.status(200).json({ status: "success" });
      console.log(serverRes);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async getStudents(req, res, next) {
    try {

      const cid = req.params.id;
      let serverRes = await AltiumDAO.getStudents(cid);
      res.status(200).json(serverRes);
      console.log(serverRes);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async getAllCourse(req, res, next) {
    try {
      const sid = req.query.sid;
      let serverRes = await AltiumDAO.getAllCourse();
      res.status(200).json(serverRes);
      console.log(serverRes);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async postEnrollment(req, res, next) {
    try {
      console.log(`posting enroll.... for ${req.body}`);

      const course = {
        cid: req.params.id,
        sid: req.body.sid,
        name: req.body.name,
        grade: null,
      };
      let serverRes = await AltiumDAO.addEnrollment(course);
      res.status(200).json({ status: "success" });
      console.log(serverRes);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
