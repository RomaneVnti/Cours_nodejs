const http = require('http'); //Module natif 

//Server qui va écouter des requetes 
const server = http.createServer( (req, res) => {
    res.writeHead(200, {
        "Content-Type" : "text/plain",
    }); //200 valeur par défaut de ce parametre 
    res.write("Coucou le server");
    res.end(); //Terminer chaque requete par end obligatoire
});

server.listen(8000);
//Gestion des requetes de manière asynchrone avec des callback 
//Creation du callback 


