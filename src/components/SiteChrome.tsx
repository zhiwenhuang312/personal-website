import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "Home" },
  { to: "/research", label: "Research" },
  { to: "/publications", label: "Publications" },
  { to: "/cv", label: "CV" },
  { to: "/photography", label: "Photography" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-gold font-serif text-lg group-hover:border-gold transition-colors">
            Z
          </span>
          <span className="hidden sm:inline font-serif text-lg text-foreground">
            Zhiwen Huang
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2 text-sm">
          {nav.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="px-2 py-1 sm:px-3 text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted-foreground">
        <div className="font-serif text-base text-foreground">
          Zhiwen (Ivan) Huang
        </div>
        <div className="flex gap-5">
          <a
            href="mailto:zhiwenh@clemson.edu"
            className="hover:text-gold transition-colors"
          >
            Email
          </a>
          <a
            href="https://scholar.google.com/citations?user=Ui_llDYAAAAJ&hl=zh-CN"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gold transition-colors"
          >
            Scholar
          </a>
          <Link to="/cv" className="hover:text-gold transition-colors">
            CV
          </Link>
        </div>
        <div className="text-xs">
          © {new Date().getFullYear()} · Clemson University
        </div>
      </div>
    </footer>
  );
}
