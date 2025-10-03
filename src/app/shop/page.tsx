import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { productFilterSchema } from "@/lib/validation";

export default async function ShopPage({ searchParams }: { searchParams: Promise<Record<string, string | string[]>> }) {
  const params = await searchParams;
  const parsed = productFilterSchema.safeParse(params);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Shop</span> Premium Gear
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our collection of high-quality fitness equipment and supplements
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters Section - Placeholder */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg font-medium">
              All Categories
            </button>
            <button className="px-4 py-2 hover:bg-secondary/50 border border-border rounded-lg font-medium transition-colors">
              Supplements
            </button>
            <button className="px-4 py-2 hover:bg-secondary/50 border border-border rounded-lg font-medium transition-colors">
              Equipment
            </button>
            <button className="px-4 py-2 hover:bg-secondary/50 border border-border rounded-lg font-medium transition-colors">
              Apparel
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((p) => (
              <Link 
                key={p.id} 
                href={`/shop/${p.slug}`} 
                className="group bg-card/50 border border-border/50 rounded-2xl overflow-hidden card-hover"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {p.category === 'Supplements' ? '🥛' : 
                     p.category === 'Equipment' ? '🏋️' : 
                     p.category === 'Apparel' ? '👕' : '💪'}
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">{p.category}</div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold gradient-text">
                      ${p.price.toString()}
                    </span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      ⭐ {p.rating || 5.0}
                    </div>
                  </div>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-full px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-200 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🏪</span>
            </div>
            <h3 className="text-xl font-bold mb-3">No Products Found</h3>
            <p className="text-muted-foreground mb-6">
              We're working hard to stock our shelves with amazing products.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-200 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        )}

        {/* Results Info */}
        {items.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold">{items.length}</span> of{' '}
              <span className="font-semibold">{total}</span> products
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


