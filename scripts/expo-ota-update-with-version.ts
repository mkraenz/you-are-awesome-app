import * as jsonfile from "jsonfile";
import * as shell from "shelljs";
import { jsBuildNumber } from "../src/utils/version.json";

const file = "./src/utils/version.json";

const incrementBuildVersion = () => {
    const data = jsonfile.readFileSync(file);
    data.jsBuildNumber = data.jsBuildNumber + 1;
    jsonfile.writeFileSync(file, data, { spaces: 4, EOL: "\r\n" });
};

function assertProdOrStage(env: string) {
    const applicableEnv = ["prod", "stage"].includes(env);
    if (!applicableEnv) {
        throw new Error("Not an applicable environment.");
    }
}

function publishToChannel(env: string) {
    const { code } = shell.exec(
        `expo publish --target managed --release-channel ${env}`
    );
    if (code !== 0) {
        throw new Error("Publishing failed");
    }
}

function autoReview() {
    const { stdout } = shell.exec(`git diff --numstat`);
    const validGitDiff = `3       3       __tests__/screens/__snapshots__/SettingsScreen.test.tsx.snap
    1       1       src/utils/version.json`;
    const whitespace = /\s/g;
    return (
        stdout.replace(whitespace, "") === validGitDiff.replace(whitespace, "")
    );
}

function stageChanges() {
    shell.exec(
        "git add ./src/utils/version.json __tests__/screens/__snapshots__/SettingsScreen.test.tsx.snap"
    );
    console.log(
        "ACTION REQUIRED: Change issue number and run the following command:\n"
    );
    console.log(`git commit -m "RELEASE #TODO build version ${jsBuildNumber}"`);
}

const updateSnapshotTests = () => shell.exec("yarn test:update-snapshot");
const onAutoReviewFailed = () => {
    console.log(
        "auto review failed. Please check your git changes and commit manually"
    );
};

const main = () => {
    const env = process.env.NODE_ENV!;

    assertProdOrStage(env);
    incrementBuildVersion();
    publishToChannel(env);

    updateSnapshotTests();

    const reviewApproved = autoReview();
    if (reviewApproved) {
        stageChanges();
    } else {
        onAutoReviewFailed();
    }
};

main();
