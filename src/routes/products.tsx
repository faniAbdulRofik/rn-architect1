import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { waLink } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Produk — RN_ARCHITECT" },
      { name: "description", content: "Katalog furnitur dan interior custom RN_ARCHITECT — pesan langsung via WhatsApp." },
      { property: "og:title", content: "Produk — RN_ARCHITECT" },
    ],
  }),
  component: ProductsPage,
});

type Product = {
  id: string;
  title: string;
  category: "Meja" | "Lemari" | "Sofa";
  material: string;
  status: "Custom" | "Ready";
  img: string;
};

const products: Product[] = [
  { id: "1", title: "Meja Makan Solid Oak", category: "Meja", material: "Oak", status: "Custom", img: product1 },
  { id: "2", title: "Lemari Walnut 4 Pintu", category: "Lemari", material: "Walnut", status: "Custom", img: product2 },
  { id: "3", title: "Sofa Velvet Bamboo", category: "Sofa", material: "Velvet", status: "Ready", img: product3 },
  { id: "4", title: "Meja Kerja Minimalis", category: "Meja", material: "Teak", status: "Custom", img: product1 },
  { id: "5", title: "Wardrobe Premium", category: "Lemari", material: "Walnut", status: "Custom", img: product2 },
  { id: "6", title: "Lounge Sofa 3 Seater", category: "Sofa", material: "Linen", status: "Ready", img: product3 },
];

const categories = ["Semua", "Meja", "Lemari", "Sofa"] as const;

function ProductsPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("Semua");
  const [q, setQ] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = cat === "Semua" || p.category === cat;
    const matchQ = q === "" || p.title.toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <SiteLayout>
      <section className="pt-40 pb-12 bg-gradient-warm">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Katalog</p>
          <h1 className="text-5xl md:text-6xl text-balance leading-tight">Produk interior custom</h1>
          <p className="mt-6 text-muted-foreground max-w-xl">
            Setiap produk dapat dipesan custom sesuai dimensi, material, dan finishing yang Anda
            inginkan. Pemesanan dilakukan langsung melalui WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-12 sticky top-16 z-30 bg-background/90 backdrop-blur border-b border-border">
        <div className="container mx-auto px-6 flex flex-wrap gap-4 items-center justify-between py-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm transition-smooth ${
                  cat === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari produk…"
            className="px-4 py-2 rounded-full border border-input bg-background text-sm w-full sm:w-64"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <a
                key={p.id}
                href={waLink(`Halo, saya tertarik dengan produk: ${p.title}`)}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-lg overflow-hidden bg-card border border-border hover:shadow-elegant transition-smooth"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg leading-snug">{p.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {p.category} · {p.material}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-smooth" />
                  </div>
                  <span
                    className={`inline-block mt-3 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                      p.status === "Custom"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {p.status === "Custom" ? "Custom Available" : "Ready Stock"}
                  </span>
                </div>
              </a>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">
              Tidak ada produk yang cocok dengan pencarian.
            </p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
