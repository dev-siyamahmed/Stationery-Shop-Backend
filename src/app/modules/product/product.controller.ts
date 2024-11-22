import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import ProductValidation from './product.validation';
import { ProductType } from './product.interface';
import z from 'zod';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    // product validation useing zod
    const validationProductData = ProductValidation.parse(
      productData,
    ) as ProductType;

    const result = await ProductServices.createProductIntoDB(
      validationProductData,
    );

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err: any) {
    // Check if it's a Zod validation error
    if (err instanceof z.ZodError) {
      // Map Zod error details to a more user-friendly format
      const errors = err.errors.map((err: any) => ({
        path: err.path.join(' -> '),
        message: err.message,
      }));

      // Return a meaningful error response
      return res.status(400).json({
        success: false,
        message: 'Product creation failed',
        errors,
      });
    }
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'something went wrong',
      err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'something went wrong',
      err,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { price, quantity } = req.body.product;

    const { productId } = req.params;

    const validatedUpdateData = ProductValidation.pick({
      price: true,
      quantity: true,
    }).parse({ price, quantity });

    // Call the service function to update the product
    const result = await ProductServices.updateProductInFromDB(
      productId,
      validatedUpdateData,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result, // Send back the updated product
    });
  } catch (err: any) {
    console.error(err);
    if (err instanceof z.ZodError) {
      const errors = err.errors.map((e: any) => ({
        path: e.path.join(' -> '),
        message: e.message,
      }));
      return res.status(400).json({
        success: false,
        message: 'Something went wrong',
        errors,
      });
    }
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductInFromDB(productId);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or already deleted.',
      });
    }

    // Respond with success message
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: {},
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const errors = err.errors.map((e: any) => ({
        path: e.path.join(' -> '),
        message: e.message,
      }));
      return res.status(400).json({
        success: false,
        message: 'Something went wrong',
        errors,
      });
    }
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
