export type ProductCategory =
  | 'Writing'
  | 'Office Supplies'
  | 'Art Supplies'
  | 'Educational'
  | 'Technology';

export interface ProductType {
  name: string;
  brand: string;
  price: number;
  category: ProductCategory; // Use the union type here
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}
