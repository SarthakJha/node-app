const express = require('express');
const bodyParser = require('body-parser'); // used for parsing JSON
const mongoose = require('mongoose');

const dishModel = require('./../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
// methods for /dishes endpoint.
// i.e for http://localhost:3000/dishes
.get((req,res, next) => {
    dishModel.find({})
    .then((dish)=> {
        // handeling if no errors in finding
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish); // sends json as response
    }).catch((err)=> next(err)); //error is sent forward to handle later
})
.post((req,res,next) => {
    dishModel.create(req.body)
    .then((dish)=> {
        console.log('dish created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    }).catch((err)=> next(err));
})
.put((req,res,next) => {
    res.statusCode = 403; // bcos you cant update the whole dish directory
    res.end('PUT requests are not valid on /dishes '); 
})
.delete((req,res,next) => {
    dishModel.remove({})
    .then((response)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(response);
    })
});

dishRouter.route('/:dishId')
// methods for /dishes/:dishId endpoint.
// i.e for http://localhost:3000/dishes/11092
.get((req,res, next) => {
    dishModel.findById(req.params.dishId)
    .then((dish)=> {
        // handeling if no errors in finding
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish); // sends json as response
    }).catch((err)=> next(err)); 
})
.post((req,res,next) => {
    res.statusCode = 403; // bcos you cant publish a dish on a specific dish.
    res.end('POST requests are not valid on /dishes ');
})
.put((req,res,next) => {
    dishModel.findByIdAndUpdate(req.params.dishId,{
         $set: req.body
        }, { new: true })
    .then((dish) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(dish);
    }).catch((err)=> next(err));   
})
.delete((req,res,next) => {
    dishModel.findByIdAndRemove(req.params.dishId)
    .then((dish) => {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(dish);
    }).catch((err)=> next(err));
});


module.exports = dishRouter;
