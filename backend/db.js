const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
    trim: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const AccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = { User, Account, connectDb };
