import { error } from "console";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;

export default class AltiumDAO {
  static async injectDB(conn) {
    if (users) {
      return
    }
    try {
        users = await conn.db("altium").collection("users")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
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
}