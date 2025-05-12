import express from 'express'
import cors from 'cors'
import { connectDB } from './config/mongoDB.js';
import foodRouter from './routes/foodRouter.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import { verifyPayChangu } from './controllers/orderController.js';



const app = express();
const port = process.env.PORT || 4000;



//middleware
app.use(express.json());
app.use(cors());

//mongodb connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})

// mongodb+srv://mangulenjeedward:44455@cluster0.vnkxr2i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0