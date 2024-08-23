import server from "./index.js";
import { connectUsingMongoose } from "./config/mongoDB.js";
server.listen("3200", () => {
  console.log("server is listening on 3200");
  connectUsingMongoose();
});
