import { useEffect, useMemo, useState } from "react";
import { chapters, sections } from "./data/catalog";
import { chapterBodies } from "./content";
import { OsContext } from "./os-context";
import type { Os } from "./types";

const STORAGE_OS = "cursor-field-guide-os";
const STORAGE_DONE = "cursor-field-guide-done";

function readHash(): string {
  const raw = window.location.hash.replace(/^#\/?/, "");
  return raw || "start";
}

function setHash(id: string) {
  window.location.hash = `/${id}`;
}

export default function App() {
  const [chapterId, setChapterId] = useState(readHash);
  const [os, setOs] = useState<Os>(() => {
    const saved = window.localStorage.getItem(STORAGE_OS);
    return saved === "win" ? "win" : "mac";
  });
  const [done, setDone] = useState<string[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_DONE);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeHit, setActiveHit] = useState(0);

  const chapter = chapters.find((item) => item.id === chapterId) ?? chapters[0];
  const Body = chapterBodies[chapter.id];
  const index = chapters.findIndex((item) => item.id === chapter.id);
  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;

  useEffect(() => {
    const onHash = () => {
      setChapterId(readHash());
      setNavOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) setHash("start");
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_OS, os);
  }, [os]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_DONE, JSON.stringify(done));
  }, [done]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setNavOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chapters.slice(0, 8);
    return chapters.filter((item) =>
      `${item.title} ${item.blurb} ${item.section}`.toLowerCase().includes(q),
    );
  }, [query]);

  function go(id: string) {
    if (!done.includes(chapter.id) && id !== chapter.id) {
      setDone((current) => [...current, chapter.id]);
    }
    setHash(id);
    setSearchOpen(false);
    setQuery("");
    setActiveHit(0);
  }

  return (
    <OsContext.Provider value={os}>
      <div className={navOpen ? "app sidebar-open" : "app"}>
        <header className="topbar">
          <button
            className="icon-btn mobile-only"
            type="button"
            aria-label="Open chapters"
            onClick={() => setNavOpen((open) => !open)}
          >
            ☰
          </button>
          <a className="brand" href="#/start">
            <span className="brand-mark">Cursor Field Guide</span>
            <span className="brand-sub">October 2026</span>
          </a>
          <div className="top-spacer" />
          <button
            className="search-btn"
            type="button"
            onClick={() => setSearchOpen(true)}
          >
            <span className="label">Search chapters</span>
            <kbd>⌘K</kbd>
          </button>
          <div className="toggle" role="group" aria-label="Shortcut platform">
            <button
              type="button"
              aria-pressed={os === "mac"}
              onClick={() => setOs("mac")}
            >
              Mac
            </button>
            <button
              type="button"
              aria-pressed={os === "win"}
              onClick={() => setOs("win")}
            >
              Win
            </button>
          </div>
        </header>
        <div className="shell">
          <nav className="sidebar" aria-label="Chapters">
            {sections.map((section) => (
              <div className="nav-group" key={section}>
                <h2>{section}</h2>
                {chapters
                  .filter((item) => item.section === section)
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`nav-link${item.id === chapter.id ? " active" : ""}${done.includes(item.id) ? " done" : ""}`}
                      onClick={() => go(item.id)}
                    >
                      <span className="nav-num">{item.number}</span>
                      <span>{item.title}</span>
                    </button>
                  ))}
              </div>
            ))}
          </nav>
          <main className="main">
            <article className="article">
              <p className="kicker">
                {chapter.section} · Chapter {chapter.number}
              </p>
              <h1>{chapter.title}</h1>
              <div className="meta">
                <span>{chapter.minutes} min read</span>
                <span>
                  {index + 1} of {chapters.length}
                </span>
                <span>
                  {done.length} / {chapters.length} visited
                </span>
              </div>
              <Body />
              <div className="pager">
                {prev ? (
                  <button type="button" onClick={() => go(prev.id)}>
                    <span className="dir">Previous</span>
                    {prev.title}
                  </button>
                ) : (
                  <span />
                )}
                {next ? (
                  <button className="next" type="button" onClick={() => go(next.id)}>
                    <span className="dir">Next</span>
                    {next.title}
                  </button>
                ) : (
                  <span />
                )}
              </div>
            </article>
          </main>
        </div>
        {searchOpen ? (
          <div
            className="overlay"
            onClick={() => setSearchOpen(false)}
            role="presentation"
          >
            <div
              className="search-modal"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-label="Search chapters"
            >
              <input
                autoFocus
                placeholder="Search chapters…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveHit(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActiveHit((current) =>
                      Math.min(current + 1, Math.max(hits.length - 1, 0)),
                    );
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActiveHit((current) => Math.max(current - 1, 0));
                  }
                  if (event.key === "Enter" && hits[activeHit]) {
                    go(hits[activeHit].id);
                  }
                }}
              />
              {hits.map((item, hitIndex) => (
                <button
                  key={item.id}
                  type="button"
                  className="search-hit"
                  data-active={hitIndex === activeHit}
                  onClick={() => go(item.id)}
                >
                  {item.number} {item.title}
                  <small>{item.blurb}</small>
                </button>
              ))}
              {hits.length === 0 ? (
                <div className="search-hit">No chapters match.</div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </OsContext.Provider>
  );
}
