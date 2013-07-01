var Pizzas = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Pizza.all(function(err, pizzas) {
      self.respond({params: params, pizzas: pizzas});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , pizza = geddy.model.Pizza.create(params);

    if (!pizza.isValid()) {
      this.flash.error(pizza.errors);
      this.redirect({action: 'add'});
    }
    else {
      pizza.save(function(err, data) {
        if (err) {
          self.flash.error(err);
          self.redirect({action: 'add'});
        }
        else {
          self.redirect({controller: self.name});
        }
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Pizza.first(params.id, function(err, pizza) {
      if (!pizza) {
        var err = new Error();
        err.statusCode = 404;
        self.error(err);
      }
      else {
        self.respond({params: params, pizza: pizza.toObj()});
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Pizza.first(params.id, function(err, pizza) {
      if (!pizza) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      }
      else {
        self.respond({params: params, pizza: pizza});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Pizza.first(params.id, function(err, pizza) {
      pizza.updateProperties(params);
      if (!pizza.isValid()) {
        this.flash.error(pizza.errors);
        this.redirect({action: 'edit'});
      }
      else {
        pizza.save(function(err, data) {
          if (err) {
            self.flash.error(err);
            self.redirect({action: 'edit'});
          }
          else {
            self.redirect({controller: self.name});
          }
        });
      }
    });
  };

  this.destroy = function (req, resp, params) {
    var self = this;

    geddy.model.Pizza.remove(params.id, function(err) {
      if (err) {
        self.flash.error(err);
        self.redirect({action: 'edit'});
      }
      else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Pizzas = Pizzas;
