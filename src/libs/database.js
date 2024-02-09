import { MongoClient } from "mongodb";

const URI = import.meta.env.MONGO_URI;

export default function database() {
  const client = new MongoClient(URI);
  return client
};
