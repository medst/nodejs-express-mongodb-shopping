var express = require('express');
var router = express.Router();

var Product = require('../models/products');
var Order = require('../models/orders');
var Cart = require('../models/cart');


router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  res.render('index', { title: 'SHOP', success: successMsg});
});

router.get('/cart', function(req, res, next){
  if(req.session.cart)
    if(req.session.cart.totalQty == 0)
      req.session.cart == {};
  if(!req.session.cart || req.session.cart.totalQty == 0)
    return res.render('products/cart', {title: 'cart', products: null});
  var cart = new Cart(req.session.cart);
  res.render('products/cart', {title: 'cart', products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/cart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function(err, product){
    if(err)
      res.json({'status': 'erreur'});
    cart.add(product, product.id);
    req.session.cart = cart;
    res.json({'status': 'ok', 'cart': cart});
  });
});

router.get('/cart/remove/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

router.get('/cart/change/:id/:num', function(req, res, next){
  var productId = req.params.id;
  var num = req.params.num;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.changeQty(productId, num);
  req.session.cart = cart;
  res.json({status: 'ok', data: cart});
});

router.get('/checkout', isLoggedIn, function(req, res, next){
  if(!req.session.cart || req.session.cart.totalQty == 0)
    return res.redirect('/cart');
  var cart = new Cart(req.session.cart);
  var error = req.flash('error')[0];
  res.render('products/checkout', {total: cart.totalPrice, err: error, noError: !error});
});

router.post('/checkout', isLoggedIn, function(req, res, next){
  if(!req.session.cart || req.session.cart.totalQty == 0)
    return res.redirect('/cart');
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")("sk_test_wbLHFhCKwUyRUuixLQ11tEPU");
  stripe.charges.create({
      amount: cart.totalPrice * 100,
      currency: "usd",
      source: req.body.stripeToken,
      description: "Test Charge for:"+req.user
    }, function(err, charge) {
      if(err){
        req.flash('error', err.message);
        return res.redirect('/checkout');
      }
      var order = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name,
        payementId: charge.id
      });
      order.save(function(err, order){
        if(err){
          req.flash('error', 'somthing fault check your input');
          return res.redirect('/checkout');
        }
        req.flash('success', 'Successfully bought product !');
        req.session.cart = null;
        res.redirect('/');
      });
  });
});

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  req.session.oldUrl = req.url;
  res.redirect('/u/signin');
}
