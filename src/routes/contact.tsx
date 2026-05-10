import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, waLink } from "@/lib/site";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontak — RN_ARCHITECT" },
      { name: "description", content: "Hubungi RN_ARCHITECT untuk konsultasi proyek arsitektur dan interior." },
      { property: "og:title", content: "Kontak — RN_ARCHITECT" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Mohon lengkapi nama, email, dan pesan.");
      return;
    }
    setLoading(true);
    // Placeholder — akan dihubungkan ke admin dashboard / database
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast.success("Pesan terkirim! Kami akan menghubungi Anda segera.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <SiteLayout>
      <section className="pt-40 pb-12 bg-gradient-warm">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">Kontak</p>
          <h1 className="text-5xl md:text-7xl text-balance leading-tight">
            Mari mulai <em className="text-primary not-italic">percakapan</em>.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl mb-2">Informasi</h2>
              <p className="text-muted-foreground text-sm">
                Konsultasi awal gratis. Untuk respon tercepat, hubungi via WhatsApp.
              </p>
            </div>
            <ul className="space-y-5 text-sm">
              <li className="flex gap-4">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-foreground">+{SITE.whatsapp}</div>
                  <div className="text-muted-foreground">WhatsApp & Telepon</div>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-foreground">{SITE.email}</div>
                  <div className="text-muted-foreground">Email umum</div>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-foreground">{SITE.address}</div>
                  <div className="text-muted-foreground">{SITE.hours}</div>
                </div>
              </li>
            </ul>
            <a
              href={waLink("Halo RN_ARCHITECT, saya ingin konsultasi.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-smooth"
            >
              <MessageCircle className="h-4 w-4" /> Chat WhatsApp
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 p-8 md:p-10 rounded-lg bg-card border border-border space-y-5 shadow-soft"
          >
            <h2 className="text-2xl">Kirim pesan</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nama" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            </div>
            <Field label="No. HP / WhatsApp" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <div className="space-y-1.5">
              <label className="text-sm text-foreground">Pesan</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="Ceritakan singkat tentang proyek atau pertanyaan Anda…"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-60 transition-smooth"
            >
              {loading ? "Mengirim…" : "Kirim Pesan"}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
      />
    </div>
  );
}
