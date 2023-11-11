const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //body-parser is used to convert json format into javascript object.
const taskRoutes = require("./routes/task_routes");

const app = express();

//app MiddleWare
app.use(bodyParser.json());

//route MiddleWare
app.use(taskRoutes);

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
