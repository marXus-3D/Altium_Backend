import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;

export default class ReviewsDAO {
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

  
}