import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return notFound();
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>›</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <span>›</span>
            <span className="text-foreground font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-border/50 flex items-center justify-center">
              <span className="text-8xl">
                {product.category === 'Supplements' ? '🥛' : 
                 product.category === 'Equipment' ? '🏋️' : 
                 product.category === 'Apparel' ? '👕' : '💪'}
              </span>
            </div>
            {/* Thumbnail Gallery Placeholder */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-card/50 border border-border/50 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{product.title}</h1>
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-500">⭐</span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.rating || 5.0}) • 150+ reviews</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">
                ${product.price.toString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Free shipping on orders over $50
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "Premium quality product designed to help you achieve your fitness goals. Made with the finest ingredients and materials for maximum effectiveness and durability."}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-bold text-lg">Key Features:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Scientifically tested formula</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>30-day money back guarantee</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary">✓</span>
                  <span>Fast and free shipping</span>
                </li>
              </ul>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 pt-6 border-t border-border/50">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Quantity:</label>
                  <select className="bg-card border border-border rounded-lg px-3 py-2 text-sm">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <form action={`/api/cart`} method="post" className="flex-1">
                  <input type="hidden" name="productId" value={product.id} />
                  <button type="submit" className="w-full btn-primary text-lg py-4 rounded-xl font-semibold">
                    Add to Cart 🛒
                  </button>
                </form>
                <button className="px-6 py-4 border border-border hover:border-primary/50 hover:bg-primary/5 rounded-xl transition-all duration-200">
                  ♥️
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span>🚚</span>
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span>🔄</span>
                  <span>Easy returns</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span>✨</span>
                  <span>Quality guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


