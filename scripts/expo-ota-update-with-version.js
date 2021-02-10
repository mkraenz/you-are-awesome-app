const shell = require("shelljs");
const jsonfile = require("jsonfile");
const file = "./src/utils/version.json";

const incrementBuildVersion = () => {
    const data = jsonfile.readFileSync(file);
    data.jsBuildNumber = data.jsBuildNumber + 1;
    jsonfile.writeFileSync(file, data, { spaces: 4, EOL: "\r\n" });
};

const main = () => {
    const applicableEnv = ["prod", "stage"].includes(process.env.NODE_ENV);
    if (!applicableEnv) {
        throw new Error("Not an applicable environment.");
    }

    incrementBuildVersion();
    shell.exec(
        `expo publish --target managed --release-channel ${process.env.NODE_ENV}`
    );
};

main();
