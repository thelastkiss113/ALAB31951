// db/conn.mjs
import mongoose from 'mongoose';

// Get the MongoDB connection URI from environment variables
const uri = process.env.ATLAS_URI;

if (!uri) {
  console.error('Error: ATLAS_URI environment variable not set');
  process.exit(1);
}

// Establish a connection to the MongoDB database using Mongoose
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB via Mongoose');
  })
  .catch((err) => {
    console.error('Mongoose connection error:', err);
    process.exit(1); // Exit the application if the connection fails
  });

// Export the Mongoose connection to be used in other modules
export default mongoose;
