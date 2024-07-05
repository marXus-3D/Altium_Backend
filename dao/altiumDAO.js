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
}