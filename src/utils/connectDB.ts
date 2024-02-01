import mongoose from "mongoose";
import dotenv from "dotenv";

export async function connectDB() {
  dotenv.config();

  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@burguer-app.nj6tkpl.mongodb.net/?retryWrites=true&w=majority`;

  async function connect() {
    try {
      await mongoose.connect(uri, {
        dbName: "Notes",
      });
      console.log("Connected to Mongo Database!");
    } catch (error) {
      console.error(error);
    }
  }

  await connect();
}
