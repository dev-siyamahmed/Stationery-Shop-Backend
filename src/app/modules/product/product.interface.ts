
export interface ProductCategory {
  Writing: 'Writing';
  OfficeSupplies: 'OfficeSupplies';
  ArtSupplies: 'ArtSupplies';
  Educational: 'Educational';
  Technology: 'Technology';
}

export interface ProductType {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: ProductCategory;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}


