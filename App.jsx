import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, PlayCircle, Film, Clapperboard, BadgeIndianRupee, Mail, ExternalLink, ChevronRight } from "lucide-react";

// ---------- Mock Data (Replace with your real content) ----------
const MOVIES = [
  {
    id: 1,
    title: "Roketo: Rise of a Dream",
    year: 2024,
    rating: 4.5,
    genres: ["Drama", "Biography"],
    summary:
      "A small-town kid builds a rocket startup against all odds. Inspiring and intimate biopic.",
    poster:
      "https://images.unsplash.com/photo-1521649415031-c6ce80353573?q=80&w=1200&auto=format&fit=crop",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    ott: [
      { name: "Prime Video", url: "https://www.primevideo.com/" },
      { name: "BookMyShow Stream", url: "https://www.bookmyshow.com/stream" },
    ],
    affiliate: "https://amzn.to/replace-with-your-tag",
  },
  {
    id: 2,
    title: "City of Shadows",
    year: 2025,
    rating: 4.2,
    genres: ["Thriller", "Mystery"],
    summary:
      "A journalist uncovers a corporate cover‑up—slick pacing, top‑notch background score.",
    poster:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop",
    trailerUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    ott: [
      { name: "Netflix", url: "https://www.netflix.com/" },
      { name: "JustWatch", url: "https://www.justwatch.com/" },
    ],
    affiliate: "https://your-affiliate-link.example/",
  },
  {
    id: 3,
    title: "Mumbai 2.0",
    year: 2023,
    rating: 3.9,
    genres: ["Action", "Crime"],
    summary:
      "A cyber‑heist spirals into a city‑wide chase. Stylish set‑pieces; decent third act.",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    ott: [
      { name: "Disney+ Hotstar", url: "https://www.hotstar.com/" },
    ],
    affiliate: "https://your-affiliate-link.example/",
  },
];

const GENRES = [
  "All",
  ...Array.from(new Set(MOVIES.flatMap((m) => m.genres))).sort(),
];

// ---------- UI Atoms ----------
function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-2xl border px-3 py-1 text-xs font-medium tracking-wide">
      {children}
    </span>
  );
}

function AdSlot({ label = "Ad Slot", height = 120 }) {
  return (
    <div className="w-full rounded-2xl border p-3 shadow-sm">
      <div
        className="flex h-full w-full items-center justify-center rounded-xl bg-gray-50 text-gray-500"
        style={{ height }}
      >
        {label} (Replace with AdSense / Ad Manager tag)
      </div>
    </div>
  );
}

// ---------- Components ----------
function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Clapperboard className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight">CineRadar</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#reviews" className="text-sm font-medium hover:opacity-80">
            Reviews
          </a>
          <a href="#trailers" className="text-sm font-medium hover:opacity-80">
            Trailers
          </a>
          <a href="#deals" className="text-sm font-medium hover:opacity-80">
            Deals
          </a>
          <a href="#newsletter" className="text-sm font-medium hover:opacity-80">
            Newsletter
          </a>
        </nav>
        <a
          href="#advertise"
          className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-semibold shadow-sm hover:shadow"
        >
          <BadgeIndianRupee className="h-4 w-4" /> Monetize
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 md:grid-cols-2 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-black leading-tight md:text-5xl">
            Discover Movies, Watch Trailers, <span className="whitespace-nowrap">& Earn Legally</span>
          </h1>
          <p className="max-w-prose text-sm text-gray-600 md:text-base">
            Build a sustainable film website: publish original reviews & news, embed official trailers, and use
            affiliate links—no piracy, only legit monetization.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge>Reviews</Badge>
            <Badge>OTT Discovery</Badge>
            <Badge>Trailers</Badge>
            <Badge>Affiliate</Badge>
            <Badge>AdSense</Badge>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="rounded-2xl border p-2 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1497015289639-54688650d173?q=80&w=1600&auto=format&fit=crop"
              alt="Cinema"
              className="h-64 w-full rounded-xl object-cover md:h-80"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Reviews() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");

  const filtered = useMemo(() => {
    return MOVIES.filter((m) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || m.title.toLowerCase().includes(q);
      const matchesGenre = genre === "All" || m.genres.includes(genre);
      return matchesQuery && matchesGenre;
    });
  }, [query, genre]);

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-2xl font-bold md:text-3xl">Featured Reviews</h2>
        <div className="flex w-full flex-col items-stretch gap-2 md:w-auto md:flex-row">
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full rounded-2xl border bg-white px-9 py-2 text-sm shadow-sm focus:outline-none"
            />
          </div>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="rounded-2xl border px-3 py-2 text-sm shadow-sm"
          >
            {GENRES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <motion.article
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="group rounded-2xl border shadow-sm"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img src={m.poster} alt={m.title} className="h-56 w-full object-cover transition group-hover:scale-[1.02]" />
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold leading-snug">{m.title}</h3>
                  <p className="text-xs text-gray-500">{m.year} • {m.genres.join(" • ")}</p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold">
                  <Star className="h-3.5 w-3.5" /> {m.rating}
                </div>
              </div>
              <p className="text-sm text-gray-600">{m.summary}</p>
              <div className="flex flex-wrap gap-2">
                {m.ott.map((o) => (
                  <a key={o.name} href={o.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-xs font-medium hover:shadow">
                    <ExternalLink className="h-3.5 w-3.5" /> {o.name}
                  </a>
                ))}
                <a
                  href={m.affiliate}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-xs font-medium hover:shadow"
                >
                  Buy / Rent (Affiliate)
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Trailers() {
  return (
    <section id="trailers" className="mx-auto max-w-7xl px-4 pb-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">Trending Trailers</h2>
        <div className="text-sm text-gray-600">Embed official YouTube trailers only</div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {MOVIES.slice(0, 2).map((m) => (
          <div key={m.id} className="overflow-hidden rounded-2xl border shadow-sm">
            <div className="relative aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={m.trailerUrl}
                title={`${m.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-base font-semibold">{m.title}</h3>
                <p className="text-xs text-gray-500">Official Trailer</p>
              </div>
              <a
                href={m.affiliate}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-xs font-semibold hover:shadow"
              >
                Watch / Rent <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Deals() {
  return (
    <section id="deals" className="mx-auto max-w-7xl px-4 pb-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">Deals & Offers</h2>
        <div className="text-sm text-gray-600">Add affiliate links here</div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <a
          href="https://in.bookmyshow.com/"
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl border p-5 shadow-sm hover:shadow"
        >
          <div className="mb-3 flex items-center gap-2">
            <Film className="h-5 w-5" />
            <h3 className="text-base font-semibold">Movie Tickets Cashback</h3>
          </div>
          <p className="text-sm text-gray-600">
            Promote BookMyShow offers via affiliate networks. Update your tracking parameters.
          </p>
        </a>
        <a
          href="https://www.amazon.in/Prime-Video/b?node=11909746031"
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl border p-5 shadow-sm hover:shadow"
        >
          <div className="mb-3 flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            <h3 className="text-base font-semibold">Prime Video Channels</h3>
          </div>
          <p className="text-sm text-gray-600">Link to free trials, bundles, and rentals using your affiliate tag.</p>
        </a>
        <a
          href="https://www.justwatch.com/"
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl border p-5 shadow-sm hover:shadow"
        >
          <div className="mb-3 flex items-center gap-2">
            <Clapperboard className="h-5 w-5" />
            <h3 className="text-base font-semibold">Where to Watch</h3>
          </div>
          <p className="text-sm text-gray-600">Help users find legal streaming options & monetize with partnerships.</p>
        </a>
      </div>
      <div className="mt-6">
        <AdSlot label="Ad Slot – 970×250" height={180} />
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section id="newsletter" className="mx-auto max-w-7xl px-4 pb-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold md:text-3xl">Join CineRadar Weekly</h2>
          <p className="mt-2 max-w-prose text-sm text-gray-600">
            Get hand‑picked movie recommendations, OTT arrivals, and box‑office highlights. No spam.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Connect this form to your email tool (e.g., Beehiiv, Mailchimp).");
            }}
            className="mt-4 flex flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-2xl border px-4 py-3 text-sm shadow-sm focus:outline-none sm:w-96"
            />
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95">
              <Mail className="h-4 w-4" /> Subscribe
            </button>
          </form>
        </div>
        <div className="md:col-span-2">
          <AdSlot label="Sidebar Ad – 300×250" height={250} />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clapperboard className="h-6 w-6" />
            <span className="text-base font-bold">CineRadar</span>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} CineRadar Media. All rights reserved. We only link to official sources.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Site</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#reviews" className="hover:underline">Reviews</a></li>
            <li><a href="#trailers" className="hover:underline">Trailers</a></li>
            <li><a href="#deals" className="hover:underline">Deals</a></li>
            <li><a href="#newsletter" className="hover:underline">Newsletter</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Monetize</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Google AdSense / Ad Manager</li>
            <li>Affiliate: Amazon, BookMyShow, JustWatch</li>
            <li>Sponsorships & Paid Reviews</li>
          </ul>
        </div>
        <div id="advertise">
          <h4 className="mb-3 text-sm font-semibold">Advertise</h4>
          <p className="mb-3 text-sm text-gray-600">For ads & partnerships:</p>
          <a
            href="mailto:ads@yourdomain.com"
            className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-semibold hover:shadow"
          >
            ads@yourdomain.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <Hero />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-10">
          <AdSlot label="Leaderboard – 728×90" height={100} />
        </section>
        <Reviews />
        <Trailers />
        <Deals />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
