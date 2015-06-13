var Bar = require('../models/Bar'),
  Product = require('../models/Product'),
  Price = require('../models/Price'),
  Round = require('../models/Round');

exports.up = function(req, res) {

  // Create bar models
  var bar1 = new Bar({name: "Jameson Bar"}),
   bar2 = new Bar({name: "Pig Whistle"}),
   bar3 = new Bar({name: "Bloom Tavern"}),
   bar4 = new Bar({name: "Mulligan's Pub"});
  bar1.save();
  bar2.save();
  bar3.save();
  bar4.save();

  // Create product models
  var product1 = new Product({name: "Coors Lite"}),
    product2 = new Product({name: "Blue Moon"}),
    product3 = new Product({name: "Guiness"}),
    product4 = new Product({name: "Stella"}),
    product5 = new Product({name: "Coke"}),
    product6 = new Product({name: "Lagavulin"});
  product1.save();
  product2.save();
  product3.save();
  product4.save();
  product5.save();
  product6.save();

  // Create price modes
  Price.create({
    bar: bar1._id, product: product1._id, price: 8
  });
  Price.create({
    bar: bar1._id, product: product2._id, price: 6
  });
  Price.create({
    bar: bar1._id, product: product4._id, price: 6
  });
  Price.create({
    bar: bar2._id, product: product2._id, price: 9
  });
  Price.create({
    bar: bar2._id, product: product3._id, price: 10
  });
  Price.create({
    bar: bar3._id, product: product6._id, price: 8
  });
  Price.create({
    bar: bar3._id, product: product1._id, price: 12
  });
  Price.create({
    bar: bar4._id, product: product2._id, price: 10
  });
  Price.create({
    bar: bar4._id, product: product5._id, price: 11
  });

  res.send('Migrated');
};

exports.down = function(req, res) {
  Bar.remove({}, function(err){});
  Product.remove({}, function(err){});
  Price.remove({}, function(err){});
  Round.remove({}, function(err){});
  res.send('Migrated down');
};
