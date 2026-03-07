const mongoose = require("mongoose");
const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  mongoose.connect(DATABASE_URL);
};

module.exports = connectDB;
