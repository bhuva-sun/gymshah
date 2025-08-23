import { z } from "zod";

export const productFilterSchema = z.object({
	q: z.string().optional(),
	category: z.string().optional(),
	sort: z.enum(["price_asc", "price_desc", "popularity", "rating"]).optional(),
	min: z.coerce.number().optional(),
	max: z.coerce.number().optional(),
	page: z.coerce.number().min(1).default(1),
	size: z.coerce.number().min(1).max(50).default(12),
});

export const addToCartSchema = z.object({
	productId: z.string().cuid(),
	quantity: z.number().int().min(1).max(10).default(1),
});

export const checkoutSchema = z.object({
	items: z.array(
		z.object({
			productId: z.string().cuid(),
			quantity: z.number().int().min(1).max(10),
			price: z.number().nonnegative(),
		}),
	),
	address: z.string().min(5),
});


