//core modules
const fs = require('fs');
const http = require("http");
const url = require("url");
const app = require("express");
const slugify = require("slugify");
//our own modules
const replaceditems = require("./modules/replacemodules");
//async
const data = fs.readFileSync("./FruitjuiceApi/fruit.json", "utf-8");
const overview = fs.readFileSync("./views/index.html", "utf-8");
const indextemp = fs.readFileSync("./views/indextemplating.html", "utf-8");
const tempproduct = fs.readFileSync("./views/product.html", "utf-8");
//parse method converts from strings to objects
const productdata = JSON.parse(data);

const prody  = productdata.map(el=> slugify(el.productName,{lower:true}));
console.log(prody);
// if you prefer something other than '-' as separator
let slug =  slugify('SOME', {lower:true})  // some_string
console.log(slug);
const server = http.createServer((req, resp) => {
    console.log(req.url);
    let {pathname,query} = url.parse(req.url,true)

    if (pathname === "/" || pathname === "/overview") {
        const newitem = productdata.map(ity => replaceditems(indextemp, ity)).join('');
        const output = overview.replace(/{%products%}/g,newitem);
        resp.writeHead(200, {
            "Content-type": "text/html"
        })
        resp.end(output);
    }
    else if (pathname === "/products") {
        //product page
        console.log(pathname,query);
        resp.writeHead(200, {
            "Content-type": "text/html",
        });
        const product = productdata[query.id];
        const output = replaceditems(tempproduct,product);
        resp.end(output);
    }
    else if (pathname === "/cart") {
        resp.end("Cart")
    } else {
        //error page
        resp.writeHead(404, {
            'Content-type': "text/html",
            "my-own-header": "Hello-world",
        })
        resp.end("<h1>ERROR PAGE!!<h1>");
    }
    console.log(req.url);
});
const port = 8000;
server.listen(port, () => {
    console.log(`connected to server at ${port}`);
});
let name = "sam";
console.log(name);
 