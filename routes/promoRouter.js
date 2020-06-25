const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
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

promoRouter.route('/:promoId')
    .all((req,res,next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        next();
    })
    .get((req,res,next) => {
        res.end('GET request successful!');
    })
    .put((req,res,next) => {
        res.end('PUT request successful!');
    })
    .post((req,res,next) => {
        res.statusCode = 403;
        res.end('POST request not available!');
    })
    .delete((req,res,next) => {
        res.end('GET request successful!');
    });

    module.exports = promoRouter;