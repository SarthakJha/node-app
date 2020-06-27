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

dishRouter.route('/:dishId/comments')
// methods for /dishes endpoint.
// i.e for http://localhost:3000/dishes/:dishId/comments
.get((req,res, next) => {
    dishModel.findById(req.params.dishId)
    .then((dish)=> {
        // handeling if no errors in finding
        if(dish!=null){
            res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish.comments);
        } else { 
           err = new Error('Dish '+req.params.dishId+' not found!'); //this will be handled at app.js(line56)
            err.statusCode = 404;  //this too
            return next(err); 
        }
         // sends json as response
    }).catch((err)=> next(err)); //error is sent forward to handle later
})
.post((req,res,next) => {
    dishModel.findById(req.params.dishId)
    .then((dish)=> {
        if(dish!=null){
        dish.comments.push(req.body); // updating
        dish.save()   // saving the update
        .then((dish)=> {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
        }).catch((err)=> res.json(err));
        } else { 
           err = new Error('Dish '+req.params.dishId+' not found!'); //this will be handled at app.js(line56)
            err.statusCode = 404;  //this too
            return next(err); 
        }
    }).catch((err)=> next(err));
})
.put((req,res,next) => {
    res.statusCode = 403; // bcos you cant update the whole dish directory
    res.end('PUT requests are not valid on /dishes/'
    +req.params.dishId+'/comments'
    ); 
})
.delete((req,res,next) => {
    dishModel.findById(req.params.dishId)
    .then((dish)=> {
        if(dish!=null){
            for (var i = (dish.comments.length -1); i>=0; i--) {
                dish.comments.id(dish.comments[i].id).remove();
            }
            dish.save()   // saving the update
        .then((dish)=> {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
        }).catch((err)=> res.json(err));
        } else { 
           err = new Error('Dish '+req.params.dishId+' not found!'); //this will be handled at app.js(line56)
            err.statusCode = 404;  //this too
            return next(err); 
        }
})
});

dishRouter.route('/:dishId/comments/:commentId')
// methods for /dishes/:dishId endpoint.
// i.e for http://localhost:3000/dishes/:dishId/comments/:commentId
.get((req,res, next) => {
    dishModel.findById(req.params.dishId)
    .then((dish)=> {
        // handeling if no errors in finding
        if(dish!=null && dish.comments.id(req.params.commentId)!=0){
            res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish.comments.id(req.params.commentId));
        } else if (dish == null) { 
           err = new Error('Dish '+req.params.dishId+' not found!'); //this will be handled at app.js(line56)
            err.statusCode = 404;  //this too
            return next(err); 
        } else {
            err = new Error('comment '+req.params.commentId+' not found!');
            err.statusCode = 404;  
            return next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish); // sends json as response
    }).catch((err)=> next(err)); 
})
.post((req,res,next) => {
    res.statusCode = 403; // bcos you cant publish a dish on a specific dish.
    res.end('POST requests are not valid on /dishes/comments'+req.params.dishId+'/'+req.params.commentId);
})
.put((req,res,next) => {
    dishModel.findById(req.params.dishId)
    .then((dish)=> {
        if(dish!=null && dish.comments.id(req.params.commentId)!=null){
            if(req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            } if(req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save()   // saving the update
            .then((dish)=> {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            })
        } else if (dish == null) { 
           err = new Error('Dish '+req.params.dishId+' not found!'); //this will be handled at app.js(line56)
            err.statusCode = 404;  //this too
            return next(err); 
        } else {
            err = new Error('comment '+req.params.commentId+' not found!');
            err.statusCode = 404;  
            return next(err);
        }
    }).catch((err)=> next(err)); 
})
.delete((req,res,next) => {
    dishModel.findById(req.params.dishId)
    .then((dish)=> {
        if(dish!=null && dish.comments.id(req.params.commentId)!=null){
                dish.comments.id(req.params.commentId).remove();//
            dish.save()   // saving the update
        .then((dish)=> {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
        }).catch((err)=> res.json(err));
        } else if (dish == null) { 
            err = new Error('Dish '+req.params.dishId+' not found!'); //this will be handled at app.js(line56)
             err.statusCode = 404;  //this too
             return next(err); 
         } else {
             err = new Error('comment '+req.params.commentId+' not found!');
             err.statusCode = 404;  
             return next(err);
         }
})
});


module.exports = dishRouter;
