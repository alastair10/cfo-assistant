import express from "express";
import Transaction from "../models/Transaction.js"; // import schema

const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .limit(50) // dont pull all txns... too many!
      .sort({ createdOn: -1 }); // sort by latest
    res.status(200).json(transactions); // return success if we're getting data, send transactions to front end
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
