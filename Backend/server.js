//Appel du package http de node pour créer un serveur
const http = require('http');
const app = require('./app');
app.set('port',process.env.PORT || 3000)
//Appel de la fonction a chaques requêtes faites sur le serveur
const server = http.createServer(app);
server.listen(process.env.PORT || 3000);