import express from "express";
import Product from "../models/Product.js"; // import schema

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products); // return success if we're getting data, send kpis to front end
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
