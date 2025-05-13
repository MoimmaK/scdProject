import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Connected"));

    // Use the connection string directly, ensuring the db name is part of the URI
    const mongoURI = process.env.MONGO_URI;  // Don't append /docdoc
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

export default connectDB;
