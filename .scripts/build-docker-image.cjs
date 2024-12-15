const { exec } = require("child_process");
const { name, version } = require("../package.json");
require("dotenv").config();

const command = `docker build --build-arg PORT=${process.env.APP_PORT} -t ${name}:${version} -t ${name}:latest .`;
console.log("\ncommand:", command);
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(error);
    return;
  } else {
    if (stderr) console.log("\nstderr:\n", stderr);
    if (stdout) console.log("\nstdout:\n", stdout);
  }
});
