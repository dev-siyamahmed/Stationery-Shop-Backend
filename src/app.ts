import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRouters } from './app/modules/order/order.route';
import errorHandler from './app/middleware/error.middleware';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', ProductRoutes);
app.use('/api', OrderRouters);



app.get("/", (req: Request, res :Response) => {
    res.status(200).json({ message: "Welcome to Stationery Shop Server" });
});

// Error-handling middleware
app.use(errorHandler);

export default app;
