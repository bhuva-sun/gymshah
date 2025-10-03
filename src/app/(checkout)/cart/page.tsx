import { getAuthSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CartPage() {
  const session = await getAuthSession();
  
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-white text-2xl">🛒</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Sign In Required</h1>
              <p className="text-muted-foreground">Please sign in to view your cart</p>
            </div>
            <Link href="/account" className="w-full btn-primary py-3 rounded-xl font-semibold text-center block">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const items = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: { product: true }
  });
  
  const total = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">🛒</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Add some products to get started with your fitness journey!
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-200 font-medium"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.id} className="bg-card/50 border border-border/50 rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">
                        {item.product.category === 'Supplements' ? '🥛' : 
                         item.product.category === 'Equipment' ? '🏋️' : 
                         item.product.category === 'Apparel' ? '👕' : '💪'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.product.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.product.category}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold gradient-text">
                      ${(Number(item.product.price) * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${Number(item.product.price).toFixed(2)} each
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-card/30 border border-border/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold gradient-text">${total.toFixed(2)}</span>
              </div>
              
              <div className="flex space-x-4">
                <Link 
                  href="/shop" 
                  className="flex-1 px-6 py-3 border border-border hover:border-primary/50 hover:bg-primary/5 rounded-xl transition-all duration-200 font-medium text-center"
                >
                  Continue Shopping
                </Link>
                <Link 
                  href="/checkout" 
                  className="flex-1 btn-primary py-3 rounded-xl font-semibold text-center"
                >
                  Checkout 🚀
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


