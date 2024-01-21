import mongoose from "mongoose";
import "dotenv/config";
const { DB_HOST: uriDb } = process.env;

const connection = mongoose.connect(uriDb);

export const connectToMongoDB = async () => {
  try {
    await connection;
    console.log("You are connected to database");
  } catch (error) {
    console.log("Connection failed, shutting down");
    process.exit(1);
  }
};
