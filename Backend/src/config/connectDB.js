const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected successfully !!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDb;
