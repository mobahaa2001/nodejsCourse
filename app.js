const fs = require("fs");

// Blocking, Synchronous way
// Reading File
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

// Writing File
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/outPut.txt", textOut);
console.log("File Written!");

// Non-blocking, Asynchronous way
// Reading File
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR!");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      // Writing File
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Your file have been written 😄");
      });
    });
  });
});
console.log("Will read file!");

//////////////////////////////////////
/* Creating a simple web server */
/////////////////////////////////////

const http = require("http");
///////////////////////////
// Files

/////////////////////////
// Server
const server = http.createServer((req, res) => {
  // console.log(req);
  res.end("Hello from the mo server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
////////////////////////////
/*Creating a simple web server & Routing */
///////////////////////////
const http = require("http");
const url = require("url");

///////////////////////////
// Files

/////////////////////////
// Server
const server = http.createServer((req, res) => {
  // console.log(req.url);
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is PRODUCT");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

