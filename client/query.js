const { User, Items, Cart, Purchases } = require("../Graphql/TypeDef");
const UserController = require("../controller/User");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
} = require("graphql");
const Userdb = require("../models/model");
const itemsDb = require("../models/items");
const cartsdb = require("../models/cart");
const purchasesdb = require("../models/purchases");

const query = new GraphQLObjectType({
  name: "query",
  fields: {
    getItemsList: {
      type: new GraphQLList(Items),
      resolve(parent, args) {
        return itemsDb.find({});
      },
    },
    getCartList: {
      type: new GraphQLList(Cart),
      args: {
        userId: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const cartItems = await cartsdb
          .find({ userId: args.userId })
          .populate("itemId")
          .exec();
        console.log(cartItems);

        return cartItems;
      },
    },

    getPurchasesList: {
      type: new GraphQLList(Purchases),
      args: {
        userId: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const purchases = purchasesdb
          .find({ userId: args.userId })
          .populate("itemId")
          .exec();
        console.log(purchases);
        return purchases;
      },
    },
  },
});

module.exports = {
  query,
};