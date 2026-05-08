
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    requester: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    bloodGroup: 
    {
      type: String,
      required: true,
    },

    units: 
    {
      type: Number,
      default: 1,
    },

    location: 
    {
      type: String,
      required: true,
    },

    message: 
    {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);