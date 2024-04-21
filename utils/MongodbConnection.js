import mongoose from "mongoose"
const MongodbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('database connection successfully !')

    } catch (error) {
    console.log("🚀 ~ file: MongodbConnection.js:9 ~ error:", error);

    }

}

export default MongodbConnection


