
//Importation des modules
const http = require("http");
const fs = require("fs");
const path = require("path");

//tableau des étudiants
const students = [{ name: "Sonia" }, { name: "Antoine" }];

//Creation du server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.end(fs.readFileSync(path.join(__dirname, "view", "home.html")));

    //Données
    if (req.method === "POST") { //Si la méthode est push alors on récupère et envoie les données
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {

        //Extraction des données des étudiants puis push dans la liste
        students.push({ name: body.split("=")[1] });
        res.statusCode = 200; //Reponse envoyée au serveur 
        res.end();
      });
    }
  } else if (req.url === "/bootstrap") { //Initialisation du bootstrap
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = fs.readFileSync("./assets/css/bootstrap.min.css"); 
    res.write(css);
    res.end();

    return;
  } else if (req.url === "/users") { //Afficher la liste de tous les étudiants stockés
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200; //Indique que la réponse a bien été traitée
    res.end(JSON.stringify(students)); //Envoie les données au format JSON
  } else {
    res.statusCode = 404;
    res.end("Page not found"); //page non trouvé
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});