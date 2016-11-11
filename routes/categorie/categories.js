var express = require('express');
var router = express.Router();

var Categorie = require('../../models/categories');
var Product = require('../../models/products');

router.get('/', function(req, res, next){
    req.checkQuery('cat', 'cat does not existe').notEmpty();
    req.checkQuery('scat', 'scat does not existe').notEmpty();
    req.checkQuery('sscat', 'sscat does not existe').notEmpty();
    req.checkQuery('size', 'size does not existe').notEmpty();
    req.checkQuery('price', 'price does not existe').notEmpty();
    req.checkQuery('color', 'color does not existe').notEmpty();
    req.checkQuery('occasion', 'occasion does not existe').notEmpty();
    req.checkQuery('page', 'page does not existe').notEmpty();
    req.checkQuery('json', 'json does not existe').notEmpty();
    var errors = req.validationErrors(true);
    var sizes = [];
    var colors = [];
    var pricemin = '0';
    var pricemax = '1000000';
    if(!errors.size){
        var size = req.query.size;
        var arr = size.split('|');
        for(let i=0;i<arr.length;i++)
            sizes.push(arr[i]);
    }
    if(!errors.color){
        var color = req.query.color;
        var arr = color.split('|');
        for(let i=0;i<arr.length;i++)
            colors.push(arr[i]);
    }
    if(!errors.price){
        var price = req.query.price;
        var arr = price.split('|');
        if(arr[0] != '0' || arr[1] != '100'){
            pricemin = arr[0];
            pricemax = arr[1];
        } 
    }
    if(errors.cat)
        res.redirect('/');
    var page = 0;
    if(!errors.page)
        page = parseInt(req.query.page);
    Categorie.findOne({'name': req.query.cat})
    .exec(function(err, data){
        if(err)
            res.redirect('/');
        if(!data)
            res.render('categorie/categories',{title: 'Categories Menu', state: false});
        if(!errors.scat){
            if(!errors.sscat){
                var query = Product.find({'categorie': req.query.cat, 'subCategorie': req.query.scat, 'subSubCategorie': req.query.sscat});
                if(!errors.size)
                    query.where('size').in(sizes.map(x => new RegExp(x, 'ig')));
                if(!errors.color)
                    query.where('color').in(colors.map(x => new RegExp(x, 'ig')));
                if(!errors.price)
                    query.where('price').gt(pricemin).lt(pricemax);
                if(!errors.occasion)
                    query.where('occasion').equals(req.query.occasion);
                query.select('_id title price images likes disccount color');
                query.limit(20);
                query.skip(page*20);
                query.exec(function(err, data){
                    if(err)
                        res.redirect('/');
                    else if(data && !errors.json && req.query.json == 'true')
                        res.json({status:'ok', data: data});
                    else if(data && (errors.json || req.query.json != 'true'))
                        res.render('categorie/categories',{title: req.query.sscat, products: data, state: true});
                    else
                        res.render('categorie/categories',{title: 'There is no products', state: false});
                });
            }
            if(errors.sscat){
                var query = Product.find({'categorie': req.query.cat, 'subCategorie': req.query.scat});
                if(!errors.size)
                    query.where('size').in(sizes.map(x => new RegExp(x, 'ig')));
                if(!errors.color)
                    query.where('color').in(colors.map(x => new RegExp(x, 'ig')));
                if(!errors.price)
                    query.where('price').gt(pricemin).lt(pricemax);
                if(!errors.occasion)
                    query.where('occasion').equals(req.query.occasion);
                query.select('_id title price images likes disccount color');
                query.limit(20);
                query.skip(page*20);
                query.exec(function(err, data){
                    if(err)
                        res.redirect('/');
                    else if(data && !errors.json && req.query.json == 'true')
                        res.json({status:'ok', data: data});
                    else if(data && (errors.json || req.query.json != 'true'))
                        res.render('categorie/categories',{title: req.query.sscat, products: data, state: true});
                    else
                        res.render('categorie/categories',{title: 'There is no products', state: false});
                });
            }
        }
    });
});

module.exports = router;