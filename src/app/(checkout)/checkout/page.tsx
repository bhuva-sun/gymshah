import { getAuthSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const session = await getAuthSession();
  if (!session?.user?.id) redirect('/account');
  
  const userId = session.user.id;
  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true }
  });
  
  const total = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
  
  async function placeOrder() {
    'use server';
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }
    });
    
    if (cartItems.length === 0) return;
    
    const orderData = {
      userId,
      total,
      address: "Sample Address", // In a real app, this would come from a form
      items: {
        create: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price
        }))
      }
    };
    
    // Create order
    await prisma.order.create({ data: orderData });
    
    // Clear cart
    await prisma.cartItem.deleteMany({ where: { userId } });
    
    redirect('/account');
  }
  if (items.length === 0) {
    redirect('/cart');
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-card/50 border border-border/50 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">
                        {item.product.category === 'Supplements' ? '🥛' : 
                         item.product.category === 'Equipment' ? '🏋️' : 
                         item.product.category === 'Apparel' ? '👕' : '💪'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{item.product.title}</h3>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-bold">
                    ${(Number(item.product.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border/50 pt-4">
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Total</span>
                <span className="gradient-text">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <div className="bg-card/50 border border-border/50 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Payment Details</h2>
            
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">🚧</span>
                <span className="font-semibold">Demo Mode</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This is a demonstration checkout. No actual payment will be processed.
              </p>
            </div>
            
            <form action={placeOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50" 
                  placeholder="your@email.com"
                  disabled
                  value={session?.user?.email || ''}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl" 
                  placeholder="1234 5678 9012 3456"
                  disabled
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl" 
                    placeholder="MM/YY"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVC</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl" 
                    placeholder="123"
                    disabled
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full btn-primary py-4 rounded-xl font-semibold text-lg mt-6"
              >
                Place Order 🚀
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


