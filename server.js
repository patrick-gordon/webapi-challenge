const projectRouter = require('./api/projectRouter')
const express = require('express');

const server = express();


//middleware
server.use(express.json());
server.use(logger);



//router
server.use('/api/project', projectRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Lets write some middleware</h2>`)
})


//logger
function logger(req, res, next) {
    console.log(req.method, req.url, Date.now());
    next();
};

module.exports = server;