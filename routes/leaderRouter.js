const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const leaderModel = require('./../models/leaders');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next) => {
    leaderModel.find({})
        .then((docs)=> {
            res.setHeader('Content-Type','application/json');
            res.status(200).json(docs);
        }).catch((err)=> next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT request not available!');
})
.post((req,res,next) => {
    leaderModel.create(req.body)
        .then((docs)=>{
            res.setHeader('Content-Type','application/json');
            res.status(200).json(docs);
        }).catch((err)=> next(err));
})
.delete((req,res,next) => {
    leaderModel.deleteMany({})
    .then((result)=> {
        res.setHeader('Content-Type','application/json');
        res.status(200).json(result);
    }).catch((err)=> next(err));
});

leaderRouter.route('/:leaderId')
    .get((req,res,next) => {
        leaderModel.findById(req.params.leaderId)
        .then((promo)=> {
            res.setHeader('Content-Type','application/json');
            res.status(200).json(promo);
        }).catch((err)=> next(err));
    })
    .put((req,res,next) => {
        leaderModel.findByIdAndUpdate(req.params.leaderId,{
            $set: req.body
        },{
            new: true
        }).then((docs)=> {
            res.setHeader('Content-Type','application/json');
            res.status(200).json(docs);
        }).catch((err)=> next(err)); 
    })
    .post((req,res,next) => {
        res.statusCode = 403;
        res.end('PUT request not available!');
    })
    .delete((req,res,next) => {
        leaderModel.findByIdAndDelete(req.params.leaderId)
        .then((docs)=> {
            res.setHeader('Content-Type','application/json');
            res.status(200).json(docs);
        }).catch((err)=> next(err));
        
    });

    module.exports = leaderRouter;