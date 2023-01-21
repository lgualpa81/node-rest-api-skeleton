import "dotenv/config";
import mongoose, { connection } from "mongoose";

export const dbConnect = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(<string>process.env.DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error({ error });
  }

  mongoose.connection.on("connected", () => {
    console.log("Database is connected to", connection.db.databaseName);
  });
}