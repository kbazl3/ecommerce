var mongoose = require('mongoose');
var Product = require('../models/Product.js');

module.exports = {

    updateProduct: function(req, res) {
        if(!req.params.id){
            return res.status(400).send('id query needed');
        }
        Product.findOneAndUpdate({_id: req.params.id}, req.body, function(err, productItem) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(productItem);
            }
        });
    },

    addNewProduct: function(req, res) {
        console.log(req.body);
        new Product(req.body).save(function(err, productItem) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            } else {
                return res.json(productItem);
            }
        });
    },

    destroyProduct: function(req, res) {
        console.log("hitting delete", req.params.id);
       if (!req.params.id) {
           return res.status(400).send('id query needed');
       }
       Product.findByIdAndRemove({_id: req.params.id}, function(err, productItem) {
           if (err) {
               res.status(500).send(err);
           } else {
               res.send(productItem);
           }
       });
   },

   getOneProduct : function(req, res) {
       console.log("hitting get one", req.params.id);
       Product.findOne({_id: req.params.id}, function(err, productItem) {
           if (err) {
               res.status(500).json(err);
           } else {
               res.status(200).json(productItem);
           }
       });
   },

   getProducts: function(req, res) {
       Product.find().then(function(response) {
           res.send(response);
       });
   }

};
