import { ProductType } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: ProductType) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

const updateProductInFromDB = async (
  _id: string,
  updatedData: Partial<ProductType>,
) => {
  const product = await ProductModel.findById(_id);

  if (!product) {
    return null;
  }

  // Update the product with the new values
  Object.assign(product, updatedData);

  // Save the updated product back to the database
  const updatedProduct = await product.save();

  return updatedProduct;
};

const deleteProductInFromDB = async (_id: string) => {
  const result = await ProductModel.deleteOne({ _id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInFromDB,
  deleteProductInFromDB,
};
