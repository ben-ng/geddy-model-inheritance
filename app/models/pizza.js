var Item = require('../helpers/item.js')
, Pizza = function () {
  
  // Does all the stuff in Item as if it was a Pizza
  Item.apply(this, arguments);

  this.defineProperties({
    toppings: {type: 'object'}
  });
  
  // You can now validate properties from an Item in here
  this.validatesLength('name', {min: 3});

};

/*
// Can also define them on the prototype
Pizza.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Pizza.someStaticMethod = function () {
  // Do some other stuff
};
Pizza.someStaticProperty = 'YYZ';
*/

Pizza = geddy.model.register('Pizza', Pizza);
