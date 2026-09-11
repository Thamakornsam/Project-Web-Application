//Connects to the MongoDB server

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'movie_booking';

async function connect() {
  if (!client.isConnected) await client.connect();
  return client.db(dbName);
}

module.exports = connect;
