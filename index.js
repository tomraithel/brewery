const fs = require("fs");
const path = require("path");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const filePath = path.resolve(process.env.SENSOR_FILE);

const getTemp = (data) => {
  const [, sensorData] = data.split("\n");
  const [, temp] = sensorData.split("t=");
  return parseInt(temp, 10) / 1000;
};

const run = async () => {
  const data = await readFile(filePath, { encoding: "utf-8" });
  const temp = getTemp(data);
  console.log(`${temp} °C`);
};

run();
