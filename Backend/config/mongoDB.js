import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect("mongodb://mangulenjeedward:44455@ac-l5frxv5-shard-00-00.kt5krjl.mongodb.net:27017,ac-l5frxv5-shard-00-01.kt5krjl.mongodb.net:27017,ac-l5frxv5-shard-00-02.kt5krjl.mongodb.net:27017/?replicaSet=atlas-557yj0-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0/urbannest").then(()=>console.log("DB Connected"));
}

// const connectDB = async ()=>{
//     try {
//         mongoose.connection.on('Connected',()=>console.log("DB Connected"));
//         await mongoose.connect(`${process.env.MONGODB_URI}/urbannest`)
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// export default connectDB;