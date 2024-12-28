const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String, // URL or path to the image
  description: String,
  price: Number,
  category: { type: String, enum: ['Coffee', 'Tea', 'Food', 'Juice'] },
  servingOptions: [String],
  grind: { type: String, enum: ['Whole Bean', 'Ground'] },
  roast: { type: String, enum: ['Light', 'Medium', 'Dark'] },
  origin: String,
  ratings: {
    averageRating: {
      type: Number,
      default: 0
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    allRatings: [
      {
        type: Number,
        min: 1,
        max: 5
      }
    ]
  },
  ingredients: [String],
  sales: { type: Number, default: 0 },
  tag: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }
});

const TagScheme = new mongoose.Schema({
  tag: { type: String, required: true },
  category: { type: String, enum: ['Coffee', 'Tea', 'Food', 'Juice'] },
})

ProductSchema.methods.updateRatings = function () {
  const totalRatings = this.ratings.allRatings.length;
  const averageRating = totalRatings 
    ? this.ratings.allRatings.reduce((sum, rating) => sum + rating, 0) / totalRatings 
    : 0;

  this.ratings.totalRatings = totalRatings;
  this.ratings.averageRating = averageRating.toFixed(2); // Keep it to 2 decimal places
};

const Product = mongoose.model('Product', ProductSchema);
const Tag = mongoose.model('Tag', TagScheme);

module.exports = {
  Product,
  Tag
};