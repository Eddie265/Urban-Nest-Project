import mongoose from "mongoose";

const changuSchema = new mongoose.Schema({
    tx_ret:String,
    userId:mongoose.Schema.Types.ObjectId,
    amount:Number,
    status: {type: String,default:"pending"},
    items:[Object],
},{timestamps:true});

const changuModel = mongoose.models.changu || mongoose.model("Changu",changuSchema);
export default changuModel;