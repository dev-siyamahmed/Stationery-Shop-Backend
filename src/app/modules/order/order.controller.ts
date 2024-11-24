import { Request, Response } from 'express';
import { Types } from 'mongoose';
import orderValidationSchema from './order.validation';
import { OrderService } from './order.service';
import config from '../../config';

const createOrder = async (req: Request, res: Response) => {
  try {
    const validatedData = orderValidationSchema.parse(req.body);

    const orderData = {
      ...validatedData,
      product: new Types.ObjectId(validatedData.product),
    };

    // Place the order
    const order = await OrderService.createOrderIntoDB(orderData);

    res.status(200).json({
      message: 'Order created successfully.',
      status: true,
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Order created feild',
      status: false,
      err: err.errors,
      stack: config.node_env === 'development' ? err.stack : undefined,
    });
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
  } catch (err: any) {
    res.status(500).json({
      message: 'Revenue calculated feild',
      status: false,
      err: err.errors,
    });
  }
};

export const OrderController = {
  createOrder,
  getOrderRevenue,
};
