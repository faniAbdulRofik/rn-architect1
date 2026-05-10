import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import hero from "@/assets/hero-architecture.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Portofolio — RN_ARCHITECT" },
      { name: "description", content: "Proyek arsitektur dan interior terpilih dari RN_ARCHITECT." },
      { property: "og:title", content: "Portofolio — RN_ARCHITECT" },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  { id: "1", title: "Bamboo Court House", cat: "Residensial", loc: "Bandung", year: 2024, img: project1, featured: true },
  { id: "2", title: "Atelier Office", cat: "Komersial", loc: "Jakarta", year: 2023, img: project2, featured: false },
  { id: "3", title: "Bamboo Lounge", cat: "Interior", loc: "Bali", year: 2024, img: hero, featured: true },
  { id: "4", title: "Studio Linggar", cat: "Komersial", loc: "Surabaya", year: 2022, img: project2, featured: false },
  { id: "5", title: "Rumah Senja", cat: "Residensial", loc: "Jakarta", year: 2023, img: project1, featured: false },
  { id: "6", title: "Living Pavilion", cat: "Interior", loc: "Bandung", year: 2024, img: hero, featured: false },
];

const cats = ["Semua", "Residensial", "Komersial", "Interior"] as const;

function ProjectsPage() {
  const [c, setC] = useState<(typeof cats)[number]>("Semua");
  const list = c === "Semua" ? projects : projects.filter((p) => p.cat === c);

  return (
    <SiteLayout>
      <section className="pt-40 pb-12 bg-gradient-warm">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Portofolio</p>
          <h1 className="text-5xl md:text-7xl text-balance leading-tight">Proyek terpilih</h1>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-6 flex flex-wrap gap-2">
          {cats.map((cat) => (
            <button
              key={cat}
              onClick={() => setC(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-smooth ${
                c === cat ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p) => (
              <article key={p.id} className={`group ${p.featured ? "lg:col-span-2 md:row-span-1" : ""}`}>
                <div className="overflow-hidden rounded-lg bg-muted aspect-[4/3] relative">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                  />
                  {p.featured && (
                    <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest bg-bamboo-soft text-bamboo-deep px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <h3 className="text-2xl">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {p.cat} · {p.loc} · {p.year}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
