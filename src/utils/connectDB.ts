import mongoose from "mongoose";

export async function connectDB() {
  const uri = `mongodb+srv://${import.meta.env.DB_USERNAME}:${
    import.meta.env.DB_PASSWORD
  }@burguer-app.nj6tkpl.mongodb.net/?retryWrites=true&w=majority`;
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
