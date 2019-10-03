const express = require('express');

const server = express();

server.use(express.json());
server.use(logger);




const projectRouter = require('./api/projectRouter')
server.use('/api/project', projectRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Lets write some middleware</h2>`)
})

function logger(req, res, next) {
    console.log(req.method, req.url, Date.now());
    next();
};

module.exports = server;