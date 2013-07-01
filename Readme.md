# Inheriting Models In Geddy

This is just a simple demonstration of how you can extend models in Geddy. The `Pizza` model has a `toppings` property, and inherits a `name` property from the `Item` model, which is in `app/helpers` as it doesn't need to be registered.

Just define all your properties and validations as per normal in the `app/helpers/item.js` constructor, and `.apply()` it in `app/models/pizza.js` to inherit those properties.
