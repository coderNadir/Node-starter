const fs = require('fs');
const http = require('http');
const url = require('url');
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

const replaceTemplate =(temp,prod)=>{ 

let signal = temp.replace(/{%IMAGE%}/g ,prod.image);
 signal = temp.replace(/{%PRODUCTNAME%}/g ,prod.productName);
 signal = temp.replace(/{%QUANTITY%}/g ,prod.quantity);
 signal = temp.replace(/{%PRICE%}/g ,prod.price);
 signal = temp.replace(/{%NUTRIENTS%}/g ,prod.nutrients);
 signal = temp.replace(/{%FROM%}/g ,prod.from);
 signal = temp.replace(/{%DESCRIPTION%}/g ,prod.description);
 signal = temp.replace(/{%ID%}/g ,prod.id);
 if(!prod.organic){
  signal = temp.replace(/{%NOT_ORGANIC%}/g ,'not-organic');
 }

  return signal;
}
const tempproduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const tempoverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempcards = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
// const tempcard = fs.readFileSync(`${__dirname}/template/template-card.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
  const dataObj = JSON.parse(data);
  console.log(dataObj);

const server = http.createServer((req,res)=>{
  console.log(req.url);
  const pathName = req.url;

  //Product
  if(pathName === '/product'){
    res.writeHead(200,{'content-type':'text/html'});
    
    res.end('We are introducing product page');


    //Overview
  }else if(pathName === '/overview'){
    res.writeHead(200,{'content-type':'text/html'});

    const cardsHtml = dataObj.map(el => replaceTemplate(tempcards, el));
    console.log(cardsHtml);
 
  res.end('Hey Welcome Overview')

  
  //Api
  }else if(pathName === '/api'){

   
     res.writeHead(200,{'content-type':'application/json'});
     res.end(data);
   
  
  }else{
    res.writeHead(404,{
      'content-type':'text.html',
      'my-own-header':'hello-world'
    });
    res.end('<h1>Page not found <h1>'); 
  }
})

server.listen('2000',()=>{
console.log('Port listening......');

});