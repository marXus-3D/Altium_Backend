import AltiumDAO from "../dao/altiumDAO.js";
import dotenv from "dotenv";
import app from "./server.js";
import mongodb from "mongodb";

dotenv.config();

console.log(process.env.DATABASE_URL);
console.log(process.env.MUSERNAME);
console.log(process.env.PASSWORD);

const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://${process.env.MUSERNAME}:${process.env.PASSWORD}@cluster0.hb4lvyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = 8000;

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    writeConcern: 1,
  }
)
.catch(err => {
  console.error(err.stack);
  process.exit(1);
})
.then(async client => {
    AltiumDAO.injectDB(client);
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});