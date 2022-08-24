const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carsSchema = new Schema(
  {
    id: Number,
    color: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    reg_no: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: true }
);

module.exports = mongoose.model("Cars", carsSchema);
