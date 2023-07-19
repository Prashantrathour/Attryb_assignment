const { Schema, model } = require("mongoose");



const Dealer_InventorySchema = new mongoose.Schema({
    image: String,
    title: String,
    description: [String],
    price: Number,
    colors: [String],
    mileage: Number,
    userID: String
    
  });
  const dealerModel=model("Dealer_inventry",Dealer_InventorySchema)
  module.exports={dealerModel}