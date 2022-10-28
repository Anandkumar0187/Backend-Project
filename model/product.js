const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: String,
  category : String,
  image: String,
  user: { type: Schema.Types.ObjectId, ref: "User" }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
