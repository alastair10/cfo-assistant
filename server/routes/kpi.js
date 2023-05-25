import express  from "express";
import KPI from "../models/KPI.js"; // import schema

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.status(200).json(kpis) // return success if we're getting data, send kpis to front end
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
});

export default router;