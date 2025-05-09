const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  },
  group: {
    type: String, 
  },
   
},{ timestamps: true });

module.exports = mongoose.model('SubCategory', SubCategorySchema);