// dataabase config

const mongoose = require("mongoose");

module.exports.connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const isConntected = mongoose.connection.readyState === 1;
    if (isConntected) {
      console.log(
        `MongoDB Database is connected Successfully and Database connection is active on :  ${con.connection.host}`
      );
    } else {
      console.log("Database connection is not active");
    }
  } catch (err) {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      return;
    }
    if (err.name === "MongoNetworkError") {
      console.error(
        "MongoDB Network Error: Unable to connect to the database."
      );
      return;
    } else {
      console.error("An error occurred during database connection.");
      return;
    }
  }
};
