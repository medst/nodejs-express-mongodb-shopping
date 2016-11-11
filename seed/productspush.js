var Products = require('../models/products');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var p = new Products({
            title: 'Boutique Lace High Neck Bodycon Midi Dress',
            description: "Giving the LBD a luxe twist, take to the dance floor in this floral midi "+
                        +"dress and turn heads in this figure- skimming style. "
                        +"We can't wait to wear it with killer court heels, a box clutch and dramatic dark lip.",
            brand: 'Night',
            categorie: 'womens',
            subCategorie: 'CLOTHING',
            subSubCategorie: 'Dresses',
            qty: 1000,
            occasion: 'Partywear',
            gifts: 'Gifts for Her',
            color: ['black', 'red'],
            size: ['6', '8', '10', '12', '14', '16'],
            images:[{path: '/images/black-dress.jpg', color: 'black', sizes: ['6', '8', '10', '12', '14']},
                    {path: '/images/red-dress.jpg', color: 'red', sizes: ['6', '16']}],
            price: 25.00
        });


    p.save(function(err, data){
        if(err)
            console.log('err');
        console.log('data');
    });


/*Products.remove(function (err, product) {
  if (err) return handleError(err);
  Products.findById(product._id, function (err, product) {
    console.log(product) // null
  })
})*/

mongoose.disconnect();