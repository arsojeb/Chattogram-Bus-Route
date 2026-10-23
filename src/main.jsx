import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BusFront,
  Search,
  Route,
  Layers,
  Info,
  ArrowUpRight,
  Navigation,
  Menu,
  X,
  ShieldAlert,
  Sparkles,
  Pause,
  Play,
  LocateFixed,
} from "lucide-react";
import "./styles.css";
import "./line-view.css";

const routes = [
  {
    id: "1-mini",
    number: "১",
    type: "ছোট / মিনি বাস",
    name: "১ নং বাস · মিনি",
    stops: [
      "নিউ মার্কেট",
      "লালদীঘি",
      "আন্দরকিল্লা",
      "চন্দনপুরা",
      "চকবাজার",
      "বাদুড়তলা",
      "বহদ্দারহাট",
      "পুরাতন চান্দগাঁও",
      "সি অ্যান্ড বি",
      "কাপ্তাই রাস্তার মাথা",
      "কালুরঘাট",
    ],
  },
  {
    id: "1-large",
    number: "১",
    type: "বড় বাস",
    name: "১ নং বাস · বড়",
    stops: [
      "নিউ মার্কেট",
      "লালদীঘি",
      "আন্দরকিল্লা",
      "চন্দনপুরা",
      "চকবাজার",
      "বাদুড়তলা",
      "বহদ্দারহাট",
    ],
  },
  {
    id: "2-large",
    number: "২",
    type: "বড় বাস",
    name: "২ নং বাস · বড়",
    stops: [
      "নিউ মার্কেট",
      "লালদীঘি",
      "আন্দরকিল্লা",
      "গণি বেকারী",
      "চকবাজার",
      "প্রবর্তক",
      "২ নং গেট",
      "ষোলশহর",
      "মুরাদপুর",
      "বহদ্দারহাট",
      "কালুরঘাট",
    ],
  },
  {
    id: "2-mini",
    number: "২",
    type: "ছোট / মিনি বাস",
    name: "২ নং বাস · মিনি",
    stops: [
      "নিউ মার্কেট",
      "রেলওয়ে স্টেশন",
      "কদমতলী",
      "টাইগারপাস",
      "লালখান বাজার",
      "ওয়াসা",
      "মাজার গেইট / দামপাড়া",
      "জি ই সি",
      "২ নং গেট",
      "ষোলশহর",
      "মুরাদপুর",
      "বহদ্দারহাট",
      "কাপ্তাই রাস্তার মাথা",
      "কালুরঘাট",
    ],
  },
  {
    id: "3-large",
    number: "৩",
    type: "বড় বাস",
    name: "৩ নং বাস",
    stops: [
      "নিউ মার্কেট",
      "কাজীর দেউরী",
      "গোলপাহাড়",
      "প্রবর্তক",
      "২ নং গেট",
      "ষোলশহর",
      "মুরাদপুর",
      "বিবিরহাট",
      "অক্সিজেন",
      "চট্টগ্রাম বিশ্ববিদ্যালয়",
    ],
  },
  {
    id: "3-ranger",
    number: "৩",
    type: "রেইঞ্জার",
    name: "৩ নং রেইঞ্জার",
    stops: [
      "নিউ মার্কেট",
      "কাজীর দেউরী",
      "গোলপাহাড়",
      "প্রবর্তক",
      "মির্জারপুল",
      "ফতেয়াবাদ",
    ],
  },
  {
    id: "4-large",
    number: "৪",
    type: "বড় বাস",
    name: "৪ নং বাস · বড়",
    stops: [
      "নিউ মার্কেট",
      "টাইগারপাস",
      "লালখান বাজার",
      "দামপাড়া / জি ই সি",
      "ঝাউতলা",
      "এ কে খান",
      "ভাটিয়ারী",
    ],
  },
  {
    id: "4-ranger",
    number: "৪",
    type: "রেইঞ্জার",
    name: "৪ নং রেইঞ্জার",
    stops: [
      "নিউ মার্কেট",
      "টাইগারপাস",
      "লালখান বাজার",
      "দামপাড়া / জি ই সি",
      "২ নং গেট",
      "ষোলশহর",
      "মুরাদপুর",
      "বহদ্দারহাট",
      "নতুন ব্রিজ",
    ],
  },
  {
    id: "5",
    number: "৫",
    type: "বাস",
    name: "৫ নং বাস",
    stops: [
      "লালদীঘি",
      "নিউ মার্কেট",
      "টাইগারপাস",
      "দেওয়ানহাট",
      "আগ্রাবাদ",
      "বারেক বিল্ডিং",
      "সল্টগোলা",
      "ইপিজেড",
      "বন্দরটিলা",
      "সিমেন্ট ক্রসিং",
      "মেরিন একাডেমী",
      "বিমানবন্দর",
    ],
  },
  {
    id: "metro-provaty",
    number: "মেট্রো",
    type: "বিশেষ সার্ভিস",
    name: "মেট্রো প্রভাতী",
    stops: [
      "পতেঙ্গা বিচ",
      "কর্ণফুলী ইপিজেড",
      "সিমেন্ট ক্রসিং",
      "বন্দর টিলা",
      "চট্টগ্রাম ইপিজেড",
      "প্রি-পোর্ট",
      "সল্টগোলা ক্রসিং",
      "কাস্টম হাউস, চট্টগ্রাম",
      "বারিক বিল্ডিং",
      "গোসাইল ডাঙ্গা",
      "আগ্রাবাদ",
      "দেওয়ানহাট",
      "টাইগারপাস",
      "লালখান",
      "জি ই সি",
      "দুই নাম্বার",
      "ষোলশহর",
      "মুরাদপুর",
      "বহদ্দারহাট",
      "কাপ্তাই রাস্তার মাথা",
    ],
  },
  {
    id: "6-large",
    number: "৬",
    type: "বড় বাস",
    name: "৬ নং বাস · বড়",
    stops: [
      "লালদীঘি",
      "নিউ মার্কেট",
      "টাইগারপাস",
      "দেওয়ানহাট",
      "আগ্রাবাদ",
      "বারেক বিল্ডিং",
      "সল্টগোলা",
      "ইপিজেড",
      "বন্দরটিলা",
      "সিমেন্ট ক্রসিং",
      "কাঠগড়",
      "সি বিচ",
    ],
  },
  {
    id: "6-mini",
    number: "৬",
    type: "ছোট / মিনি বাস",
    name: "৬ নং বাস · মিনি",
    stops: [
      "লালদীঘি",
      "নিউ মার্কেট",
      "মুরাদপুর",
      "বহদ্দারহাট",
      "টার্মিনাল",
      "সি অ্যান্ড বি",
      "কাপ্তাই রাস্তার মাথা",
      "কুয়াইস",
      "মদুনা ঘাট",
    ],
  },
  {
    id: "7-large",
    number: "৭",
    type: "বড় বাস",
    name: "৭ নং বাস · বড়",
    stops: [
      "লালদীঘি",
      "নিউ মার্কেট",
      "দেওয়ানহাট",
      "বাদামতলী মোড় (আগ্রাবাদ)",
      "বড়পুল",
      "অলংকার",
      "ভাটিয়ারী",
    ],
  },
  {
    id: "7-mini",
    number: "৭",
    type: "ছোট / মিনি বাস",
    name: "৭ নং বাস · মিনি",
    stops: [
      "নিউ মার্কেট",
      "রেলওয়ে স্টেশন",
      "কদমতলী",
      "টাইগারপাস",
      "লালখান",
      "ওয়াসা",
      "মাজার গেইট / দামপাড়া",
      "জি ই সি",
      "এ কে খান",
      "ভাটিয়ারী",
      "কুমিরা",
    ],
  },
  {
    id: "8",
    number: "৮",
    type: "বাস",
    name: "৮ নং বাস",
    stops: [
      "লালদীঘি",
      "নিউ মার্কেট",
      "টাইগারপাস",
      "লালখান বাজার",
      "জি ই সি",
      "২ নং গেট",
      "বায়েজিদ বোস্তামী",
      "অক্সিজেন",
    ],
  },
  {
    id: "10-large",
    number: "১০",
    type: "বড় বাস",
    name: "১০ নং বাস · বড়",
    stops: [
      "নতুন ব্রিজ",
      "বহদ্দারহাট",
      "মুরাদপুর",
      "ষোলশহর",
      "২ নং গেট",
      "জি ই সি",
      "দামপাড়া",
      "লালখান বাজার",
      "টাইগারপাস",
      "দেওয়ানহাট",
      "আগ্রাবাদ",
      "বারেক বিল্ডিং",
      "সল্টগোলা",
      "ইপিজেড",
      "বন্দরটিলা",
      "সিমেন্ট ক্রসিং",
      "কাঠগড়",
    ],
  },
  {
    id: "10-mini",
    number: "১০",
    type: "ছোট / মিনি বাস",
    name: "১০ নং বাস · মিনি",
    stops: [
      "কাপ্তাই রাস্তার মাথা",
      "সি অ্যান্ড বি",
      "বহদ্দারহাট",
      "মুরাদপুর",
      "ষোলশহর",
      "২ নং গেট",
      "জি ই সি",
      "দামপাড়া",
      "লালখান বাজার",
      "টাইগারপাস",
      "দেওয়ানহাট",
      "আগ্রাবাদ",
      "বারেক বিল্ডিং",
      "সল্টগোলা",
      "ইপিজেড",
      "বন্দরটিলা",
      "সিমেন্ট ক্রসিং",
      "কাঠগড়",
    ],
  },
  {
    id: "10a",
    number: "১০/এ",
    type: "বাস",
    name: "১০/এ নং বাস",
    stops: [
      "কালুরঘাট",
      "বহদ্দারহাট",
      "মুরাদপুর",
      "২ নং গেট",
      "জি ই সি",
      "লালখান বাজার",
      "টাইগারপাস",
      "দেওয়ানহাট",
      "আগ্রাবাদ",
      "বারেক বিল্ডিং",
      "সল্টগোলা",
      "ইপিজেড",
      "বন্দরটিলা",
      "সিমেন্ট ক্রসিং",
      "কাঠগড়",
    ],
  },
  {
    id: "ac",
    number: "AC",
    type: "এসি বাস",
    name: "এসি বাস",
    stops: [
      "পতেঙ্গা বিচ",
      "কর্ণফুলী ইপিজেড",
      "সিমেন্ট ক্রসিং",
      "বন্দর টিলা",
      "চট্টগ্রাম ইপিজেড",
      "প্রি-পোর্ট",
      "সল্টগোলা ক্রসিং",
      "কাস্টম হাউস, চট্টগ্রাম",
      "বারিক বিল্ডিং",
      "গোসাইল ডাঙ্গা",
      "আগ্রাবাদ",
      "দেওয়ানহাট",
      "টাইগারপাস",
      "লালখান",
      "জি ই সি",
      "দুই নাম্বার",
      "ষোলশহর",
      "মুরাদপুর",
      "বহদ্দারহাট",
      "কাপ্তাই রাস্তার মাথা",
    ],
  },
];

const palette = [
  "#9ae65a",
  "#60a5fa",
  "#fb923c",
  "#e879f9",
  "#2dd4bf",
  "#f472b6",
  "#facc15",
];

function App() {
  const [selectedId, setSelectedId] = useState("1-mini");
  const [view, setView] = useState("line");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("সব");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animatedStopIndex, setAnimatedStopIndex] = useState(0);
  const selected = routes.find((r) => r.id === selectedId) || routes[0];
  const filtered = useMemo(
    () =>
      routes.filter((r) => {
        const matchesQuery =
          `${r.name} ${r.number} ${r.type} ${r.stops.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase());
        return matchesQuery && (filter === "সব" || r.type.includes(filter));
      }),
    [query, filter],
  );
  const stops = selected.stops;
  const n = stops.length;
  const last = n - 1;
  const routeColor =
    palette[routes.findIndex((r) => r.id === selected.id) % palette.length];
  const pct = (i) => `${(i / last) * 100}%`;

  useEffect(() => {
    setAnimatedStopIndex(0);
  }, [selectedId]);

  useEffect(() => {
    if (!isAnimating || n < 2) return;
    const timer = window.setInterval(() => {
      setAnimatedStopIndex((index) => (index + 1) % n);
    }, 1350);
    return () => window.clearInterval(timer);
  }, [isAnimating, selectedId, n]);

  function selectRoute(route) {
    setSelectedId(route.id);
    setMobileMenu(false);
    if (window.innerWidth <= 900) {
      document
        .querySelector(".route-workspace")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="CTG Bus Route home">
          <span className="brand-mark">
            <BusFront size={22} />
          </span>
          <span>
            <strong>
              CTG<span className="brand-accent">.</span>ROUTE
            </strong>
            <small>CHATTOGRAM TRANSIT GUIDE</small>
          </span>
        </a>
        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          <a className="nav-active" href="#explore">
            রুট এক্সপ্লোরার
          </a>
          <a href="#how">কীভাবে ব্যবহার করবেন</a>
          <a href="#about">তথ্য ও নির্ভুলতা</a>
        </nav>
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
        <div className="top-pill">
          <span className="status-dot" /> ROUTE DIRECTORY
        </div>
      </header>

      <main>
        <section className="hero" id="explore">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={14} /> CHITTAGONG, CONNECTED
            </div>
            <h1>
              শহর চিনুন।
              <br />
              <span>রুট বুঝুন।</span>
            </h1>
            <p>
              চট্টগ্রামের বাস রুট দেখুন নিজের মতো করে — সরল লাইন ভিউতে অথবা
              অ্যানিমেটেড রুট ডায়াগ্রামে।
            </p>
            <div className="hero-stats">
              <div>
                <strong>{routes.length.toLocaleString("bn-BD")}</strong>
                <span>রুট তালিকায়</span>
              </div>
              <div className="stat-divider" />
              <div>
                <strong>২</strong>
                <span>দেখার ধরন</span>
              </div>
              <div className="stat-divider" />
              <div>
                <strong>০</strong>
                <span>লাইভ ট্র্যাকিং দাবি</span>
              </div>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="route-chip chip-one">
              <span className="chip-line" /> নিউ মার্কেট
            </div>
            <div className="route-chip chip-two">
              <span className="chip-line blue" /> বহদ্দারহাট
            </div>
            <div className="hero-bus">
              <BusFront size={70} strokeWidth={1.25} />
            </div>
            <div className="hero-art-caption">
              <span className="pulse-dot" /> YOUR CITY, YOUR ROUTE
            </div>
          </div>
        </section>

        <section className="explorer-layout">
          <aside className="route-sidebar">
            <div className="sidebar-heading">
              <div>
                <span className="section-kicker">ROUTE DIRECTORY</span>
                <h2>বাস রুট খুঁজুন</h2>
              </div>
              <span className="count-badge">
                {filtered.length.toLocaleString("bn-BD")}
              </span>
            </div>
            <label className="search-box">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="বাস নম্বর বা এলাকার নাম..."
              />
              <kbd>⌕</kbd>
            </label>
            <div className="filter-row">
              {["সব", "বড় বাস", "মিনি", "রেইঞ্জার", "এসি"].map((f) => (
                <button
                  key={f}
                  className={filter === f ? "filter active" : "filter"}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="route-list">
              {filtered.map((r) => (
                <button
                  key={r.id}
                  onClick={() => selectRoute(r)}
                  className={
                    selectedId === r.id ? "route-item selected" : "route-item"
                  }
                >
                  <span className="route-number">{r.number}</span>
                  <span className="route-item-copy">
                    <strong>{r.name}</strong>
                    <small>
                      {r.stops[0]} <span>→</span> {r.stops[r.stops.length - 1]}
                    </small>
                    <em>{r.type}</em>
                  </span>
                  <ArrowUpRight size={17} className="route-arrow" />
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="empty-state">
                  কোনো রুট পাওয়া যায়নি। অন্য নামে খুঁজুন।
                </div>
              )}
            </div>
            <div className="sidebar-note">
              <Info size={16} />
              <span>
                রুটের নাম ও স্টপগুলো আপনার দেওয়া তালিকা থেকে নেওয়া। স্টপের
                ক্রম এখনো যাচাই করা হয়নি।
              </span>
            </div>
          </aside>

          <section className="route-workspace">
            <div className="workspace-top">
              <div className="selected-route-title">
                <div className="selected-icon">
                  <BusFront size={23} />
                </div>
                <div>
                  <span className="section-kicker">SELECTED BUS ROUTE</span>
                  <h2>{selected.name}</h2>
                  <p>
                    {selected.type} <span className="middle-dot">•</span> {n}টি
                    তালিকাভুক্ত লোকেশন
                  </p>
                </div>
              </div>
              <div
                className="view-switch"
                role="tablist"
                aria-label="Route display mode"
              >
                <button
                  role="tab"
                  aria-selected={view === "line"}
                  className={
                    view === "line" ? "view-button active" : "view-button"
                  }
                  onClick={() => setView("line")}
                >
                  <Navigation size={16} /> লাইন ভিউ
                </button>
                <button
                  role="tab"
                  aria-selected={view === "diagram"}
                  className={
                    view === "diagram" ? "view-button active" : "view-button"
                  }
                  onClick={() => setView("diagram")}
                >
                  <Route size={16} /> অ্যানিমেটেড ডায়াগ্রাম
                </button>
              </div>
            </div>

            <div className="verification-banner">
              <ShieldAlert size={18} />
              <div>
                <strong>প্রিভিউ রুট — যাচাই করা নয়</strong>
                <span>
                  স্টপের ক্রম আপনার দেওয়া তালিকা থেকে নেওয়া। এটিকে বাসের
                  নিশ্চিত চলাচলের তথ্য হিসেবে ধরবেন না।
                </span>
              </div>
            </div>

            {view === "line" ? (
              <div
                className="line-panel"
                style={{ "--route-color": routeColor, "--n": n }}
              >
                <div className="line-head">
                  <div>
                    <span className="section-kicker">STRAIGHT LINE VIEW</span>
                    <h3>P1 থেকে P2</h3>
                  </div>
                  <button
                    className="line-play"
                    onClick={() => setIsAnimating(!isAnimating)}
                  >
                    {isAnimating ? <Pause size={13} /> : <Play size={13} />}{" "}
                    {isAnimating ? "থামান" : "চালান"}
                  </button>
                </div>
                <div className="line-scroll">
                  <div className="line-track">
                    <div className="line-inner">
                      {n > 2 && (
                        <div
                          className="line-bracket"
                          style={{
                            left: `${(0.65 / last) * 100}%`,
                            width: `${((n - 3 + 0.7) / last) * 100}%`,
                          }}
                        >
                          <svg
                            viewBox="0 0 100 60"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <path d="M0 58 Q 50 -22 100 58" />
                          </svg>
                          <span className="line-bracket-label">
                            অন্যান্য স্টপ{" "}
                            <b>({(n - 2).toLocaleString("bn-BD")})</b>
                          </span>
                        </div>
                      )}
                      <div className="line-rail">
                        <span
                          className="line-progress"
                          style={{ width: pct(animatedStopIndex) }}
                        />
                      </div>
                      {stops.map((s, i) => {
                        const isEnd = i === 0 || i === last;
                        const cls = [
                          "line-stop",
                          isEnd ? "end" : "",
                          i <= animatedStopIndex ? "passed" : "",
                          i === animatedStopIndex ? "active" : "",
                        ].join(" ");
                        return (
                          <div
                            key={`${selected.id}-line-${i}`}
                            className={cls}
                            style={{ left: pct(i) }}
                          >
                            <span className="line-name">{s}</span>
                            <span className="line-dot" title={s} />
                            {isEnd && (
                              <div
                                className="line-end-label"
                                style={{ top: "34px" }}
                              >
                                <strong>{i === 0 ? "P1" : "P2"}</strong>
                                <span>{s}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      <div
                        className="line-bus"
                        style={{ left: pct(animatedStopIndex) }}
                      >
                        <BusFront size={18} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="line-chips">
                  {stops.map((s, i) => (
                    <span
                      key={`${selected.id}-chip-${i}`}
                      className={
                        i === animatedStopIndex
                          ? "line-chip active"
                          : "line-chip"
                      }
                    >
                      <em>{String(i + 1).padStart(2, "0")}</em>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="diagram-panel">
                <div className="diagram-head">
                  <div>
                    <span className="section-kicker">SIMPLIFIED VIEW</span>
                    <h3>রুটের ধারাবাহিকতা</h3>
                  </div>
                  <span className="diagram-badge">
                    <Sparkles size={13} /> Animated
                  </span>
                </div>
                <p className="diagram-intro">
                  এটি রাস্তার মানচিত্র নয়। লোকেশনগুলোর ক্রম সহজে বোঝার জন্য
                  একটি সরল ডায়াগ্রাম।
                </p>
                <div className="diagram-scroll">
                  <div
                    className="diagram-track"
                    style={{ "--route-color": routeColor }}
                  >
                    <div className="diagram-line">
                      <span />
                    </div>
                    {stops.map((stop, i) => (
                      <div
                        className="diagram-stop"
                        key={`${selected.id}-diagram-${i}`}
                        style={{ "--delay": `${i * 90}ms` }}
                      >
                        <span
                          className={`diagram-node ${i === 0 ? "start" : i === last ? "end" : ""}`}
                        >
                          <span />
                        </span>
                        <div className="diagram-stop-label">
                          <small>{String(i + 1).padStart(2, "0")}</small>
                          <strong>{stop}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="diagram-footer">
                  <span>
                    <i
                      className="legend-dot"
                      style={{ background: routeColor }}
                    />{" "}
                    {n}টি লোকেশন
                  </span>
                  <span className="current-stop">
                    <LocateFixed size={13} /> অ্যানিমেশন:{" "}
                    {stops[animatedStopIndex % n]}
                  </span>
                  <button
                    className="diagram-play-button"
                    onClick={() => setIsAnimating(!isAnimating)}
                  >
                    {isAnimating ? <Pause size={13} /> : <Play size={13} />}{" "}
                    {isAnimating ? "থামান" : "চালান"}
                  </button>
                  <span>ক্রমটি আপনার দেওয়া তালিকা অনুসারে</span>
                </div>
              </div>
            )}

            <div className="route-details">
              <div className="detail-card">
                <span className="detail-icon">
                  <Navigation size={18} />
                </span>
                <div>
                  <small>রুটের ধরন</small>
                  <strong>{selected.type}</strong>
                </div>
              </div>
              <div className="detail-card">
                <span className="detail-icon">
                  <Layers size={18} />
                </span>
                <div>
                  <small>লোকেশন সংখ্যা</small>
                  <strong>{n}টি</strong>
                </div>
              </div>
              <div className="detail-card">
                <span className="detail-icon">
                  <ShieldAlert size={18} />
                </span>
                <div>
                  <small>যাচাই অবস্থা</small>
                  <strong className="unverified-text">যাচাই বাকি</strong>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className="how-section" id="how">
          <div className="section-kicker">HOW IT WORKS</div>
          <h2>রুট দেখার দুটি উপায়</h2>
          <div className="how-grid">
            <article>
              <div className="how-icon">
                <Navigation />
              </div>
              <h3>সরল লাইন ভিউ</h3>
              <p>
                শুরুর স্টপ P1 থেকে শেষ স্টপ P2 পর্যন্ত একটি সোজা লাইনে সব স্টপ
                দেখা যায়। মাঝের স্টপগুলো “অন্যান্য স্টপ” হিসেবে দেখানো হয়।
              </p>
            </article>
            <article>
              <div className="how-icon">
                <Route />
              </div>
              <h3>অ্যানিমেটেড ডায়াগ্রাম</h3>
              <p>
                প্রতিটি লোকেশন ধারাবাহিকভাবে দেখা যায়। ছোট স্ক্রিনেও পুরো রুট
                স্ক্রল করে বোঝা সহজ।
              </p>
            </article>
            <article>
              <div className="how-icon">
                <Search />
              </div>
              <h3>সার্চ ও ফিল্টার</h3>
              <p>
                বাস নম্বর, সার্ভিসের ধরন বা তালিকাভুক্ত এলাকার নাম দিয়ে রুট
                খুঁজে নিন।
              </p>
            </article>
          </div>
        </section>
        <section className="accuracy-section" id="about">
          <ShieldAlert size={22} />
          <div>
            <h3>রুটের নির্ভুলতা সম্পর্কে</h3>
            <p>
              এই প্রোটোটাইপে আপনার দেওয়া রুট-স্টপের তালিকা ব্যবহার করা হয়েছে।
              এটি রাস্তার মানচিত্র নয়, শুধু স্টপের ক্রম দেখানো হয়। প্রকাশের
              আগে প্রতিটি রুট স্থানীয়ভাবে যাচাই করতে হবে। কোনো লাইভ বাস অবস্থান
              বা সময়সূচি দেখানো হচ্ছে না।
            </p>
          </div>
        </section>
      </main>
      <footer>
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">
            <BusFront size={19} />
          </span>
          <span>
            <strong>
              CTG<span className="brand-accent">.</span>ROUTE
            </strong>
            <small>BUILT FOR CHATTOGRAM</small>
          </span>
        </a>
        <span>Community route directory · তথ্য যাচাই চলমান</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
