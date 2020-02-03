const fs = require("fs");

const ormConfigFile = "./src/ormconfig.json";
const tsConfigFile = "./src/tsconfig.json";

try {
  fs.unlinkSync(ormConfigFile);
  fs.unlinkSync(tsConfigFile);
  console.log("Cleaned json files");
} catch (err) {
  console.error(err);
}
