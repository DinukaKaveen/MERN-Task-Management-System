const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 8000;
const DB_URL = "mongodb+srv://dinuka:1234@cluster0.ozczact.mongodb.net/?retryWrites=true&w=majority";


// coonect app with MongoDB
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Connection Error: ", err);
  });


// listen express app on port 8000
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
