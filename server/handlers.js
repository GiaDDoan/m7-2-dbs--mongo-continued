"use strict";
const assert = require("assert");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const test = async (dbName) => {
//   const client = await MongoClient(MONGO_URI, options);
//   await client.connect();

//   const db = client.db(dbName);
//   console.log("connected");
//   await db.collection("seats").insertOne({ seat: "test-1" });

//   client.close();
//   console.log("disconnected");
// };
// test("ticket_widget");

const getSeats = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("ticket_widget");
  const result = await db.collection("seats").find().toArray();

  if (result) {
    res.status(200).json({
      status: 200,
      data: result,
    });
  } else {
    res.status(404).json({ status: 404, data: "Not found" });
  }
};

module.exports = { getSeats };
