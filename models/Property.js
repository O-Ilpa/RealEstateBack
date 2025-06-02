import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    creatorId: {
      type: String,
    },
    propertyId: {
      type: String,
      required: true,
      unique: true,
    },
    yearBuilt: {
      type: mongoose.mongoose.Schema.Types.Mixed,  // Can accept either String or Number
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["إيجار", "تمليك"],
      required: true,
    },
    agent: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    size: {
      type: mongoose.mongoose.Schema.Types.Mixed,   
      required: true,
    },
    floor: {
      type: mongoose.mongoose.Schema.Types.Mixed,   
      required: true,
    },
    isLastFloor: {
      type: Boolean,
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Mixed,   
      required: true,
    },
    finishing: {
      type: String,
      required: true,
    },
    rooms: {
      type: mongoose.Schema.Types.Mixed,   
      required: true,
    },
    reception: {
      type: mongoose.Schema.Types.Mixed,   
      required: true,
    },
    bathrooms: {
      type: mongoose.Schema.Types.Mixed,   
      required: true,
    },
    meters: {
      type: [String],
      required: true,
    },
    elevators: {
      type: mongoose.Schema.Types.Mixed, 
      required: true,
    },
    notes: {
      type: String,
    },
    images: [
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Property", propertySchema);