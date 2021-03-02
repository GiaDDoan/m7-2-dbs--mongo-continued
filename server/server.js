const express = require("express");
const morgan = require("morgan");
const { getSeats, bookASeat } = require("./handlers");

const PORT = 5678;

var app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(require("./routes"));
// app.get("/api/test/seat-availability", getSeats);
app.get("/api/seat-availability", getSeats);
app.post("/api/book-seat", bookASeat);

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});
