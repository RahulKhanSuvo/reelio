// NOTE: "Reelio" is a placeholder brand name — replace with the real product
// name before launch (and check trademark availability).
const BRAND = "Reelio";

const features = [
  {
    title: "Animated templates",
    body: "Hundreds of hand-crafted layouts with animated text, built for stories and reels.",
  },
  {
    title: "Your photos, instantly",
    body: "Tap a slot, choose from your gallery — the template adapts, crops and animates it.",
  },
  {
    title: "Full-HD export",
    body: "Export crisp 1080×1920 videos and photos, with no watermark, ever.",
  },
  {
    title: "Made to post",
    body: "Optimized for Instagram, TikTok and any other social network you create for.",
  },
];

const steps = [
  { n: "1", title: "Pick a template", body: "Browse the gallery by category and vibe." },
  { n: "2", title: "Add your content", body: "Drop in photos, tweak the words, hit preview." },
  { n: "3", title: "Share it", body: "Export in Full HD and post straight to your story or feed." },
];

function GradientWord({ children }: { children: string }) {
  return (
    <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

// `new Date()` is not allowed during prerender under cacheComponents;
// mark this isolated slice as cacheable so the rest of the page stays static.
async function FooterYear() {
  "use cache";
  return (
    <span>
      © {new Date().getFullYear()} {BRAND}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      {/* Nav */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <span className="text-lg font-black tracking-tight">
          <GradientWord>{BRAND}</GradientWord>
        </span>
        <nav className="hidden gap-6 text-sm text-white/60 sm:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#how" className="transition hover:text-white">
            How it works
          </a>
          <a href="#templates" className="transition hover:text-white">
            Templates
          </a>
        </nav>
        <a
          href="#cta"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/85"
        >
          Get the app
        </a>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-16 pb-20 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
              Stories · Reels · TikTok
            </p>
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              Scroll-stopping stories,
              <br />
              <GradientWord>made in minutes.</GradientWord>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/60">
              Animated templates for creators, small businesses and social
              media managers. Pick a layout, drop in your photos and post
              professional content — no design skills needed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 font-semibold text-black transition hover:opacity-90"
              >
                Start creating
              </a>
              <a
                href="#how"
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Phone preview */}
          <div className="mx-auto w-full max-w-[320px]">
            <div className="relative rounded-[2.5rem] border border-white/15 bg-white/5 p-3 shadow-2xl shadow-accent/20">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#fa709a] to-[#fee140]">
                <div className="absolute inset-x-6 top-24 rounded-3xl bg-black/20 backdrop-blur-sm">
                  <div className="aspect-square w-full rounded-3xl bg-white/25" />
                </div>
                <div className="absolute inset-x-6 bottom-16 text-center">
                  <p className="text-3xl font-black uppercase tracking-tight text-white drop-shadow">
                    New drop
                  </p>
                  <p className="mt-2 text-xs font-medium tracking-[0.3em] uppercase text-white/80">
                    Swipe up
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-white/10 py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to <GradientWord>stand out</GradientWord>
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/25"
                >
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t border-white/10 py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. That&apos;s it.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="rounded-2xl bg-white/[0.03] p-6">
                  <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-2 font-bold text-black">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates strip */}
        <section id="templates" className="border-t border-white/10 py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Templates for <GradientWord>every vibe</GradientWord>
            </h2>
            <p className="mt-3 max-w-xl text-white/60">
              Fashion drops, fitness check-ins, food close-ups, quotes and
              more — new layouts added all the time.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                "from-rose-400 to-orange-300",
                "from-sky-400 to-emerald-300",
                "from-violet-500 to-fuchsia-400",
                "from-amber-300 to-pink-400",
              ].map((g, i) => (
                <div
                  key={g}
                  className={`aspect-[9/16] rounded-2xl bg-gradient-to-b ${g} opacity-80 transition hover:opacity-100`}
                  aria-label={`Template preview ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="border-t border-white/10 py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-4xl font-black tracking-tight">
              Ready to go viral?
            </h2>
            <p className="mt-4 text-white/60">
              Download {BRAND} and publish your first animated story tonight.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <a
                href="#"
                className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/85"
              >
                App Store
              </a>
              <a
                href="#"
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Google Play
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 text-sm text-white/40">
          <FooterYear />
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
