import mongoose from "mongoose"

const MONGODB_URL=process.env.MONGODB_URL
let cached=(global as any).mongoose || {conn:null , promise:null}

export const connectToDb= async ()=>{
    if(cached.conn)return cached.conn

    if(!MONGODB_URL) throw new Error("MONGODB URL is missing")

    cached.promise=cached.promise || mongoose.connect(MONGODB_URL,{
        dbName:"evently",
        bufferCommands:false
    })

    cached.conn=await cached.promise
    console.log("Connected to DB")
    return cached.conn
}
