import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const session = await auth();
  if (!session) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Account</h1>
        <form action={async () => { 'use server'; await signIn(); }}>
          <button className="border rounded px-4 py-2">Sign in</button>
        </form>
      </div>
    );
  }
  const orders = await prisma.order.findMany({ where: { userId: (session.user as any).id }, orderBy: { createdAt: 'desc' }, include: { items: { include: { product: true } } } });
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{session.user?.name || 'Your Account'}</h1>
          <div className="text-sm text-muted-foreground">{session.user?.email}</div>
        </div>
        <form action={async () => { 'use server'; await signOut(); }}>
          <button className="border rounded px-4 py-2">Sign out</button>
        </form>
      </div>
      <section>
        <h2 className="font-semibold mb-2">Orders</h2>
        <div className="space-y-3">
          {orders.length === 0 && <div>No orders yet.</div>}
          {orders.map((o) => (
            <div key={o.id} className="border rounded p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{o.status}</div>
                <div className="font-bold">${Number(o.total).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


