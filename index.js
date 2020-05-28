const fs = require("fs");
const path = require("path");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const express = require("express");

const getTemperature = async () => {
  const filePath = path.resolve(process.env.SENSOR_FILE);
  const data = await readFile(filePath, { encoding: "utf-8" });

  const [, sensorData] = data.split("\n");
  const [, temp] = sensorData.split("t=");
  return parseInt(temp, 10) / 1000;
};

const startServer = () => {
  const app = express();

  app.get("/", async (req, res) => {
    const temp = await getTemperature();
    res.set("Refresh", "1; url=/");
    res.send(`${temp} °C`);
  });

  app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
  });
};

const run = async () => {
  startServer();
};

run();
