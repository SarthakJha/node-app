const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authenticate = require('./../authenticate');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());
const promoModel = require('../models/promotions')

promoRouter.route('/')
    .get((req,res,next) => {
        promoModel.find({})
        .then((proms)=> {
            res.setHeader('Content-Type','application/json');
            res.status(200).json(proms);
        }).catch((err)=> next(err));
    })
    .put(authenticate.veriftUser,(req,res,next) => {
        res.statusCode = 403;
        res.end('PUT request not available!');
    })
    .post(authenticate.veriftUser,(req,res,next) => {
        promoModel.create(req.body)
        .then((proms)=>{
            res.setHeader('Content-Type','application/json');
            res.status(200).json(proms);
        }).catch((err)=> next(err));
    })
    .delete(authenticate.veriftUser,(req,res,next) => {
        promoModel.deleteMany({})
        .then((result)=> {
            res.setHeader('Content-Type','application/json');
            res.status(200).json(result);
        }).catch((err)=> next(err));
    });

promoRouter.route('/:promoId')
    .get((req,res,next) => {
        promoModel.findById(req.params.promoId)
        .then((promo)=> {
            res.setHeader('Content-Type','application/json');
            res.status(200).json(promo);
        }).catch((err)=> next(err));
    })
    .put(authenticate.veriftUser,(req,res,next) => {
        promoModel.findByIdAndUpdate(req.params.promoId,{
            $set: req.body
        },{
            new: true
        }).then((promo)=> {
            res.setHeader('Content-Type','application/json');
            res.status(200).json(promo);
        }).catch((err)=> next(err)); 
    })
    .post(authenticate.veriftUser,(req,res,next) => {
        res.statusCode = 403;
        res.end('POST request not available!');
    })
    .delete(authenticate.veriftUser,(req,res,next) => {
        promoModel.findByIdAndDelete(req.params.promoId)
            .then((promo)=> {
                res.setHeader('Content-Type','application/json');
                res.status(200).json(promo);
            }).catch((err)=> next(err));
        });

    module.exports = promoRouter;