const shell = require("shelljs");
const jsonfile = require("jsonfile");
const file = "./src/utils/version.json";

const incrementBuildVersion = () => {
    const data = jsonfile.readFileSync(file);
    data.jsBuildNumber = data.jsBuildNumber + 1;
    jsonfile.writeFileSync(file, data, { spaces: 2, EOL: "\r\n" });
};

const main = () => {
    const assertion = shell.exec("yarn assert:prod-config");
    if (assertion.code === 0) {
        incrementBuildVersion();
        shell.exec("expo publish --target bare");
    }
};

main();
