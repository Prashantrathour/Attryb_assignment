const mongoose = require("mongoose");
const express = require("express");
const { oemModels } = require("./OEM_Specs.model");
const { userModel } = require("./user.model");
// const marketplaceInventoryRouter=express.Router()

const marketplaceInventorySchema = mongoose.Schema({
  km: { type: Number, required: true },
  majorScratches: { required: true, type: String },
  price: { required: true, type: Number },
  orginalPaint: { required: true, type: String },
  accidents: { required: true, type: Number },
  prevBuyers: { required: true, type: Number },
  registrationPlace: { required: true, type: String },
  oemId: { type: mongoose.Schema.Types.ObjectId, ref: oemModels },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: userModel },
  img: { type: String, required: true },
  title: { type: String, required: true },
  des: { type: Array, required: true },
});
const InventoryModel = mongoose.model(
  "Marketplace_Inventory",
  marketplaceInventorySchema
);
module.exports = { InventoryModel };
