// Importation des modules 
const http = require("http");
const env = require("dotenv").config("../.env");
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const pug = require("pug");



// Importation des fichiers

const students = require("./data/students");
const formatStudentBirthDates = require("./utils");


const server = http.createServer((req, res) => {
    const url = req.url;
  
    switch (url) { //Utilisation switch pour définir les différents cas
      case "/":
        fs.readFile(
          path.join(__dirname, "view", "home.html"),
          "utf8",
          (err, content) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "text/html" });
              res.end("<h1>Erreur serveur</h1>");
            } else {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(content);
            }
          }
        );
        break;
  
      case "/users":
        const studentsFormatted = formatStudentBirthDates(students);
        const html = pug.renderFile(
          path.join(__dirname, "templates", "users.pug"),
          {
            studentsBetterDate: studentsFormatted,
          }
        );
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
        break;
  
      case url.match(/^\/delete\/(\d+)$/)?.[0]:
        const userId = parseInt(url.split("/")[2]);
        if (userId >= 0 && userId < students.length) {
          students.splice(userId, 1);
          res.writeHead(302, { Location: "/users" });
          res.end();
        } else {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("<h1>Utilisateur non trouvé</h1>");
        }
        break;
  
      case "/add":
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => (body += chunk.toString()));
          req.on("end", () => {
            const params = new URLSearchParams(body);
            const name = params.get("name");
            const birth = params.get("birth");
            students.push({ name, birth });
            res.writeHead(302, { Location: "/users" });
            res.end();
          });
        } else {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("<h1>404 Not found</h1>");
        }
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not found</h1>");
    }
  });
  


// Démarrer le serveur
server.listen(process.env.APP_PORT, () => {
    console.log(`Notre application Node est lancé sur : http://${process.env.APP_HOST}:${process.env.APP_PORT}`)});

