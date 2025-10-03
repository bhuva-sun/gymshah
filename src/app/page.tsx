import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:py-40">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block">Elevate Your</span>
                <span className="gradient-text">Fitness Journey</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Discover premium gear and supplements designed to power your goals. 
                Transform your workout with quality you can trust.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/shop" 
                className="btn-primary text-lg px-8 py-4 font-semibold rounded-xl shadow-lg hover:shadow-primary/25"
              >
                Shop Now 💪
              </Link>
              <Link 
                href="/signup" 
                className="px-8 py-4 text-lg font-semibold rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}} />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">GymShah</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We’re committed to providing you with the best fitness products and experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-card/50 border border-border/50 rounded-2xl p-8 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Carefully curated products from trusted brands to ensure maximum effectiveness and safety.
              </p>
            </div>
            
            <div className="group bg-card/50 border border-border/50 rounded-2xl p-8 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Quick and reliable shipping to get your supplements and gear to you when you need them.
              </p>
            </div>
            
            <div className="group bg-card/50 border border-border/50 rounded-2xl p-8 card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get personalized guidance from fitness experts to help you choose the right products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-6 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover our most popular fitness essentials
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Cards */}
            {[
              { title: "Premium Protein Powder", category: "Supplements", price: "$49.99", emoji: "🥛" },
              { title: "Resistance Bands Set", category: "Equipment", price: "$29.99", emoji: "🏅" },
              { title: "Pre-Workout Formula", category: "Supplements", price: "$34.99", emoji: "⚡" }
            ].map((product, index) => (
              <div 
                key={index} 
                className="group bg-card/50 border border-border/50 rounded-2xl overflow-hidden card-hover"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    {product.emoji}
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-text">{product.price}</span>
                    <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-200 font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/shop" 
              className="inline-flex items-center px-8 py-3 text-lg font-semibold rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your
              <span className="gradient-text"> Fitness</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of fitness enthusiasts who trust GymShah for their workout needs.
              Start your journey today!
            </p>
            <Link 
              href="/signup" 
              className="btn-primary text-lg px-8 py-4 font-semibold rounded-xl shadow-lg hover:shadow-primary/25"
            >
              Get Started Now 🚀
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
