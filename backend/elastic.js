require('dotenv').config();
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD,
  },
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASS,
  },
});

const run = async () => {
  await client.index({
    index: "breaking-bad",
    id: 1,
    body: {
      character: "Walter White",
      portrayer: "Bryan Cranston",
    },
  });

  await client.index({
    index: "breaking-bad",
    id: 2,
    body: {
      character: "Jessie Pinkman",
      portrayer: "Aaron Paul",
    },
  });

  await client.index({
    index: "breaking-bad",
    id: 3,
    body: {
      character: "Gus Fring",
      portrayer: "Giancarlo Esposito",
    },
  });

  await client.indices.refresh({ index: "breaking-bad" });

  const { body } = await client.search({
    index: "breaking-bad",
    body: {
      query: {
        match: { character: "white" },
      },
    },
  });

  console.log(body.hits.hits);
};

run().catch(e => console.log(e));
