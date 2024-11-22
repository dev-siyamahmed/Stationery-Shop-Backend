import { ProductModel } from '../product/product.model';
import { OrderType } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (orderData: OrderType) => {
  // Fetch the product to ensure it exists and has sufficient stock
  const product = await ProductModel.findById(orderData.product);

  if (!product) {
    throw new Error('Product not found.');
  }

  // Check if the product has sufficient stock
  if (product.quantity < orderData.quantity) {
    throw new Error('stock not available.');
  }

  const totalPrice = orderData.quantity * product.price;

  // Deduct the ordered quantity from the product's inventory
  product.quantity -= orderData.quantity;

  // If the product quantity goes to 0, set `inStock` to false
  if (product.quantity === 0) {
    product.inStock = false;
  }

  // Save the updated product
  await product.save();

  // Create the order with the calculated totalPrice
  const newOrder = await OrderModel.create({
    ...orderData,
    totalPrice,
  });

  return newOrder;
};

const getOrderRevenueFromDB = async () => {
  const revenueData = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
};

export const OrderService = {
  createOrderIntoDB,
  getOrderRevenueFromDB,
};
