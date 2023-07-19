const { Schema, model } = require("mongoose");



const oemModelsSchema =  Schema({
    make: String,
    model: String,
    year: Number,
    list_price_usd:Number,
    mileage_miles:Number,
    available_colors: { required: true, type: Array },
    power_bhp:Number,
    max_speed_mph:Number,
  });
  const oemModels=model("OEM_Specs",oemModelsSchema)
  module.exports={oemModels}