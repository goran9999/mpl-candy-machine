const path = require("path");
const { generateIdl } = require("@metaplex-foundation/shank-js");

const idlDir = path.join(__dirname, "..", "idls");
const binaryInstallDir = path.join(__dirname, "..", ".crates");
const programDir = path.join(__dirname, "..", "programs");

generateIdl({
  generator: "anchor",
  programName: "candy_machine_core",
  programId: "CFzdVwhuEen1o3ZZSUkMRdx7Z4kFZKAQw9CyqKt6BFHY",
  idlDir,
  binaryInstallDir,
  programDir: path.join(programDir, "candy-machine-core", "program"),
});

generateIdl({
  generator: "anchor",
  programName: "candy_guard",
  programId: "364Dz7e1KReCfVyz4n6jozmcdyKAoGnZ87zLkBqCat4T",
  idlDir,
  binaryInstallDir,
  programDir: path.join(programDir, "candy-guard", "program"),
});
