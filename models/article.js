const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  url: String,
  date: Date
});

const Article = mongoose.model("article", articleSchema);

module.exports = Article;