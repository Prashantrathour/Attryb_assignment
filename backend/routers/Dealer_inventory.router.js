const express=require("express")
const { auth } = require("../middleware/Auth.middleware")
const { dealerModel } = require("../models/dealer_inventery.model")
const dealerRouter=express.Router()

dealerRouter.use(auth)
dealerRouter.post("/create",async(req,res)=>{
try {
    const postInventory=new dealerModel(req.body)
    const inventory=await postInventory.save()
    res.json({msg:"Inventry posted"})
} catch (error) {
   res.status(404).json({msg:"error posting inventory"}) 
}
})
dealerRouter.get("/",async(req,res)=>{
try {
    const postInventory=await dealerModel.find()
   
    res.json(postInventory)
} catch (error) {
   res.status(404).json({msg:"error posting inventory"}) 
}
})

dealerRouter.delete('/', async (req, res) => {
    const { car_ids } = req.body;
    try {
      await dealerModel.deleteMany({ _id: { $in: car_ids } });
      res.json({ msg: 'Cars deleted successfully' });
    } catch (err) {
      console.error('Error deleting cars:', err);
      res.status(500).json({ msg: 'Internal server error' });
    }
  });

  app.put('/:carId', async (req, res) => {
    const carId = req.params.carId;
    const updatedCarDetails = req.body;
    try {
      await dealerModel.findByIdAndUpdate(carId, updatedCarDetails);
      res.json({ message: 'Car updated successfully' });
    } catch (err) {
      console.error('Error updating car details:', err);
      res.status(500).json({ error: 'Internal server error' });
    }                           
  });