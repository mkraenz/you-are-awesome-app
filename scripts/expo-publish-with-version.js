const shell = require("shelljs");
const jsonfile = require("jsonfile");
const file = "./src/utils/version.json";

const data = jsonfile.readFileSync(file);
data.jsBuildNumber = data.jsBuildNumber + 1;

jsonfile.writeFileSync(file, data, { spaces: 2, EOL: "\r\n" });
shell.exec("expo publish");
