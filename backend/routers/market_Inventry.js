const express = require("express");
const { auth } = require("../middleware/Auth.middleware");
const { marketplaceInventoryModel } = require("../models/marketplaceInventry.model");

const marketplaceInventoryRouter = express.Router();

marketplaceInventoryRouter.post("/create", auth, async (req, res) => {
  const {
    kms_on_odometer,
    major_scratches,
    original_paint,
    accidents_reported,
    num_previous_buyers,
    registration_place,userID
  } = req.body;
try {
    let inventry=new marketplaceInventoryModel( {
        kms_on_odometer,
        major_scratches,
        original_paint,
        accidents_reported,
        num_previous_buyers,
        registration_place,userID
      })
      const data=await inventry.save()
      res.json({msg:data})
} catch (error) {
    res.status(404).json({msg:error})
}
 
});
marketplaceInventoryRouter.get("/", auth, async (req, res) => {
  try {
    const inventry_carData=await marketplaceInventoryModel.find()
    res.json(inventry_carData)
  } catch (error) {
    res.status(404).json({msg:error})
  }
});
module.exports = { marketplaceInventoryRouter };
