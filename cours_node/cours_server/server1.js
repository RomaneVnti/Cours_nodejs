const http = require('http');
const hostname = "localhost";
const port = "8000";

const server = http.createServer((req, res) => {

    //Routes 
    const url = req.url.replace('/', '');

    if(url === 'favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'});

        res.end();
        return;
    }

    if(url === 'test'){
        res.end(`<DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                        <title>Page test</title>
                    </meta>
                </head>
                <body>
                    <p>Bienvenu sur la page de test</p>
                </body>
            </html>
        </DOCTYPE>`
        )
    }
    res.end("Hello Wolrd"); //Le end fait à la fois le end et le write 
});

server.listen(port, hostname, () => {
    console.log(`server running ate http://${hostname}:${port}/`);
});

