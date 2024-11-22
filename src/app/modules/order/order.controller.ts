import { Request, Response } from 'express';
import { Types } from 'mongoose';
import orderValidationSchema from './order.validation';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const validatedData = orderValidationSchema.parse(req.body);

    // Ensure `product` is a valid ObjectId
    if (!Types.ObjectId.isValid(validatedData.product)) {
      return res.status(400).json({
        message: 'Invalid product ID format.',
        status: false,
      });
    }

    // Convert `product` to ObjectId
    const productObjectId = new Types.ObjectId(validatedData.product);

    // Prepare order data
    const orderData = {
      ...validatedData,
      product: productObjectId, // Use ObjectId for the product field
    };

    // Place the order
    const order = await OrderService.createOrderIntoDB(orderData);

    res.status(200).json({
      message: 'Order created successfully.',
      status: true,
      data: order,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        message: err.message,
        status: false,
      });
    } else {
      res.status(500).json({
        message: 'Internal server error.',
        status: false,
      });
    }
  }
};

const getOrderRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderService.getOrderRevenueFromDB();

    res.status(200).json({
      message: 'Revenue calculated successfully.',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error.',
      status: false,
    });
  }
};

export const OrderController = {
  createOrder,
  getOrderRevenue,
};
