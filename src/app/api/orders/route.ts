import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) return NextResponse.json({ items: [] }, { status: 401 });
  const orders = await prisma.order.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ items: orders });
}

export async function POST(_req: NextRequest) {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const cart = await prisma.cart.findUnique({ where: { userId }, include: { items: true } });
  if (!cart || cart.items.length === 0) return NextResponse.json({ error: "empty" }, { status: 400 });
  const products = await prisma.product.findMany({ where: { id: { in: cart.items.map(i => i.productId) } } });
  const itemsData = cart.items.map((ci) => ({ productId: ci.productId, quantity: ci.quantity, price: products.find(p => p.id === ci.productId)!.price }));
  const total = itemsData.reduce((sum, it) => sum + Number(it.price) * it.quantity, 0);
  const order = await prisma.order.create({ data: { userId, total, items: { create: itemsData } } });
  await prisma.cart.update({ where: { userId }, data: { items: { deleteMany: {} } } });
  return NextResponse.json({ order });
}


