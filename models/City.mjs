import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  searchedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const City = mongoose.model("City", citySchema);
export default City;
