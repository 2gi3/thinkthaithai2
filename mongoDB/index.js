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
  console.log(connection.isConnected);
}

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://gippolito:<password>@portfolio.okrhdau.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
