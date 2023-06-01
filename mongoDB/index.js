import mongoose from "mongoose";

const connection = {};
const mongoURI = process.env.MONGODB_URI;

export async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(`${mongoURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  // console.log(connection.isConnected);
}
