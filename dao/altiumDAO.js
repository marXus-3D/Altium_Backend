import { Console, error } from "console";
import mongodb, { Timestamp } from "mongodb";
import AltiumController from "../api/altium.controller.js";
// const ObjectId = mongodb.ObjectId;
import { ObjectId } from "mongodb";
import { createArrayWithLimit, shuffleArray } from "../functions.js";

let users;
let followers;
let posts;
let hashtags;
let likes;
let messages;
let students;
let teachers;
let comments;
let events;
let courses;
let enrolled;
let notifications;

export default class AltiumDAO {
  static async injectDB(conn) {
    if (users && followers && posts && hashtags) {
      return;
    }
    try {
      users = await conn.db("altium").collection("users");
      students = await conn.db("altium").collection("students");
      teachers = await conn.db("altium").collection("teachers");
      followers = await conn.db("altium").collection("followers");
      posts = await conn.db("altium").collection("posts");
      hashtags = await conn.db("altium").collection("hashtags");
      likes = await conn.db("altium").collection("likes");
      messages = await conn.db("altium").collection("messages");
      comments = await conn.db("altium").collection("comments");
      events = await conn.db("altium").collection("events");
      courses = await conn.db("altium").collection("courses");
      enrolled = await await conn.db("altium").collection("enrolled");
      notifications = await await conn.db("altium").collection("notifications");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addUser(user, account) {
    try {
      console.log(`adding user ${user.username}`);
      if (user.acc_type == "Student") {
        await students.insertOne(account);
      } else {
        await teachers.insertOne(account);
      }
      return await users.insertOne(user);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      throw e;
    }
  }
  static async updateUser(user) {
    try {
      console.log(`updating user ${user.username} ${user.user_id}`);

      const userId = user.user_id;
      const updateCriteria = { user_id: userId };
      const updateData = {
        $set: {
          username: user.username,
          email: user.email,
          password: user.password,
          f_name: user.f_name,
          l_name: user.l_name,
          bio: user.bio,
          profile_picture: user.profile_picture,
          followers: parseInt(user.followers),
          following: parseInt(user.following),
        },
      };

      await users.updateOne(updateCriteria, updateData).then((updateResult) => {
        if (updateResult.matchedCount === 1) {
          return updateResult;
        } else {
          throw new Error("No user found");
        }
      });
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      //throw e;
      throw e;
    }
  }
  static async deleteUser(userId) {
    try {
      console.log(`deleteing user ${userId}`);
      return await users.deleteOne({ user_id: userId });
    } catch (e) {
      console.error(`Unable to delete user: ${e}`);
      throw e;
    }
  }

  static async getUserWithEmail(email) {
    try {
      console.log(`getting user ${email} from db`);
      console.log(email.toString().length);
      const filter = { email: email };
      const user = await users.findOne(filter);

      if (user) {
        console.log("Found user:", user);
        let account;
        if (user.acc_type == "Student") {
          account = students.findOne({ user_id: user.user_id });
        } else {
          account = teachers.findOne({ user_id: user.user_id });
        }

        user.account_Detail = account;
        return user;
      } else {
        throw new Error("No user found with the provided user_id");
      }
    } catch (e) {
      console.log(`error while getting user ${e.message}`);
      throw e;
    }
  }

  static async getUser(userid) {
    try {
      console.log(`getting user ${userid} from db`);
      console.log(userid.toString().length);
      const filter =
        userid.toString().length === 36
          ? { user_id: userid }
          : { username: userid };
      const user = await users.findOne(filter);

      if (user) {
        console.log("Found user:", user);
        return user;
      } else {
        throw new Error("No user found with the provided user_id");
      }
    } catch (e) {
      console.log(`error while getting user ${e.message}`);
      throw e;
    }
  }

  static async getUsers() {
    try {
      const cursor = await users.find({}); // Empty filter fetches all documents
      const usersarr = await cursor.toArray();

      return usersarr;
    } catch (e) {
      console.log(`error while getting user ${e.message}`);
      throw e;
    }
  }

  static async getUsersRecommendation(id) {
    try {
      console.warn("getting recommendation");
      const enrolledArr = await enrolled.find({ sid: id }).toArray();
      const usersArr = await users
        .find({ user_id: { $ne: id } })
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray();
      const followingArr = await followers
        .find({
          $or: [
            { following_id: id },
            {
              follower_id: id,
            },
          ],
        })
        .toArray();
      console.warn(
        `Got something `,
        enrolledArr.length,
        usersArr.length,
        followingArr.length
      );
      
      if (enrolledArr.length <= 0 && followingArr.length <= 0) {
        return usersArr;
      } else {
        const eId = enrolledArr.map((e) => e.cid);
        const fId = followingArr.flatMap((e) => [
          e.follower_id,
          e.following_id,
        ]);
        const studentsEnrrolled = await enrolled
          .find({ $and: [{ sid: { $ne: id } }, { cid: { $in: eId } }] })
          .toArray();

        const followersArr = await followers
          .find({
            $or: [
              {
                $and: [
                  { following_id: { $in: fId } },
                  { follower_id: { $ne: id } },
                ],
              },
              {
                $and: [
                  { follower_id: { $in: fId } },
                  { following_id: { $ne: id } },
                ],
              },
            ],
          })
          .toArray();

        console.warn("Enrolled ", studentsEnrrolled);
        console.warn("Followers", followersArr);
        console.warn("users", usersArr);
        const fUsers = new Set();

        usersArr.forEach((usr) => {
          studentsEnrrolled.forEach((stu, idx) => {
            if (usr.user_id != stu.sid) fUsers.add(stu.sid);
          });
          followersArr.forEach((stu) => {
            if (usr.user_id != stu.following_id) fUsers.add(stu.following_id);
            else if (usr.user_id != stu.follower_id)
              fUsers.add(stu.follower_id);
          });
        });
        const recommendationArr = await users
          .find({ user_id: { $in: Array.from(fUsers) } })
          .toArray();

        const newArr = shuffleArray([...recommendationArr, ...usersArr]);
        console.error("this is the new", newArr);

        return newArr;
      }
    } catch (e) {
      console.log(`error while getting user ${e.message}`);
      throw e;
    }
  }

  static async addFollowers(followersObj) {
    try {
      console.log(`adding followers ${followersObj}`);
      return await followers.insertOne(followersObj);
    } catch (e) {
      console.error(`Unable to post follower: ${e}`);
      throw e;
    }
  }

  static async getFollowers(userid) {
    try {
      console.log(`getting user ${userid} from db`);
      const filter = { follower_id: userid };
      const users = await followers.find(filter);
      const response = await users.toArray();

      if (response) {
        console.log("Found user:", response);
        return response;
      } else {
        throw new Error("No user found with the provided user_id");
      }
    } catch (e) {
      console.log(`error while getting user ${e.message}`);
      throw e;
    }
  }

  static async deleteFollowers(followersObj) {
    try {
      console.log(`deleteing followers ${followersObj}`);
      return await followers.deleteOne(followersObj);
    } catch (e) {
      console.error(`Unable to delete follower: ${e}`);
      throw e;
    }
  }

  static async getUserAndPostLike(filter) {
    try {
      console.log(
        `getting post and like from db ${filter.user_id}, ${filter.post_id}`
      );
      const post = await likes.findOne(filter);

      if (post) {
        console.log(`Found matching like ${post}`);
        return true;
      } else {
        console.log(`Found no matching like`);
        return false;
      }
    } catch (e) {
      console.log(`error while getting post and like ${e.message}`);
      return false;
    }
  }

  static async getPosts(id) {
    try {
      console.log(`getting postfrom db`);
      const user = await posts.find({ user_id: id });
      const post = await user.toArray();
      return post;
      // post.forEach(async element => {
      //   const filter = {
      //     user_id : element.user_id,
      //     post_id : element.post_id,
      //   };
      //   element.like = await AltiumDAO.getUserAndPostLike(filter);
      // });

      // const finalPosts = post.map(async (element) => {
      //   const filter = {
      //     user_id: element.user_id,
      //     post_id: element.post_id,
      //   };
      //   const like = await AltiumDAO.getUserAndPostLike(filter);
      //   element.like = like; // Assuming like is a boolean or object
      //   return element;
      // });;

      // const finalPost = await Promise.all(finalPosts);
      // if (finalPost.length > 0) {
      //   console.log("Found post:", finalPost);
      //   return finalPost;
      // } else {
      //   throw new Error("No post found with the provided postid");
      // }
    } catch (e) {
      console.log(`error while getting post ${e.message}`);
      throw e;
    }
  }
  static async getRecommendationPosts(id) {
    try {
      console.log(`getting postfrom db`);
      const user = await posts
        .find({ user_id: { $ne: id } })
        .sort({ timestamp: -1 });
      const post = await user.toArray();

      // post.forEach(async (element) => {
      //   const filter = {
      //     user_id: element.user_id,
      //     post_id: element.post_id,
      //   };
      //   element.like = await AltiumDAO.getUserAndPostLike(filter);
      // });

      const finalPosts = post.map(async (element) => {
        const filter = {
          user_id: id,
          post_id: element.post_id,
        };
        const like = await AltiumDAO.getUserAndPostLike(filter);
        console.warn("this like is", like);
        element.like = like; // Assuming like is a boolean or object
        return element;
      });

      const finalPost = (await Promise.all(finalPosts)).sort();
      if (finalPost.length > 0) {
        console.log("Found post:", finalPost);
        return finalPost;
      } else {
        throw new Error("No post found with the provided postid");
      }
    } catch (e) {
      console.log(`error while getting post ${e.message}`);
      throw e;
    }
  }

  static async getPost(postid) {
    try {
      console.log(`getting post ${postid} from db`);
      const filter = { post_id: postid };
      const user = await posts.findOne(filter);

      if (user) {
        console.log("Found post:", user);
        return user;
      } else {
        throw new Error("No post found with the provided postid");
      }
    } catch (e) {
      console.log(`error while getting post ${e.message}`);
      throw e;
    }
  }
  static async getPostByUser(userid) {
    try {
      console.log(`getting post ${userid} from db`);
      const filter = { user_id: userid };
      const post = await posts.find(filter);
      const response = await post.toArray();

      if (response) {
        console.log("Found posts:", response);
        return response;
      } else {
        throw new Error("No post found with the provided postid");
      }
    } catch (e) {
      console.log(`error while getting post ${e.message}`);
      throw e;
    }
  }
  static async getPostForUser(userid) {
    try {
      console.log(`getting post ${userid} from db`);
      const filter = { user_id: userid };
      const post = await posts.find(filter);
      const response = await post.toArray();

      if (response) {
        console.log("Found posts:", response);
        return response;
      } else {
        throw new Error("No post found with the provided postid");
      }
    } catch (e) {
      console.log(`error while getting post ${e.message}`);
      throw e;
    }
  }

  //I swear mongo what are you doing fix your fucking doc's
  static async addPost(post) {
    try {
      console.log(`Posting ${post}`);
      const hashtag = AltiumDAO.extractHashtags(post.content);

      const tim = new Date();
      for (const hash of hashtag) {
        const newDoc = {
          tag: hash,
          timestamp: tim, //why is it this hard to implement a queryable timestamp
        };
        await hashtags.insertOne(newDoc);
      }
      return await posts.insertOne(post);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      throw e;
    }
  }

  static async updatePost(post) {
    try {
      console.log(`updating post ${post}`);

      const postId = post.post_id;
      const updateCriteria = { post_id: postId };
      const updateData = {
        $set: {
          content: post.content,
          media_type: post.media_type,
          media_url: post.media_url,
          timestamp: post.timestamp,
          no_like: post.no_like,
          no_comments: post.no_comments,
        },
      };

      await posts.updateOne(updateCriteria, updateData).then((updateResult) => {
        if (updateResult.matchedCount === 1) {
          return updateResult;
        } else {
          throw new Error("No post found");
        }
      });
    } catch (e) {
      console.error(`Unable to update post: ${e}`);
      throw e;
    }
  }

  static extractHashtags(text) {
    //console.log(text);
    const hashtagRegex = /#(\w+)/g;

    // Use matchAll to find all matches of the regex
    const matches = text.matchAll(hashtagRegex);

    // Extract the hashtag groups from the matches
    const hashtags = [];
    for (const match of matches) {
      hashtags.push(match[1]); // Access the captured word after the # symbol
    }

    return hashtags;
  }

  static async addLike(like) {
    try {
      console.log(`adding like ${like}`);
      return await likes.insertOne(like);
    } catch (e) {
      console.error(`Unable to post like: ${e}`);
      throw e;
    }
  }

  static async deleteLike(like) {
    try {
      console.log(`deleteing like ${like}`);
      return await likes.deleteOne(like);
    } catch (e) {
      console.error(`Unable to delete like: ${e}`);
      throw e;
    }
  }

  static async postMessage(message) {
    try {
      console.log(`posting message ${message}`);
      return await messages.insertOne(message);
    } catch (e) {
      console.error(`Unable to post message: ${e}`);
      throw e;
    }
  }

  static async getMessages(messageFilter) {
    try {
      console.log(`getting messeage ${messageFilter} from db`);
      //const filter = { user_id:userid };
      const message = await messages.find(messageFilter);
      const response = await message.toArray();

      if (response) {
        console.log("Found messages:", response);
        return response;
      } else {
        throw new Error("No messages found with the provided id");
      }
    } catch (e) {
      console.log(`error while getting post ${e.message}`);
      throw e;
    }
  }

  static async getComments(postId) {
    try {
      console.log(`getting comment for ${postId} from db`);
      const filter = { post_id: postId };
      const comment = await comments.find(filter);
      const response = await comment.toArray();

      if (response) {
        console.log("Found comments:", response);
        return response;
      } else {
        throw new Error("No post found with the provided postid");
      }
    } catch (e) {
      console.log(`error while getting comments ${e.message}`);
      throw e;
    }
  }

  static async addComment(comment) {
    try {
      console.log(`adding comment ${comment}`);
      return await comments.insertOne(comment);
    } catch (e) {
      console.error(`Unable to post comment: ${e}`);
      throw e;
    }
  }

  static async getReceivers(userId) {
    try {
      const query = { $or: [{sender_id: userId}, {reciever_id: userId}] }; // used this query to find documents with the given userid
      const projection = { reciever_id: 1, name: 1, _id: 0 }; // to select only receiver_id and name
      //TODO Fixx this shit
      const receivers = await messages
        .find(query)
        .project(projection)
        .toArray();

      const newArr =  Array.from(
        new Map(receivers.map((item) => [item.reciever_id, item])).values()
      );

      const rec = newArr.map(r => r.reciever_id);

      const usersArr = users.find({user_id: {$in: rec}}).toArray();

      return usersArr; // to return the array of receiverid and name


    } catch (e) {
      console.error("Error fetching data from the database:", e);
      throw e;
    }
  }

  static async addEvent(event) {
    try {
      console.log(`adding event ${event}`);
      return await events.insertOne(event);
    } catch (e) {
      console.error(`Unable to post event: ${e}`);
      throw e;
    }
  }

  static async getEvents(evMonth) {
    try {
      const query = { month: evMonth };

      const eventsArr = await events.find(query).toArray();

      return eventsArr;
    } catch (e) {
      console.error("Error fetching data from the database:", e);
      throw e;
    }
  }

  static async addCourse(course) {
    try {
      console.log(`adding course ${course}`);
      return await courses.insertOne(course);
    } catch (e) {
      console.error(`Unable to post course: ${e}`);
      throw e;
    }
  }

  static async getCourses(tid) {
    try {
      const query = { tid: tid };

      const coursesArr = await courses.find(query).toArray();

      return coursesArr;
    } catch (e) {
      console.error("Error fetching data from the database:", e);
      throw e;
    }
  }

  static async updateStudents(students) {
    try {
      console.log(`updating students ${students}`);
      let result;
      students.forEach(async (e) => {
        const updateCriteria = { $and: [{ cid: e.cid }, { sid: e.sid }] };
        const updateData = {
          $set: {
            grade: e.grade,
          },
        };

        result = await enrolled.updateOne(updateCriteria, updateData);
      });

      return result;
    } catch (e) {
      console.error(`Unable to update post: ${e}`);
      throw e;
    }
  }

  static async getStudents(cid) {
    try {
      const query = { cid: cid };

      const coursesArr = await enrolled.find(query).toArray();

      return coursesArr;
    } catch (e) {
      console.error("Error fetching data from the database:", e);
      throw e;
    }
  }
  static async getAllCourse() {
    try {
      const query = {};

      const coursesArr = await courses.find(query).toArray();

      return coursesArr;
    } catch (e) {
      console.error("Error fetching data from the database:", e);
      throw e;
    }
  }
  static async getOneCourse(cid) {
    try {
      const query = { cid: cid };

      const coursesArr = await courses.findOne(query);

      return coursesArr;
    } catch (e) {
      console.error("Error fetching data from the database:", e);
      throw e;
    }
  }

  static async addEnrollment(enroll) {
    try {
      console.log(`adding enrollment ${enroll}`);
      return await enrolled.insertOne(enroll);
    } catch (e) {
      console.error(`Unable to post enroll: ${e}`);
      throw e;
    }
  }

  static async getNotificatios(uid) {
    try {
      const query = { user_id: uid };

      const coursesArr = await notifications.find(query).toArray();

      return coursesArr;
    } catch (e) {
      console.error("Error fetching data from the database:", e);
      throw e;
    }
  }

  static async addNotification(notification) {
    try {
      console.log(`adding notification ${notification}`);
      return await notifications.insertOne(notification);
    } catch (e) {
      console.error(`Unable to post notification: ${e}`);
      throw e;
    }
  }

  static async updateNotification(uid) {
    try {
      const result = await notifications.updateMany(
        { user_id: uid },
        { $set: { hasRead: true } }
      );

      return result;
    } catch (e) {
      console.error(`Unable to update notification: ${e}`);
      throw e;
    }
  }

  static insertArrayInMiddle(a1, a2) {
    const middleIndex = Math.floor(a1.length / 2);
    const result = [
      ...a1.slice(0, middleIndex),
      ...a2,
      ...a1.slice(middleIndex),
    ];
    return result;
  }

  static async search(srchTerm) {
    try {
      const query = [
        {
          $search: {
            index: "default",
            autocomplete: {
              query: srchTerm,
              path: "content",
            },
          },
        },
      ];
      // OMG Mongodb's documentation is literally the worst doc i've ever seen.
      // const agg = [
      //   {
      //     $search: {
      //       index: "default",
      //       autocomplete: { query: srchTerm, path: "content" },
      //     },
      //   },
      //   { $limit: 20 },
      //   { $project: { _id: 0, content: 1 } },
      // ];

      const postsArr = await posts.aggregate(query).toArray();

      return postsArr;
    } catch (e) {
      console.error("Error fetching data from the database:", e);
      throw e;
    }
  }

  static async searchByUsername(srchTerm) {
    try {
      const query = [
        {
          $search: {
            index: "usernameI",
            autocomplete: {
              query: srchTerm,
              path: "username",
            },
          },
        },
      ];

      const usersArr = await users.aggregate(query).toArray();

      return usersArr;
    } catch (e) {
      console.error("Error fetching data from the database:", e);
      throw e;
    }
  }

  static async groupHashtags(hashtags) {
    const hashtagCounts = [];

    hashtags.forEach((hashtag, index) => {
      let occurrence = 1;
      hashtags.forEach((tag, idx) => {
        if (idx != index && tag.tag.includes(hashtag.tag)) {
          occurrence++;
          hashtags.splice(idx, 1);
        }
      });
      hashtags[index].totalPosts = occurrence;
      hashtagCounts.push(occurrence);
    });

    return hashtags;
  }

  static async getTrending() {
    try {
      const now = new Date();
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

      const query = {
        timestamp: {
          $gte: lastWeek,
          $lte: new Date(),
        },
      };

      const trendArr = await hashtags
        .find(query)
        .sort({ timestamp: -1 })
        .toArray();

      return AltiumDAO.groupHashtags(trendArr);
    } catch (e) {
      console.error("Error fetching data from the database:", e);
      throw e;
    }
  }
}
