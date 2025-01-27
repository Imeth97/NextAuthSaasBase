#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

const repoUrl = "git@github.com:Imeth97/boilerplater.git";

// 1) Prompt the user for their project name
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What would you like to name your project? ", (projectName) => {
  // If no name was provided, exit gracefully or set a default name
  if (!projectName.trim()) {
    console.error("No project name provided. Exiting...");
    rl.close();
    process.exit(1);
  }

  // 2) Define the target directory path using the project name
  const currentDir = process.cwd();
  const targetDirPath = path.join(currentDir, projectName);

  console.log(`\nCloning the repository into '${projectName}'...\n`);

  // Clone the repo into the user-specified directory
  exec(`git clone ${repoUrl} ${targetDirPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Error cloning the repository:", error.message);
      rl.close();
      process.exit(1);
    }

    console.log(stdout);

    // Remove the .git folder to ensure there's no Git tracking
    const gitFolderPath = path.join(targetDirPath, ".git");
    fs.rm(gitFolderPath, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error("Error removing .git folder:", err.message);
        rl.close();
        process.exit(1);
      }

      console.log(`\nProject '${projectName}' is ready.`);
      console.log("\nRun:");
      console.log(`cd ${projectName}`);
      console.log("npm install");
      console.log("The run:");
      console.log("npm run dev-all");
      console.log(
        "(Or the relevant command for your package manager e.g. yarn)"
      );
      console.log(
        "To generate your .env file, start the database and run the development server."
      );
      console.log(
        "Once the server is running, view the about page for more information."
      );
      console.log(
        "Also make sure you've read the README.md file for more in depth information."
      );
      rl.close();
    });
  });
});
