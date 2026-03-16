const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectMongoDb(url) {
  return mongoose.connect(url);
}

module.exports = { connectMongoDb };

// .then(() => console.log('MongoDB Connected'))
// .catch((err) => console.log('Mongo Error'));
