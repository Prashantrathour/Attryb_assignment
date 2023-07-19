const mongoose=require("mongoose")
const express=require("express")
// const marketplaceInventoryRouter=express.Router()

    const marketplaceInventorySchema =  mongoose.Schema({
       
        kms_on_odometer: { type: Number, required: true },
        major_scratches: { type: Boolean, required: true },
        original_paint: { type: Boolean, required: true },
        accidents_reported: { type: Number, required: true },
        num_previous_buyers: { type: Number, required: true },
        registration_place: { type: String, required: true },
        userID:String
      });
      const marketplaceInventoryModel=mongoose.model("Marketplace_Inventory",marketplaceInventorySchema)
      module.exports={marketplaceInventoryModel}