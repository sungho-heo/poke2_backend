import mongoose from "mongoose";

// mongodb 설정및 연결.
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MongoDB URI not found");
    process.exit(1);
  }
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected!");
  } catch (error: any) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
