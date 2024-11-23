import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import ProductValidation from './product.validation';
import { ProductType } from './product.interface';

const createProduct = async (
  req: Request,
  res: Response,
) => {
  try {
    const { product: productData } = req.body;

    // Validate product data using Zod
    const validationProductData = ProductValidation.parse(
      productData,
    ) as ProductType;

    // Try to save the validated data to DB
    const result = await ProductServices.createProductIntoDB(
      validationProductData,
    );

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      err: err.errors,
    });

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

const updateProduct = async (req: Request, res: Response,) => {
  try {
   
    const { productId } = req.params;

    const validatedUpdateData = ProductValidation.pick({
      price: true,
      quantity: true,
      name: true,
      brand: true,
      inStock: true,
      description: true,
      category: true,
    }).parse(req.body.product);


    // Call the service function to update the product
    const updatedProduct  = await ProductServices.updateProductInFromDB(
      productId,
      validatedUpdateData,
    );


    if (!updatedProduct) {
      return res.status(404).json({
        status: false,
        message: 'Product not found',
      });
    }


    res.status(200).json({
      status: true,
      message: 'Product updated successfully',
      data: updatedProduct , // Send back the updated product
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Product updated Feild',
      error: err.errors,
    });
  }
};

const deleteProduct = async (req: Request, res: Response,) => {
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
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Product deleted Feild',
      error: err.errors,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
