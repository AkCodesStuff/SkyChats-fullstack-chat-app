import mongoose from 'mongoose'

export const connectDB = async() =>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`DataBase connected: ${connection.connection.host}`)
    }catch(err){
        console.log(`Connection Error: ${err}`)
    }
}