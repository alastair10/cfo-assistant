import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import KPI from "./models/KPI.js";
import { kpis, products, transactions } from "./data/data.js"; // import the seed data

// CONFIGURATION Boilerplate to enable packages
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes); // route for product and expenses
app.use("/transaction", transactionRoutes);

// MONGOOSE SERVER CONNECTION
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Running on server Port: ${PORT}`));

    // ADD DATA ONCE OR AS NEEDED!
    // await mongoose.connection.db.dropDatabase(); // drop current db before seeding, need ADMIN privilege for this
    // KPI.insertMany(kpis); // seeding data: insert kpis into kpi db
    // Product.insertMany(products); // seeding data: insert products into product db
    // Transaction.insertMany(transactions); // seeding data: insert transactions into transaction db
  })
  .catch((error) => console.log(`${error} did not connect.`));
