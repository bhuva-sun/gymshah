import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <section className="rounded-lg border p-8 bg-background">
        <h1 className="text-3xl font-bold">Elevate Your Fitness</h1>
        <p className="text-muted-foreground mt-2">Premium gear and supplements to power your goals.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border rounded p-4">Coming soon</div>
          <div className="border rounded p-4">Coming soon</div>
          <div className="border rounded p-4">Coming soon</div>
        </div>
      </section>
    </div>
  );
}
