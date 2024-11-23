import { ProductModel } from '../product/product.model';
import { OrderType } from './order.interface';
import { OrderModel } from './order.model';


export const createOrderIntoDB = async (orderData: OrderType) => {

  // product model the axisting product get

  const product = await ProductModel.findById(orderData.product);

  if (!product) {
    throw new Error('Product not found.');
  }

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
  });

  
  return newOrder;
};


const getOrderRevenueFromDB = async () => {
  const revenueData = await OrderModel.aggregate([
    // Lookup product details
    {
      $lookup: {
        from: "orders", 
        localField: "product", 
        foreignField: "_id", 
        as: "productDetails",
      },
    },
    // Project only the required fields
    {
      $project: {
        quantity: 1,
        "productDetails.price": 1,
      },
    },
    // Add a new field for order total
    {
      $addFields: {
        orderTotal: {
          $multiply: ["$quantity", { $arrayElemAt: ["$productDetails.price", 0] }],
        },
      },
    },
    // Group to calculate total revenue
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$orderTotal" },
      },
    },
  ]);

  // Return total revenue or 0 if no data
  return revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
};


export const OrderService = {
  createOrderIntoDB,
  getOrderRevenueFromDB,
};
