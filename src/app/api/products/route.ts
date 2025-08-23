import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productFilterSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const parsed = productFilterSchema.safeParse(Object.fromEntries(url.searchParams.entries()));
  const { q, category, sort, min, max, page = 1, size = 12 } = parsed.success ? parsed.data : {} as any;
  const where: any = {};
  if (q) where.title = { contains: q, mode: "insensitive" };
  if (category) where.category = category;
  if (typeof min === "number" || typeof max === "number") {
    where.price = {};
    if (typeof min === "number") where.price.gte = min;
    if (typeof max === "number") where.price.lte = max;
  }
  
  let orderBy: any = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { price: "asc" };
  else if (sort === "price_desc") orderBy = { price: "desc" };
  else if (sort === "rating") orderBy = { rating: "desc" };
  else if (sort === "popularity") orderBy = { popularity: "desc" };
  
  const [items, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip: (page - 1) * size, take: size }),
    prisma.product.count({ where }),
  ]);
  return NextResponse.json({ items, total });
}


