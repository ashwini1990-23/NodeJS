import mongoose from "mongoose";
import dotenv from "dotenv";

export const dbConnect = async () => {
  try {
    const mongoDbConnection = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING,
    );
    console.log(
      `Database connection successful: ${mongoDbConnection.connection.host} ${mongoDbConnection.connection.name}`,
    );
  } catch (error) {
    console.log(`Database connection failed: ${error}`);
    process.exit(1);
  }
};
