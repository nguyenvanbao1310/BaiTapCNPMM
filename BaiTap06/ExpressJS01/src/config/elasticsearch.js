// config/elasticsearch.js
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "https://my-elasticsearch-project-e775ed.es.us-central1.gcp.elastic.cloud:443",
  auth: {
    apiKey: "TmV3ZEo1a0I2dmQyU2FoNUN0bXU6aGNycnJfbzQzYlZ0eWRDMWc2dUNwdw==",
  },
});

module.exports = client;
