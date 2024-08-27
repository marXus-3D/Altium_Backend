import { Console, error } from "console";
import mongodb, { Timestamp } from "mongodb";
import AltiumController from "../api/altium.controller.js";
const ObjectId = mongodb.ObjectId;

let users;
let followers;
let posts;
let hashtags;
let likes;
let messages;
let students;
let teachers;

export default class AltiumDAO {
  static async injectDB(conn) {
    if (users && followers && posts && hashtags) {
      return
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
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addUser (user, account){
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
  static async updateUser (user){
    try {
        console.log(`updating user ${user.username} ${user.user_id}`);

        const userId = user.user_id;
        const updateCriteria = { user_id:userId };
        const updateData = { $set: { 
                username : user.username,
                email : user.email,
                password : user.password,
                f_name : user.f_name,
                l_name : user.l_name, 
                bio : user.bio,
                profile_picture : user.profile_picture,
                followers : parseInt(user.followers),
        }};

        await users.updateOne(updateCriteria, updateData).then(updateResult => {
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

  static async getUserWithEmail(email)
  {
    try {
      console.log(`getting user ${email} from db`);
      console.log(email.toString().length);
      const filter = { email:email };
      const user = await users.findOne(filter);

      if (user) {
        console.log("Found user:", user);
        let account;
        if(user.acc_type == "Student"){
          account = students.findOne({user_id:user.user_id});
        }else{
          account = teachers.findOne({user_id:user.user_id});
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

  static async getUser(userid)
  {
    try {
      console.log(`getting user ${userid} from db`);
      console.log(userid.toString().length);
      const filter = userid.toString().length === 36 ? { user_id:userid } : {username:userid};
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

  static async getUsers()
  {
    try {
      const cursor = await users.find({}); // Empty filter fetches all documents
      const usersarr = await cursor.toArray();

      return usersarr;
    } catch (e) {
      console.log(`error while getting user ${e.message}`);
      throw e;
    }
  }

  static async addFollowers(followersObj)
  {
    try {
      console.log(`adding followers ${followersObj}`);
      return await followers.insertOne(followersObj);
    } catch (e) {
      console.error(`Unable to post follower: ${e}`);
      throw e;
    }
  }

  static async getFollowers(userid)
  {
    try {
      console.log(`getting user ${userid} from db`);
      const filter = { follower_id:userid };
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

  static async deleteFollowers(followersObj)
  {
    try {
      console.log(`deleteing followers ${followersObj}`);
      return await followers.deleteOne(followersObj);
    } catch (e) {
      console.error(`Unable to delete follower: ${e}`);
      throw e;
    }
  }

  static async getUserAndPostLike(filter)
  {
    try {
      console.log(`getting post and like from db ${filter.user_id}, ${filter.post_id}`);
      const post = await likes.findOne(filter);

      if (post)
      {
        console.log(`Found matching like ${post}`);
        return true;
      }
      else
      {
        console.log(`Found no matching like`);
        return false;
      }
    } catch (e) {
      console.log(`error while getting post and like ${e.message}`);
      return false;
    }
  }

  static async getPosts()
  {
    try {
      console.log(`getting postfrom db`);
      const user = await posts.find({});
      const post = await user.toArray();
      // post.forEach(async element => {
      //   const filter = {
      //     user_id : element.user_id,
      //     post_id : element.post_id,
      //   };
      //   element.like = await AltiumDAO.getUserAndPostLike(filter);
      // });

      const finalPosts = post.map(async (element) => {
        const filter = {
          user_id: element.user_id,
          post_id: element.post_id,
        };
        const like = await AltiumDAO.getUserAndPostLike(filter);
        element.like = like; // Assuming like is a boolean or object
        return element;
      });;

      const finalPost = await Promise.all(finalPosts);
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

  static async getPost(postid)
  {
    try {
      console.log(`getting post ${postid} from db`);
      const filter = { post_id:postid };
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
  static async getPostByUser(userid)
  {
    try {
      console.log(`getting post ${userid} from db`);
      const filter = { user_id:userid };
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

  static async addPost (post){
    try {
        console.log(`Posting ${post}`);
        const hashtag = AltiumDAO.extractHashtags(post.content);
        for (const hash of hashtag) {
          const newDoc = { 
            tag: hash,
            timestamp: post.timestamp,
           };
          await hashtags.insertOne(newDoc);
        }
        return await posts.insertOne(post);
      } catch (e) {
        console.error(`Unable to post review: ${e}`);
        throw e;
      }
  }

  static async updatePost (post){
    try {
        console.log(`updating post ${post}`);

        const postId = post.post_id;
        const updateCriteria = { post_id:postId };
        const updateData = { $set: { 
                content : post.content,
                media_type: post.media_type,
                media_url: post.media_url,
                timestamp: post.timestamp,
                no_like : post.no_like,
                no_comments : post.no_comments,
        }};

        await posts.updateOne(updateCriteria, updateData).then(updateResult => {
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

  static async addLike(like)
  {
    try {
      console.log(`adding like ${like}`);
      return await likes.insertOne(like);
    } catch (e) {
      console.error(`Unable to post like: ${e}`);
      throw e;
    }
  }

  static async deleteLike(like)
  {
    try {
      console.log(`deleteing like ${like}`);
      return await likes.deleteOne(like);
    } catch (e) {
      console.error(`Unable to delete like: ${e}`);
      throw e;
    }
  }

  static async postMessage(message)
  {
    try {
      console.log(`posting message ${message}`);
      return await messages.insertOne(message);
    } catch (e) {
      console.error(`Unable to post message: ${e}`);
      throw e;
    }
  }

  static async getMessages(messageFilter)
  {
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

}