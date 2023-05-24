import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

// DAY Schema
const daySchema = new Schema(
  {
    date: String,
    revenue: {
      type: mongoose.Types.Currency,
      currenct: "GBP",
      get: (value) => value / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      currenct: "GBP",
      get: (value) => value / 100,
    },
  },
  { toJSON: { getters: true } } // required when using 'get' properties
);

// MONTH Schema
const monthSchema = new Schema(
  {
    month: String,
    revenue: {
      type: mongoose.Types.Currency,
      currenct: "GBP",
      get: (value) => value / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      currenct: "GBP",
      get: (value) => value / 100,
    },
    operationalExpenses: {
      type: mongoose.Types.Currency,
      currenct: "GBP",
      get: (value) => value / 100,
    },
    nonOperationalExpenses: {
      type: mongoose.Types.Currency,
      currenct: "GBP",
      get: (value) => value / 100,
    },
  },
  { toJSON: { getters: true } } // required when using 'get' properties
);

// KPI Schema
const KPISchema = new Schema(
  {
    totalRevenue: {
      type: mongoose.Types.Currency,
      currenct: "GBP",
      get: (value) => value / 100,
    },
    totalExpenses: {
      type: mongoose.Types.Currency,
      currenct: "GBP",
      get: (value) => value / 100,
    },
    expensesByCategory: {
      type: Map,
      of: {
        type: mongoose.Types.Currency,
        currenct: "GBP",
        get: (value) => value / 100,
      },
    },
    totalProfit: {
      type: mongoose.Types.Currency,
      currenct: "GBP",
      get: (value) => value / 100,
    },
    monthlyData: [monthSchema], // schema above
    dailyData: [daySchema], // schema above
  },
  { timestamps: true, toJSON: { getters: true } } // timestamp for when created, toJSON required when using 'get' properties
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
