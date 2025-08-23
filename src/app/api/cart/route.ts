import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { addToCartSchema } from "@/lib/validation";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const json = await req.json().catch(() => null);
  const parsed = addToCartSchema.safeParse(json ?? Object.fromEntries((await req.formData()).entries()));
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const { productId, quantity } = parsed.data;
  await prisma.cart.upsert({
    where: { userId },
    update: {
      items: {
        upsert: {
          where: { cartId_productId: { cartId: (await prisma.cart.findUnique({ where: { userId } }))?.id ?? "", productId } },
          update: { quantity: { increment: quantity } },
          create: { productId, quantity },
        },
      },
    },
    create: {
      userId,
      items: { create: { productId, quantity } },
    },
  });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) return NextResponse.json({ items: [] });
  const cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } });
  return NextResponse.json(cart ?? { items: [] });
}


