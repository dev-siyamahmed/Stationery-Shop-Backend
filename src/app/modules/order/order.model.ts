// models/order.model.ts
import { Schema, model } from 'mongoose';
import { OrderType } from './order.interface';

const OrderSchema = new Schema<OrderType>(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address.'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product reference is required.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [1, 'Quantity must be at least 1.'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required.'],
      min: [0, 'Total price must be a positive number.'],
    },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<OrderType>('Order', OrderSchema);
