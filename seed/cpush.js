var mongoose = require('mongoose');

var Categories = require('../models/categories');


mongoose.connect('localhost:27017/shopping');

var womens = new Categories({
    name: 'womens',
    sCategorie: [{
        name: 'CLOTHING',
        ssCategorie: ['Dresses', 'Party Dresses', 'Tops', 'Bodysuits',
            'Shirts & Blouses', 'Suits & Separates', 'Knitwear', 'Playsuits & Jumpsuits',
            'Coats & Jackets', 'Bomber Jackets', 'Sportswear', 'Swimwear & Beachwear',
            'Skirts', 'Shorts', 'Trousers & Leggings', 'Jeans', 'Denim', 'Co-ord Sets',
            'Lingerie & Nightwear', 'Onesies & Loungewear', 'Style Steals', 'Maxi Dresses']
                },
                {
        name: 'SHOES',
        ssCategorie: ['High Heels', 'Boots', 'Sandals', 'Flats','Trainers']          
                },
                {
        name: 'ACCESSORIES',
        ssCategorie: ['Jewellery', 'Bags', 'Sunglasses', 'Hair Accessories','Beauty', 'Gifts',
                      'Tights & Socks', 'Belts', 'Scarves, Hats & Gloves']
                }],
    brand: ['Basics', 'Night', 'Blue', 'Boutique', 'Fit'],
    occasion: ['Work Wear','Occasionwear', 'CHRISTMAS JUMPERS', 'NIGHTWEAR', 'Partywear', 'Heels', 'Halloween'],
    gifts: ['Gifts for Him', 'Gifts for Her', 'Gifts £5 & Under', 'Gifts £10 & Under', 'Novelty Gifts', 'Beauty Gifts']
});

var mens = new Categories({
    name: 'mens',
    sCategorie: [{
        name: 'CLOTHING',
        ssCategorie: ['T-Shirts & Vests', 'Jumpers & Cardigans', 'Hoodies & Sweats', 'Coats & Jackets',
                      'Jeans', 'Shirts', 'Trousers', 'Joggers & Tracksuits','Shorts','Onesies & Loungewear']
                },
                {
        name: 'SHOES',
        ssCategories: []   
                },
                {
        name: 'ACCESSORIES',
        ssCategories: []
                }],
    brand: ['Basics', 'Night', 'Blue', 'Boutique', 'Fit'],
    occasion: ['Work Wear','Occasionwear', 'CHRISTMAS JUMPERS', 'NIGHTWEAR', 'Partywear', 'Heels', 'Halloween'],
    gifts: ['Gifts for Him', 'Gifts for Her', 'Gifts £5 & Under', 'Gifts £10 & Under', 'Novelty Gifts', 'Beauty Gifts']
});

var kids = new Categories({
    name: 'kids',
    sCategorie: [{
        name: 'girls',
        ssCategorie: ['Dresses', 'Tops', 'Jackets & Coats', 'Denim','Trousers & Leggings', 'Sets',
                      'Skirts','Shoes','Accessories']
                },
                {
        name: 'boys',
        ssCategorie: ['Tops', 'Knitwear', 'Jackets & Coats', 'Denim', 'Trousers', 'Shoes','Accessories']
                }],
    brand: ['Basics', 'Night', 'Blue', 'Boutique', 'Fit'],
    occasion: ['Work Wear','Occasionwear', 'CHRISTMAS JUMPERS', 'NIGHTWEAR', 'Partywear', 'Heels', 'Halloween'],
    gifts: ['Gifts for Him', 'Gifts for Her', 'Gifts £5 & Under', 'Gifts £10 & Under', 'Novelty Gifts', 'Beauty Gifts']
});

        
/*womens.save(function(err, data){
    if(err)
      console.log('wee :'+err);
    console.log('data');
});

mens.save(function(err, data){
    if(err)
      console.log('wee :'+err);
    console.log('data');
});

kids.save(function(err, data){
    if(err)
      console.log('wee :'+err);
    console.log('data');
});*/

//Categories.remove();

Categories.findOne({'name': 'mends'})
.exec(function(err, data){
    if(err)
      console.log('wee :'+err.message);
    console.log(data);
});


mongoose.disconnect();
