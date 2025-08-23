import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session) redirect('/account');
  const userId = (session.user as any).id as string;
  const cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } });
  const items = cart?.items ?? [];
  const total = items.reduce((sum, it) => sum + Number(it.product.price) * it.quantity, 0);
  async function placeOrder() {
    'use server';
    const c = await prisma.cart.findUnique({ where: { userId }, include: { items: true } });
    if (!c || c.items.length === 0) return;
    const products = await prisma.product.findMany({ where: { id: { in: c.items.map(i => i.productId) } } });
    const itemsData = c.items.map((ci) => ({
      productId: ci.productId,
      quantity: ci.quantity,
      price: products.find(p => p.id === ci.productId)!.price,
    }));
    const totalDec = itemsData.reduce((sum, it) => sum + Number(it.price) * it.quantity, 0);
    await prisma.order.create({ data: { userId, total: totalDec, items: { create: itemsData } } });
    await prisma.cart.update({ where: { userId }, data: { items: { deleteMany: {} } } });
    redirect('/account');
  }
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="space-y-2">
        {items.map((it) => (
          <div key={it.id} className="flex justify-between">
            <div>{it.product.title} x {it.quantity}</div>
            <div>${Number(it.product.price).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="font-semibold">Total</div>
        <div className="font-bold">${total.toFixed(2)}</div>
      </div>
      <form action={placeOrder} className="mt-6">
        <button className="border rounded px-4 py-2">Place order (mock)</button>
      </form>
    </div>
  );
}


