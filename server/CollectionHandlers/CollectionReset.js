const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const CollectionReset = async () => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("ticket_widget");
    await db.collection("seats").deleteMany({});
    console.log("REMOVED");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

CollectionReset();
