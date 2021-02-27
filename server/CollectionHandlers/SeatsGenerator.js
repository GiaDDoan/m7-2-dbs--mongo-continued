const assert = require("assert");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const generateSeats = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const seats = [];
    const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
    for (let r = 0; r < row.length; r++) {
      for (let s = 1; s < 13; s++) {
        const seat = { _id: `${row[r]}-${s}`, price: 225, isBooked: false };
        seats.push(seat);
      }
    }

    const db = client.db("ticket_widget");
    const result = await db.collection("seats").insertMany(seats);
    assert.strictEqual(seats.length, result.insertedCount);
    console.log("Seats generated");

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};
generateSeats();
