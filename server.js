// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Existing Reservation Info
// =============================================================
const tables = [
  {
    customerName: "Adam",
    phoneNumber: "2151111111",
    customerEmail: "none@none.com",
    customerID: 394542
  }
];

const waitlist = [];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Route that redirects to reservation page
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Route that redirects to view tables page
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays tables object
app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

// Displays waitlist object
app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});


// Create new reservation - takes in JSON input
app.post("/api/tables", function (req, res) {

  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  if (tables.length >= 5) {
    waitlist.push(newReservation);
    res.json({ status: 'waitlist' })
  }
  else {
    tables.push(newReservation);
    res.json({ status: 'reservation' })
  }

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});