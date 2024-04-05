const http = require("http");

const books = [
    {name:"mybook 1"},
    {name:"mybook 2"},
    {name:"mybook 3"}
];

const server = http.createServer((req,res) =>{
    console.log(req,"req")
    if(req.method === "GET" && req.url === "/books"){

    res.end("books");
}

   else if(req.method === "GET" && req.url === "/welcome"){

        res.end("welcome");
    }

       else if(req.method === "GET" && req.url === "/bye"){

            res.end("bye");

        }

          else {
            res.end("url undefined");
          }


    // res.writeHead(200, {"Content-Type" : "application/jon"});

    // return res.end(JSON.stringify(books));    

    
})

server.listen(3001,()=>{
    
console.log("Server Listening on port 3001;")

});