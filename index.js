const fs = require("fs");
const path = require("path");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const express = require("express");
const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
const loader = new TwingLoaderFilesystem("./templates");
const twing = new TwingEnvironment(loader);

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
    const temperature = await getTemperature();
    const output = await twing.render("index.twig", { temperature });
    res.end(output);
  });

  app.get("/temperature", async (req, res) => {
    const temperature = await getTemperature();
    res.end(JSON.stringify({ temperature }));
  });

  app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
  });
};

const run = async () => {
  startServer();
};

run();
