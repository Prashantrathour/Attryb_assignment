const express = require("express");
const { auth } = require("../middleware/Auth.middleware");
const invetoryRouter = express.Router();
const {InventoryModel}=require("../models/marketplaceInventry.model.js")
//this post route is used to add the new inventory or deal document to the inventory collection
invetoryRouter.use(auth)
invetoryRouter.post("/inventory", async (req, res) => {
  try {
    let newInventoryModal = InventoryModel(req.body);
    await newInventoryModal.save();
    res.status(200).send({ msg: "Deal Added Successs" });
  } catch (error) {
    res.send({ error });
  }
});

//this get route is used to filter the inventory documents on the bases of the populated relations
//so that we can get the desired results

invetoryRouter.get("/inventory", async (req, res) => {
  // const search="Honda"
  const { order, filter, search } = req.query;
  try {
    if (filter === "price") {
      let deals;
      //if order is desc then we are sorting the data and sending on fronted on the basis of price in descending order

      if (order == "desc") {
        deals = await InventoryModel.find({})
          .populate("oemId")
          .sort({ price: -1 });
        console.log(deals);
      } else {
        //else if  then we are sorting the data and sending on fronted on the basis of price in ascending price
        deals = await InventoryModel.find({})
          .populate("oemId")
          .sort({ price: 1 });
      }

      res.status(200).send({ deals });
    } else if (filter == "mileage") {
      let deals = await InventoryModel.find({}).populate("oemId").lean();

      if (order == "desc") {
        //if data order is descegin and filter is mileage than we are populated the oem model so that
        //we can get the desired mileage data from the realation oemId and sort on the basis of the data
        //this will lean the data in plain js object and after sorting we can send to frontend

        deals.sort((a, b) => b.oemId.mileage_miles - a.oemId.mileage_miles);
      } else {
        deals.sort((a, b) => a.oemId.mileage_miles - b.oemId.mileage_miles);
      }

      res.status(200).send({ deals });
    } else if (filter === "colors") {
      //this is used for colors filter as we have populated oemId and mathing the colors with regex query
      //having opitons i which enable case sensitive searching

      let deals = await InventoryModel.find({}).populate({
        path: "oemId",
        match: { available_colors: { $regex: order, $options: "i" } },
      });
      //math will return the documnets which are  not found allso but wich null so we are filtering and sending on frontend
      deals = deals.filter((deal) => deal.oemId !== null);

      res.status(200).send({ deals });
    } else {
      let deals = await InventoryModel.find({}).populate({
        path: "oemId",
      });

      res.status(200).send({ deals });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

//particular user deals


//to get the partiucalar deal by id 
invetoryRouter.get("/inventory/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let deals = await InventoryModel.findById(id);
    res.status(200).send({ deals });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});


//update particular inventory route to update the document by finding by id 

invetoryRouter.patch("/inventory/:id", async (req, res) => {
  const { id } = req.params;
 
  try {
    await InventoryModel.findByIdAndUpdate(id, req.body);
    res.status(200).send({ msg: "Updated Deal Success" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

//delete particular inventory route to deleteing the document by finding by id 

invetoryRouter.delete("/inventory/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await InventoryModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Deleted Deal Success" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = { invetoryRouter };