// const { MongoClient, ServerApiVersion } = require('mongodb');
import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = "mongodb+srv://Marisell-24:Malkaren27*@curso-full-stack.7ahd3xe.mongodb.net/?retryWrites=true&w=majority&appName=Curso-full-stack";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default client