const fs = require("fs");

// Reading File
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

// Writing File
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/outPut.txt", textOut);
console.log("File Written!");
