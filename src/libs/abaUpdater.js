import { MongoClient } from "mongodb";

const URI = import.meta.env.MONGO_URI;

export default async function abaUpdater(docs) {
  const client = new MongoClient(URI);
  return await client
    .connect()
    .then(async () => {
      const db = client.db("planPreviewer");
      const collection = db.collection("aba");
      await collection.deleteMany({});
      await collection.insertMany(docs);
    })
    .catch((error) => error)
    .finally(() => client.close());
}
