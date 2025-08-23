import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notifyUser } from "@/server/realtime";

export async function GET() {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) return NextResponse.json({ items: [] }, { status: 401 });
  const items = await prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const isAdmin = (session as any)?.user?.role === 'ADMIN';
  if (!isAdmin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const body = await req.json().catch(() => null);
  if (!body || !body.title || !body.body) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  const notif = await prisma.notification.create({ data: { title: body.title, body: body.body } });
  await notifyUser('broadcast', notif);
  return NextResponse.json({ ok: true });
}


