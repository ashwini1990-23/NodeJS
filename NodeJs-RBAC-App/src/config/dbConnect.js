import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING,
    );
    console.log(
      `Databsse connection successful: ${connect.connection.host}, ${connect.connection.name}`,
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
