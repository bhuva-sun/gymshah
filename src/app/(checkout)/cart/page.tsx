import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CartPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;
  const cart = userId
    ? await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
      })
    : null;
  const items = cart?.items ?? [];
  const total = items.reduce((sum, it) => sum + Number(it.price ?? it.product.price) * it.quantity, 0);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="space-y-3">
        {items.length === 0 && <div>Your cart is empty.</div>}
        {items.map((it) => (
          <div key={it.id} className="border rounded p-4 flex justify-between">
            <div>
              <div className="font-medium">{it.product.title}</div>
              <div className="text-sm text-muted-foreground">Qty {it.quantity}</div>
            </div>
            <div>${Number(it.product.price).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="font-semibold">Total</div>
        <div className="font-bold">${total.toFixed(2)}</div>
      </div>
      <Link href="/checkout" className="inline-block mt-4 border rounded px-4 py-2">Checkout</Link>
    </div>
  );
}


