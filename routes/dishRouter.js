const express = require('express');
const bodyParser = require('body-parser'); // used for parsing JSON

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
// methods for /dishes endpoint.
// i.e for http://localhost:3000/dishes
.get((req,res, next) => {
    res.end("hold up a second bruv!");
})
.post((req,res,next) => {
    res.end('will add the dish: '+req.body.name+' with details: '+req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403; // bcos you cant update the whole dish directory
    res.end('PUT requests are not valid on /dishes '); 
})
.delete((req,res,next) => {
    res.end('deleting all the dishes!');
});

dishRouter.route('/:dishId')
.all((req,res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
// methods for /dishes/:dishId endpoint.
// i.e for http://localhost:3000/dishes/11092
.get((req,res, next) => {
    res.end("hold up a second bruv!");
})
.post((req,res,next) => {
    res.statusCode = 403; // bcos you cant publish a dish on a specific dish.
    res.end('POST requests are not valid on /dishes ');
})
.put((req,res,next) => {
     res.end('will update the dish with id: '+req.body.name+ ' with description: '+req.body.description )
})
.delete((req,res,next) => {
    res.end('deleting the dish: '+req.params.dishId);
});


module.exports = dishRouter;
