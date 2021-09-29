const fs = require("fs");
const http = require("http");
const url = require("url");
//**************************************Synchronous way

// const read =(fs.readFileSync('./txt/input.txt', 'utf-8'));
// console.log(read);

// const msg = `Hey this is the begining ${read}.\n create on ${Date.now()} `
// fs.writeFileSync('./txt/output.txt',msg);
// console.log('file pasted');

//*****************************************ASynchronous way
// fs.readFile('./txt/output.txt','utf-8',(err,data1) =>{
//   fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//     console.log(data2);
//     fs.readFile('./txt/output.txt','utf-8',(err,data3)=>{
//     console.log(data3);

//     fs.writeFile('./txt/final.txt',`${data1}\n ${data2}`, 'utf-8',err=>{
//       console.log('wrote');
//     })
//     })
//   })
// })

const replaceTemplate = (temp, prod) => {
	// ** ** Changed the name of the variable to be more descriptive ** **
	// The problem was that you were reassigning the "temp" instead of output.
	// ex: the first line you replaced the "{%IMAGE%}" so the "output" now has the "{%IMAGE%}" changed and in the second line you replaced the {%PRODUCTNAME%} but you replaced from the "temp" and not from the "output" that has the "{%IMAGE%}" changed and so on so for so in your code only the last line will be changed.
	// -- SOLUTION is to reassign the "output" and not the "temp"
	// -- TIP: do not manipulate the arguments directly create a new variable. in our Example the variable is "output"

	// first line
	let output = temp.replace(/{%IMAGE%}/g, prod.image);
	// second line
	output = output.replace(/{%PRODUCTNAME%}/g, prod.productName);
	// third line
	output = output.replace(/{%QUANTITY%}/g, prod.quantity);
	output = output.replace(/{%PRICE%}/g, prod.price);
	output = output.replace(/{%NUTRIENTS%}/g, prod.nutrients);
	output = output.replace(/{%FROM%}/g, prod.from);
	output = output.replace(/{%DESCRIPTION%}/g, prod.description);
	output = output.replace(/{%ID%}/g, prod.id);
	if (!prod.organic) {
		output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
	}
	// console.log(output);

	return output;
};
const tempproduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	"utf-8"
);
const tempoverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	"utf-8"
);
const tempcards = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	"utf-8"
);
// const tempcard = fs.readFileSync(`${__dirname}/template/template-card.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// ** ** removed an indentation for next 2 lines
const dataObj = JSON.parse(data);
// console.log(dataObj);

const server = http.createServer((req, res) => {
	console.log(req.url);
	const pathName = req.url;

	//Product
	if (pathName === "/product") {
		// ** ** "content-type" => "C" to uppercase
		res.writeHead(200, { "Content-type": "text/html" });

		res.end("We are introducing product page");

		//Overview
	} else if (pathName === "/overview") {
		res.writeHead(200, { "Content-type": "text/html" });

		const cardsHtml = dataObj
			.map((el) => replaceTemplate(tempcards, el))
			.join("");
		console.log(cardsHtml);
		// const finalOutput = tempoverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
		// res.end(finalOutput);
		res.end("Welcome to the overview page");

		//Api
	} else if (pathName === "/api") {
		res.writeHead(200, { "Content-type": "application/json" });
		res.end(data);
	} else {
		res.writeHead(404, {
			"content-type": "text.html",
			"my-own-header": "hello-world",
		});
		res.end("<h1>Page not found <h1>");
	}
});

server.listen("2000", () => {
	console.log("Port listening......");
});
