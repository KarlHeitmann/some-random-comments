const express = require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mern",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


app.get('/', (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3001;
console.log("::::::::::::: PORT, ", PORT)
app.listen(PORT);
