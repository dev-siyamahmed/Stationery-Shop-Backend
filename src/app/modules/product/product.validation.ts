import { z } from 'zod';

// Zod Schema for Product Validation
const ProductValidation = z.object({
  name: z
    .string({
      required_error: 'Product name is required.',
    })
    .min(3, { message: 'Product name must be at least 3 characters.' })
    .max(100, { message: 'Product name cannot exceed 100 characters.' })
    .trim(),
  brand: z
    .string({
      required_error: 'Brand is required.',
    })
    .min(2, { message: 'Brand name must be at least 2 characters.' })
    .max(50, { message: 'Brand name cannot exceed 50 characters.' })
    .trim(),

  price: z
    .number({
      required_error: 'Price is required.',
      invalid_type_error: 'Price must be a positive number',
    })
    .nonnegative({ message: 'Price must be a positive number' }),

  category: z
    .string({
      required_error: 'Category is required.',
    })
    .refine(
      (value) =>
        [
          'Writing',
          'Office Supplies',
          'Art Supplies',
          'Educational',
          'Technology',
        ].includes(value.replace(/([A-Z])/g, ' $1').trim()),
      { message: 'Invalid category format.' },
    ), // Enum for category validation
  description: z
    .string({
      required_error: 'Description is required.',
    })
    .min(10, { message: 'Description must be at least 10 characters.' })
    .max(500, { message: 'Description cannot exceed 500 characters.' })
    .trim(),
  quantity: z
    .number({
      required_error: 'Quantity is required.',
      invalid_type_error: 'Quantity must be a number.',
    })
    .nonnegative({ message: 'Quantity cannot be less than 0.' }),
  inStock: z
    .boolean({
      required_error: 'Stock status is required.',
      invalid_type_error: 'Stock status must be a boolean.',
    })
    .default(true),
});

// Exporting the inferred ProductType for consistency
export default ProductValidation;
