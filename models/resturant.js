import mongoose from 'mongoose';
import slugify from 'slugify';

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: [true, 'Shop name already exists'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String,
  address: {
    city: {
      type: String,
      required: [true, 'Please add a name'],
      unique: [true, 'city name already exists'],
      maxlength: [50, 'city name can not be more than 50 characters']
    },
    street: {
      type: Number,
      required: [true, 'please add a street number'],
      unique: [true, "this a street number is already added//add another street number"],
      maxlength: [50, "street can not be more than 50 characters"],


    },
    coordinates: {
      type: [Number],
      required: [true, "Please add coordinates"],
      validate: [
        {
          validator: function (value) {
            return value.length === 2;
          },
          msg: "Coordinates must have exactly 2 elements",
        },
        {
          validator: function (value) {
            return value.every((num) => typeof num === "number");
          },
          msg: "Coordinates elements must be numbers",
        },
      ],
    },
  },

  cuisine: {
    type: String,
    required: [true, "Please add a the type of the cuisine"],
    maxlength: [50, "cuisine type can not be more than 50 characters"],
  },
  kosher: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      score: {
        type: Number,
        required: [true, "Please add a review score"],
        min: [1, "Review score must be between 1 and 5"],
        max: [5, "Review score must be between 1 and 5"],
      },
    },
  ],
},


  {
    toJSON: {
      virtuals: true,
      // Hide the _id and the __v field from the frontend
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    },
    toObject: {
      virtuals: true,
      // Hide the _id and the __v field from the frontend
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    },
  });

// Middleware - Create slug from name
ShopSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model('resturant', ShopSchema);