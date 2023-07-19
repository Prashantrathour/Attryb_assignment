const { Schema, model } = require("mongoose");



const oemModelsSchema =  Schema({
    manufacturer: String,
    model_name: String,
    year_of_model: Number,
    list_priceNumber:Number,
    mileage:Number,
    power_bhp:Number,
    max_speed:Number,
  });
  const oemModels=model("OEM_Specs",oemModelsSchema)
  module.exports={oemModels}