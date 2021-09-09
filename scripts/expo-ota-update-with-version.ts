import * as jsonfile from "jsonfile";
import * as readline from "readline-sync";
import * as shell from "shelljs";
import { jsBuildNumber } from "../src/utils/version.json";

const file = "./src/utils/version.json";
const nextBuildNumber = jsBuildNumber + 1;

const incrementBuildVersion = () => {
    const data = { jsBuildNumber: nextBuildNumber };
    jsonfile.writeFileSync(file, data, { spaces: 4, EOL: "\r\n" });
};

function assertProdOrStage(env: string): asserts env is "stage" | "prod" {
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

function gitStageChanges() {
    shell.exec(
        "git add ./src/utils/version.json __tests__/screens/__snapshots__/SettingsScreen.test.tsx.snap"
    );
}

const updateSnapshotTests = () => {
    const { code } = shell.exec("yarn test:update-snapshot");
    if (code !== 0) {
        throw new Error("Tests failed.");
    }
};

const onAutoReviewFailed = () => {
    console.log(
        "auto review failed. Please check your git changes and commit manually"
    );
};

const askForCommit = (env: "stage" | "prod") => {
    const issueNumber = readline.questionInt(
        "Insert issue number for commit. (without #)\n"
    );
    const maybePrefix = env === "stage" ? "stage-" : "";
    const gitCommitCommand = `git commit -m "chore(#${issueNumber}): ${maybePrefix}release build version ${nextBuildNumber}"`;
    const confirmation =
        readline.question(`Do you wish to git commit with the following command?

        ${gitCommitCommand}

To confirm, type 'yes'. Any other input will abort the commit.
`);

    return { commitApproved: confirmation === "yes", gitCommitCommand };
};

const gitPushCommand = "git push";

const main = () => {
    const env = process.env.NODE_ENV!;

    assertProdOrStage(env);

    const { commitApproved, gitCommitCommand } = askForCommit(env);
    incrementBuildVersion();
    updateSnapshotTests();

    const reviewApproved = autoReview();
    if (reviewApproved) {
        publishToChannel(env);
        gitStageChanges();

        if (commitApproved) {
            shell.exec(gitCommitCommand);
            shell.exec(gitPushCommand);
        }
    } else {
        onAutoReviewFailed();
    }
};

main();
