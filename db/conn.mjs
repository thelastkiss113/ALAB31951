import mongoose from "mongoose";

// Connect to MongoDB using Mongoose
const uri = process.env.ATLAS_URI;

try {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB via Mongoose");
} catch (e) {
  console.error("Error connecting to MongoDB:", e);
}

export default mongoose;