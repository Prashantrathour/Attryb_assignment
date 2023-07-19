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
      res.status(200).send(specs);
    } else {
      let specs = await oemModels.find({});
      res.send(specs);
    }
  } catch (error) {
    res.send({ error });
  }
});

module.exports = { OEM_SpecsRouter };
