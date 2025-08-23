import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { productFilterSchema } from "@/lib/validation";

export default async function ShopPage({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const parsed = productFilterSchema.safeParse(searchParams);
  const { q, category, sort, min, max, page = 1, size = 12 } = parsed.success ? parsed.data : {} as any;
  const where: any = {};
  if (q) where.title = { contains: q, mode: "insensitive" };
  if (category) where.category = category;
  if (typeof min === "number" || typeof max === "number") {
    where.price = {};
    if (typeof min === "number") where.price.gte = min;
    if (typeof max === "number") where.price.lte = max;
  }
  const orderBy = sort === "price_asc" ? { price: "asc" } : sort === "price_desc" ? { price: "desc" } : sort === "rating" ? { rating: "desc" } : sort === "popularity" ? { popularity: "desc" } : { createdAt: "desc" };

  const [items, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip: (page - 1) * size, take: size }),
    prisma.product.count({ where }),
  ]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((p) => (
          <Link key={p.id} href={`/shop/${p.slug}`} className="border rounded p-4 hover:shadow">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-muted-foreground">{p.category}</div>
            <div className="mt-2 font-bold">${p.price.toString()}</div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-sm text-muted-foreground">{total} products</div>
    </div>
  );
}


