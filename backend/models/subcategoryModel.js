import mongoose, { Schema } from 'mongoose'

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentCategory:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
      }
  ],
  // Other subcategory-specific fields
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

export default Subcategory;
