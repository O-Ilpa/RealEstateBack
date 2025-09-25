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
      type: Number,
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
      type: Number,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    isLastFloor: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    finishing: {
      type: String,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
    },
    reception: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    meters: {
      type: [String],
      required: true,
    },
    elevators: {
      type: Number,
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
