#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const repoUrl = "git@github.com:Imeth97/boilerplater.git";

const cloneRepository = () => {
  const currentDir = process.cwd();
  const targetDirName = "boilerplater";
  const targetDirPath = path.join(currentDir, targetDirName);

  console.log("Cloning the repository...");

  // Clone the repository into a temporary directory
  exec(`git clone ${repoUrl} ${targetDirPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Error cloning the repository:", error.message);
      process.exit(1);
    }

    console.log(stdout);

    // Remove the `.git` folder to avoid initializing the cloned repo as a Git repo
    const gitFolderPath = path.join(targetDirPath, ".git");

    fs.rm(gitFolderPath, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error("Error removing .git folder:", err.message);
        process.exit(1);
      }

      console.log(`Cloned repository into ${targetDirPath} without initializing it as a Git repository.`);
    });
  });
};

// Execute the script
cloneRepository();
