const http = require('http');
const fs = require('fs');
const path = require('path');
const { URLSearchParams } = require('url');

const hostname = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
  // Route handlers
  const url = req.url.replace(/^\/+|\/+$/g, '').toLowerCase();

  if (url === 'favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    res.end();
    return;
  }

  if (url === '') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const pageContent = `
      <html>
        <head>
          <title>API - Home</title>
          <meta charset="utf-8">
          <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
            text-align:center;
          }
          
          header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
          }
          
          h1 {
            margin-top: 0;
          }
          
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          button {
            background-color: #333;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
          }
          
          button:hover {
            background-color: #555;
          }
          
          form {
            display: inline-block;
            margin-top: 20px;
          }
          
          label {
            display: block;
            margin-bottom: 5px;
          }
          
          input[type="text"] {
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          
          input[type="submit"] {
            background-color: #333;
            color: #fff;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          }
          
          input[type="submit"]:hover {
            background-color: #555;
          }
          
          table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
          }
          
          th,
          td {
            text-align: left;
            padding: 8px;
            border-bottom: 1px solid #ddd;
          }
          
          th {
            background-color: #333;
            color: #fff;
          }
          
          tr:hover {
            background-color: #f5f5f5;
          }
        </style>
        </head>
        <body>
          <h1>bienvenu sur la page de recherche API!</h1>
          <p>cliquer sur le bouton pour avoir accès aux données:</p>
          <button onclick="location.href='/all'">Voir les utilisateurs</button>
          <br><br>
          <form action="/search" method="get">
            <label for="user-search">Rechercher un utilisateur:</label>
            <input type="text" id="user-search" name="user">
            <button type="submit">Recherche</button>
          </form>
        </body>
      </html>
    `;
    res.end(pageContent);
    return;
  }

  if (url === 'all') {
    const dataDir = path.join(__dirname, 'data');
    fs.readdir(dataDir, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
        return;
      }

      const users = [];
      files.forEach((file) => {
        const filePath = path.join(dataDir, file);
        const user = JSON.parse(fs.readFileSync(filePath));
        users.push(user);
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    });
    return;
  }

  if (url.startsWith('search')) {
    const params = new URLSearchParams(req.url.slice(req.url.indexOf('?')));
    const userName = params.get('user');
    const userFileName = userName + '.json';
    const filePath = path.join(__dirname, 'data', userFileName);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User not found');
        return;
      }

      const user = JSON.parse(fs.readFileSync(filePath));

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    });
    return;
  }

  // Not found
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Page not found');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
