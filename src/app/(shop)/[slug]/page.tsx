import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return notFound();
  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      <div className="border rounded h-64 bg-muted" />
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="text-sm text-muted-foreground">{product.category}</div>
        <p className="mt-4 whitespace-pre-line">{product.description}</p>
        <div className="mt-6 text-2xl font-bold">${product.price.toString()}</div>
        <form action={`/api/cart`} method="post" className="mt-4">
          <input type="hidden" name="productId" value={product.id} />
          <button className="border rounded px-4 py-2">Add to cart</button>
        </form>
      </div>
    </div>
  );
}


