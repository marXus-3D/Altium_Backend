import { error } from "console";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;
let followers;

export default class AltiumDAO {
  static async injectDB(conn) {
    if (users && followers) {
      return
    }
    try {
        users = await conn.db("altium").collection("users");
        followers = await conn.db("altium").collection("followers");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addUser (user){
    try {
        console.log(`adding user ${user.username}`);
        return await users.insertOne(user);
      } catch (e) {
        console.error(`Unable to post review: ${e}`);
        return { error: e };
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
        //return { error: e };
        throw e;
      }
  }

  static async getUser(userid)
  {
    try {
      console.log(`getting user ${userid} from db`);
      const filter = { user_id:userid };
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
      return { error: e };
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
      return { error: e };
    }
  }
}