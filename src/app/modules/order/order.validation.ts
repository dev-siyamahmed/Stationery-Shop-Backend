import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  product: z.string().min(1, { message: 'Product ID is required.' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1.' }),
  totalPrice: z.number().min(0, { message: 'Total price must be a positive number.' }),
});

export default orderValidationSchema;
