import { Schema, model } from 'mongoose';
import { ProductType } from './product.interface';

// Mongoose Schema for Product
const ProductSchema = new Schema<ProductType>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
      minlength: [3, 'Product name must be at least 3 characters.'],
      maxlength: [100, 'Product name cannot exceed 100 characters.'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required.'],
      trim: true,
      minlength: [2, 'Brand name must be at least 2 characters.'],
      maxlength: [50, 'Brand name cannot exceed 50 characters.'],
    },
    price: {
      type: Number,
      default: 0,
      required: [true, 'Price is required.'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: {
        values: [
          'Writing',
          'Office Supplies',
          'Art Supplies',
          'Educational',
          'Technology',
        ],
        message: '{VALUE} is not a valid Category',
      },
      required: [true, 'Category is required.'],
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters.'],
      maxlength: [500, 'Description cannot exceed 500 characters.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [0, 'Quantity cannot be less than 0.'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Stock status is required.'],
      default: true,
    },
  },
  {
    timestamps: true, 
  },
);

// Create the Product model
export const ProductModel = model<ProductType>('Product', ProductSchema);
