import { NextFunction, Request, Response } from 'express';
import { ProductServices } from './product.service';
import ProductValidation from './product.validation';
import { ProductType } from './product.interface';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    // create the search query
    const searchQuery: any = {};

    if (searchTerm) {
      const term = String(searchTerm).toLowerCase();
      const fields = ['name', 'brand', 'category'];

      searchQuery.$or = fields.map((field) => ({
        [field]: { $regex: term, $options: 'i' },
      }));
    }

    // Fetch products from the database using the search query
    const products = await ProductServices.getAllProductsFromDB(searchQuery);

    if (products.length === 0) {
      return res.status(404).json({
        message: 'Products not found',
        status: false,
      });
    }

    res.status(200).json({
      message: 'Products retrieved successfully',
      status: true,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      status: false,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      status: true,
      message: 'Product is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: 'something went wrong',
      err,
    });
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
      status: true,
      message: 'Product updated successfully',
      data: result, // Send back the updated product
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductInFromDB(productId);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: 'Product not found or already deleted.',
      });
    }

    // Respond with success message
    res.status(200).json({
      status: true,
      message: 'Product deleted successfully',
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
