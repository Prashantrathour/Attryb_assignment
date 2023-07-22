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
    res.status(404).send({ msg:"geting error while posting" });
  }
});

//this get route is used to filter the inventory documents on the bases of the populated relations
//so that we can get the desired results

invetoryRouter.get("/inventory", async (req, res) => {
  // const search="Honda"
  const { order, filter, search } = req.query;
if( !order || !filter ){
  let deals = await InventoryModel.find({}).populate({
    path: "oemId",
  });

  res.status(200).json({ deals });
  return
}

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
   
     
      async function getDeals(sortOrder) {
         sortOrder = order === 'desc' ? -1 : 1;
        try {
          const pipeline = [
            // Sorting the data in descending order based on the 'mileage_miles' field
            { $sort: { 'oemId.mileage_miles':  sortOrder} },
      
            // Performing the $lookup to populate the 'oemId' field
            {
              $lookup: {
                from: 'oem_specs',
                localField: 'oemId',
                foreignField: '_id',
                as: 'oemData'
              }
            },
      
            // Unwinding the 'oemData' array to get a single document
            { $unwind: '$oemData' },
      
            // Sorting the data in ascending order based on the 'mileage_miles' field
            { $sort: { 'oemData.mileage_miles': sortOrder} }
          ];
      
          const sortedDeals = await InventoryModel.aggregate(pipeline);
     
          res.status(200).send({ deals:sortedDeals });
        } catch (err) {
          console.error(err);
         
        }
      }



      if (order == "desc") {
        getDeals("desc")
     
        // deals.sort((a, b) => b.oemId.mileage_miles - a.oemId.mileage_miles);
      } else {
        getDeals("asc")
        // deals.sort((a, b) => a.oemId.mileage_miles - b.oemId.mileage_miles);
      }






      
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

      res.status(200).json({ deals });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
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

//delete particular inventories route to deleteing the document by finding by ids 
invetoryRouter.post("/delete", function(req, res) {
  console.log(req.body)
  res.json({res:req.body})
})
invetoryRouter.delete("/inventory/:ids", async (req, res) => {

  const idsTodelete=req.params.ids.split(",")  //geting string and split for convert array
  if(!idsTodelete){
    res.status(404).send({ msg:"enter ids to delete" });
  }

  try {
    const result = await InventoryModel.deleteMany({ _id: { $in: idsTodelete } });
   
    res.status(200).send({ msg: "Inventory deleted successfully.",count:result.deletedCount });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = { invetoryRouter };