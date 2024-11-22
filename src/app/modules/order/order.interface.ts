import { Types } from 'mongoose';

// interfaces/order.interface.ts
export interface OrderType {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
}
