const http = require('http');
const { shuffle } = require('./src/utils');

const users = ['Alan', 'Sophie', 'Bernard', 'Elie'];

const server = http.createServer((req, res) => {
  const url = req.url.replace('/', '');

  if (url === 'favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.end();
    return;
  }

  if (url === 'shuffle') {
    shuffle(users);
    res.writeHead(302, { 'Location': '/' });
    res.end();
  } else {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
        <meta charset="utf-8">
          <title>Liste des utilisateurs</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              text-align:center;
            }
            header {
              background-color: #222;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            h1 {
              margin-top: 0;
            }
            ul {
              list-style: none;
              padding: 0;
            }
            li {
              margin-bottom: 10px;
            }
            button {
              background-color: #4CAF50;
              border: none;
              color: white;
              padding: 10px 20px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin-top: 20px;
              cursor: pointer;
              border-radius: 5px;
            }
            button:hover {
              background-color: #3e8e41;
            }
          </style>
        </head>
        <body>
          <header>
            <h1>Liste des utilisateurs</h1>
          </header>
          <div class="container">
            <ul>
              ${users.map((user) => `<li>${user}</li>`).join('')}
            </ul>
            <button onclick="window.location.href='/shuffle'">Mélanger</button>
          </div>
        </body>
      </html>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
    res.end();
  }
});

const hostname = 'localhost';
const port = 8000;
server.listen(port, hostname, () => {
  console.log(`Serveur démarré sur http://${hostname}:${port}`);
});
