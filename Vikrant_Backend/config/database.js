import mongoose from "mongoose"

const connectDb = async()=>{
    try{
            const mongoDbUrl = process.env.MONGODB_URI;
            if(!mongoDbUrl){
                throw new Error('Mongodb url is no defined');
            }
            const conn = await mongoose.connect(mongoDbUrl);
            console.log(`user connected successfully ${conn.connection.host}`);
            console.log(`Database name ${conn.connection.name}`);
    }
    catch(error){
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🔴 MongoDB connection closed due to app termination');
    process.exit(0);
});

export default connectDb;