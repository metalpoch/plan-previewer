import database from "./database";
import constants from "./constants";

async function findAll() {
  const client = database();
  try {
    const db = client.db("planPreviewer");
    const col = db.collection("traffic_aba");
    return await col.find().sort({state: 1}).toArray();
  } finally {
    await client.close();
  }
}

const upgradePlan = (plan, data) => {
  const result = {
    planIdeal: `${plan} Mbps`,
    benefited_clients: 0,
    new_traffic_mbps: 0,
  };
  const factor = data.factor;
  const base_clients = `clients_${plan}_mbps`;

  result[base_clients] = data[base_clients];

  constants.PLANS.forEach((pln) => {
    const field_clients = `clients_${pln}_mbps`;
    const field_factor = `factor_${pln}_mbps`;

    if (pln < plan) {
      result[field_clients] = 0;
      result[base_clients] += data[field_clients];
      result["benefited_clients"] += data[field_clients];
    }
    if (pln > plan) result[field_clients] = data[field_clients];

    result[field_factor] = pln * result[field_clients] * factor;
    result.new_traffic_mbps += result[field_factor];
  });

  if ((result.new_traffic_mbps * 100) / data.bandwidth_mbps < 80) return result;
};

export const getData = async (plan) => {
  const docs = await findAll().catch((error) => ({ error: error.message }));

  const otherPlans = constants.PLANS.filter((pln) => pln <= +plan).reverse();

  const result = docs.map((doc) => {
    const { _id, ...original_doc } = doc;

    let result = {};
    for (let i = 0; i < otherPlans.length; i++) {
      const pln = otherPlans[i];
      const data = upgradePlan(pln, original_doc);
      if (data) {
	result = data;
        break;
      }
    }

    return [original_doc, result];
  });
  return result;
};
