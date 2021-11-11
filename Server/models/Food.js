const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  foodName: { type: String, required: true },

  daySinceIAte: { type: Number, required: true },
});

module.exports = mongoose.model("Food", FoodSchema);
