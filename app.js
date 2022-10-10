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

/////////////////////////////////////////
/* Building a (Very) Simple API */
////////////////////////////////////////

const http = require("http");

////////////////////////////
/* Routing */
///////////////////////////
const url = require("url");

///////////////////////////
// Files

/////////////////////////
// Server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(req.url);
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is PRODUCT");
  } else if (pathName === "/api") {
    res.writeHead(200, {"Content-type": "application/json"});
    res.end(data);
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


///////////////////////////////
/* HTML Templating*/
///////////////////////////////
const http = require("http");

////////////////////////////
/* Routing */
///////////////////////////
const url = require("url");

///////////////////////////
// Files

/////////////////////////
// Server
const replaceTemplate = (temp, prodcut) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, prodcut.productName);
  output = output.replace(/{%IMAGE%}/g, prodcut.image);
  output = output.replace(/{%QUANTITY%}/g, prodcut.quantity);
  output = output.replace(/{%FROM%}/g, prodcut.from);
  output = output.replace(/{%NUTRIENTS%}/g, prodcut.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, prodcut.description);
  output = output.replace(/{%PRICE%}/g, prodcut.price);
  output = output.replace(/{%ID%}/g, prodcut.id);

  if (!prodcut.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(req.url);
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {"Content-type": "text/html"});

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const outPut = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(outPut);

    // Product page
  } else if (pathName === "/product") {
    res.end(tempProduct);
    // Api
  } else if (pathName === "/api") {
    res.writeHead(200, {"Content-type": "application/json"});
    res.end(data);
    // Not found
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
////////////////////////
/* THE FINAL PROGECT */
///////////////////////
const fs = require("fs");

//////////////////////////////////////
/* Creating a simple web server */
/////////////////////////////////////

const http = require("http");

////////////////////////////
/* Routing */
///////////////////////////
const url = require("url");

///////////////////////////
// Files

/////////////////////////
// Server
const replaceTemplate = (temp, prodcut) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, prodcut.productName);
  output = output.replace(/{%IMAGE%}/g, prodcut.image);
  output = output.replace(/{%QUANTITY%}/g, prodcut.quantity);
  output = output.replace(/{%FROM%}/g, prodcut.from);
  output = output.replace(/{%NUTRIENTS%}/g, prodcut.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, prodcut.description);
  output = output.replace(/{%PRICE%}/g, prodcut.price);
  output = output.replace(/{%ID%}/g, prodcut.id);

  if (!prodcut.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // Api
  } else if (pathname === "/api") {
    res.writeHead(200, {"Content-type": "application/json"});
    res.end(data);
    // Not found
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
///////////////////////////////////////
/* New Modules */
///////////////////////////////////////
const fs = require("fs");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");
//////////////////////////////////////
/* Creating a simple web server */
/////////////////////////////////////

const http = require("http");

////////////////////////////
/* Routing */
///////////////////////////
const url = require("url");

///////////////////////////
// Files

/////////////////////////
// Server

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, {lower: true}));
console.log(slugs);

const server = http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // Api
  } else if (pathname === "/api") {
    res.writeHead(200, {"Content-type": "application/json"});
    res.end(data);
    // Not found
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
