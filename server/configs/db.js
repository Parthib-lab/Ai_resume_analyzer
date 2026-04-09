// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         let mongodbURI = process.env.MONGODB_URI;
//         const projectName = 'Resume-Builder';

//         if (!mongodbURI) {
//             throw new Error("MONGODB_URI environment variable not set");
//         }

//         if (mongodbURI.endsWith('/')) {
//             mongodbURI = mongodbURI.slice(0, -1);
//         }

//         await mongoose.connect(`${mongodbURI}/${projectName}`);
//         console.log("MongoDB connected:", mongoose.connection.name);

//         console.log("Database connected successfully");

//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error.message);
//         process.exit(1); // 🔥 important
//     }
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;