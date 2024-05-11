const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    status: {
      type: String,
      enum: ["en progreso", "completado", "cancelado"],
      default: "en progreso",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
