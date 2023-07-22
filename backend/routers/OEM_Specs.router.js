const express = require("express");
const { oemModels } = require("../models/OEM_Specs.model");
const OEM_SpecsRouter = express.Router();

OEM_SpecsRouter.get("/getspecs", async (req, res) => {
  const { search } = req.query;
  try {
    if (search) {
      const searchQuery = {
        $or: [
          { make: { $regex: search, $options: "i" } },
          { available_colors: { $regex: search, $options: "i" } },
        ],
      };

      // Check if "search" is a valid number before adding to the search query
      const numericSearch = Number(search);
      if (!isNaN(numericSearch)) {
        // Update the "year" field query to use $eq for exact matching
        searchQuery.$or.push({ year: numericSearch });
      }

      let specs = await oemModels.find(searchQuery);
      res.status(200).json(specs);
    } else {
      let specs = await oemModels.find({});
      res.json(specs);
    }
  } catch (error) {
    res.status(404).send({msg:"Server error"})
  }
});

module.exports = { OEM_SpecsRouter };
