const mongoose = require('mongoose');

// Article Schema
const ArticleSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  date:{
    type: String
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  }
});

const Article = module.exports = mongoose.model('Article', ArticleSchema);