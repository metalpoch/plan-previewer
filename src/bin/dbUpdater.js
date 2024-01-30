import { MongoClient } from "mongodb";
import credentials from "./credentials.js";

const URI_TACCESS = credentials.MONGO_URI_TACCESS;
const URI_PREVIEWER = credentials.MONGO_URI_PLAN_PREVIEWER;

const extract_data_interfaces = (data) => {
  const { interfaces, lag } = data;
  return lag ? lag : interfaces;
};

const aggregateCreator = ({ firstday, lastday, onlyInterfaces }) => [
  {
    $match: {
      _id: { $gte: firstday, $lte: lastday },
    },
  },
  { $unwind: "$trends" },
  { $unwind: "$trends.elements" },
  {
    $match: {
      "trends.elements.interface": {
        $in: onlyInterfaces,
      },
    },
  },
  {
    $group: {
      _id: {
        interface: "$trends.elements.interface",
        group: "$trends.group",
      },
      time: { $push: "$trends.elements.times" },
      in: { $push: "$trends.elements.in" },
      out: { $push: "$trends.elements.out" },
      bandwidth: { $push: "$trends.elements.bandwidth" },
    },
  },
  {
    $project: {
      _id: 0,
      interface: "$_id.interface",
      group: "$_id.group",
      time: 1,
      in: 1,
      out: 1,
      bandwidth: 1,
    },
  },
];

const getData = async ({ firstday, lastday }) => {
  const client = new MongoClient(URI_TACCESS);
  return await client
    .connect()
    .then(async () => {
      const db = client.db("taccess");
      const ipInterfacesEhealth = db.collection("ipInterfacesEhealth");
      const ipInterfaces = await ipInterfacesEhealth.find({}).toArray();
      const onlyInterfaces = ipInterfaces.map(extract_data_interfaces).flat();

      const aggregate = aggregateCreator({ firstday, lastday, onlyInterfaces });

      const traffic = (
        await Promise.all([
          db.collection("ehealth2").aggregate(aggregate).toArray(),
          db.collection("ehealth3").aggregate(aggregate).toArray(),
        ])
      ).flat();

      return [traffic, ipInterfaces];
    })
    .catch((err) => console.log(err))
    .finally(() => client.close());
};

const avgTraffic = (data) =>
  data
    .map((trafficDay) => Math.max(...trafficDay))
    .reduce((prev, curr) => curr + prev) / data.length;

const saveData = async (data) => {
  const client = new MongoClient(URI_PREVIEWER);
  return await client
    .connect()
    .then(async () => {
      const db = client.db("planPreviewer");
      const traffic = db.collection("traffic");
      (await traffic.deleteMany({})) && (await traffic.insertMany(data));
    })
    .catch((err) => console.log(err))
    .finally(() => client.close());
};

const update = async ({ firstday, lastday }) => {
  const [data, ipInterfaces] = await getData({ firstday, lastday });

  const docs = data.map((element) => {
    const interface_ = element.interface;
    const bandwidth = avgTraffic(element.bandwidth);
    const inAvg = avgTraffic(element.in);
    const outAvg = avgTraffic(element.out);

    const ip = ipInterfaces.find((item) => {
      const interfaces = item?.interfaces || [];
      return interfaces.includes(interface_) || item.lag == interface_;
    }).ip;

    return {
      interface: interface_,
      group: element.group,
      ip,
      inAvg,
      outAvg,
      bandwidth,
    };
  });
  await saveData(docs);
};

update({
  firstday: "20240101",
  lastday: "20240107",
});
