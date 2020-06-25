const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('GET request successful!');
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT request not available!');
})
.post((req,res,next) => {
    res.end('POST request successful!');
})
.delete((req,res,next) => {
    res.end('GET request successful!');
});

leaderRouter.route('/:leaderId')
    .all((req,res,next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        next();
    })
    .get((req,res,next) => {
        res.end('GET request successful!');
    })
    .put((req,res,next) => {
        console.log('POST request successful!');
    })
    .post((req,res,next) => {
        res.statusCode = 403;
        res.end('PUT request not available!');
    })
    .delete((req,res,next) => {
        res.end('GET request successful!');
    });

    module.exports = leaderRouter;