const mongoose = require("mongoose");

const connectionToMongoDB = async () => {
  await mongoose.connect("mongodb://localhost:27017").then(() => {
    console.log("MongoDB is connected!");
  });
};

connectionToMongoDB();
