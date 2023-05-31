import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

// KPI Schema
const ProductSchema = new Schema(
  {
    price: {
      type: mongoose.Types.Currency,
      currency: "GBP",
      get: (value) => value / 100,
    },
    expense: {
      type: mongoose.Types.Currency,
      currency: "GBP",
      get: (value) => value / 100,
    },
    // we are referreing to Transaction Object, each txn related to this product
    // this allows us to grab all txns (and IDs) of a particular product
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } } // timestamp for when created, toJSON required when using 'get' properties
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
