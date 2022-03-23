const http = require("http");

const hostname = '127.0.0.1';

const port = 3000;

const server = http.createServer((req,res)=>{
    if(req.method === 'GET'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.end('Soy un get');
    }else if(req.method === 'POST'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.end('Soy un Post');
    }
    
});

server.address(hostname);
server.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
});

