const express=require("express")
const cookieParser = require("cookie-parser");
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())
const env=require("dotenv")
const { userRouter } = require("./routers/user.router")
const connection = require("./config/db");
const { marketplaceInventoryRouter } = require("./routers/market_Inventry");
const { OEM_SpecsRouter } = require("./routers/OEM_Specs.router");
env.config()
app.use(cookieParser());
app.use("/OEM_spaces",OEM_SpecsRouter)
app.use("/market-inventry",marketplaceInventoryRouter)
app.use("/users",userRouter)


app.listen(process.env.PORT, async()=>{
    try {
       await connection
       console.log("connection setup with db") 
    } catch (error) {
        
    }
    console.log("listening on "+process.env.PORT)
})