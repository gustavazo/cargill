var models = require("./model-config.json");
var server = require("./server");

var ds = server.dataSources.postgress;

var lbTables = Object.keys(models).filter((m) => m !== "_meta");

ds.automigrate(lbTables, function (er) {
  if (er) throw er;
  console.log(
    "Loopback tables [" + lbTables + "] created in ",
    ds.adapter.name
  );
  ds.disconnect();
});
