const express = require("express");
const { oemModels } = require("../models/OEM_Specs.model");
const OEM_SpecsRouter = express.Router();

OEM_SpecsRouter.get("/", async (req, res) => {
  try {
    const queryParams = req.query;
    const caseInsensitiveQueryParams = {};

    for (const key in queryParams) {
      if (Object.hasOwnProperty.call(queryParams, key)) {
        if (key === "year") {
          caseInsensitiveQueryParams[key] = parseInt(queryParams[key]);
        } else {
          caseInsensitiveQueryParams[key] = new RegExp(queryParams[key], "i");
        }
      }
    }

    const OEM_Specs = await oemModels.find(caseInsensitiveQueryParams);
    const OEM_Specs_count = await oemModels.find(caseInsensitiveQueryParams).count();
    res.status(200).json({OEM_Specs,OEM_Specs_count});
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});


module.exports = { OEM_SpecsRouter };
