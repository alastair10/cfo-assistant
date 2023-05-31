import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

// Transaction Schema
const TransactionSchema = new Schema(
  {
    buyer: {
      type: mongoose.Types.Currency,
      currency: "GBP",
      get: (value) => value / 100,
    },
    amount: {
      type: mongoose.Types.Currency,
      currency: "GBP",
      get: (value) => value / 100,
    },
    // we are referreing to Product Object, each product related to this txn
    // this allows us to grab all productsIds relevant to this txn
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } } // timestamp for when created, toJSON required when using 'get' properties
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
