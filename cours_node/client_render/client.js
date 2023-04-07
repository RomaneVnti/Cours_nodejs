const http = require('http');
const hostname = 'localhost';
const port = 8000;

//Envoi d'un requête vers le serveur 
http.get(`http://${hostname}:${port}`, res => {
    let data = '';

    //Recevoir des données par morceaux : Buffer
    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => console.log(data));
});