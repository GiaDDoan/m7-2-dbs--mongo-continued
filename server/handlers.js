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
  let numOfRows = 8;
  let seatsPerRow = 12;

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("ticket_widget");
  const seats = await db.collection("seats").find().toArray();

  if (seats) {
    const seatsObj = {};
    seats.forEach((seat) => {
      // seatObj[seat._id] = { ...seat };
      seatsObj[seat._id] = seat;
    });
    res.status(200).json({
      status: 200,
      seats: seatsObj,
      numOfRows,
      seatsPerRow,
    });
  } else {
    res.status(404).json({ status: 404, seats: "Not found" });
  }
};

const bookASeat = async (req, res) => {
  const seatId = req.body.seatId;
  const fullName = req.body.fullName;
  const email = req.body.email;
  console.log(req.body, seatId);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ticket_widget");

    const query = { _id: seatId };
    const newValues = { $set: { isBooked: true, fullName, email } };
    const bookingSeat = await db
      .collection("seats")
      .updateOne(query, newValues);

    res.status(200).json({ status: 200, data: bookingSeat });
    client.close();
  } catch (err) {
    res
      .status(404)
      .json({ status: 404, message: `Cannot book seat: ${seatId}` });
  }
};

module.exports = { getSeats, bookASeat };
