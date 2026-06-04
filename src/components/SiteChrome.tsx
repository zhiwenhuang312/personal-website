import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "Home" },
  { to: "/research", label: "Research" },
  { to: "/activities", label: "Professional Activities" },
  { to: "/photography", label: "Photography" },
] as const;

const navBackgroundSrc = `${import.meta.env.BASE_URL}header/nav-bg.png`;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${navBackgroundSrc})`,
          backgroundPosition: "center 45%",
        }}
      />
      <div className="absolute inset-0 bg-[rgba(12,16,20,0.45)] backdrop-blur-[1px]" />
      <div className="relative mx-auto flex h-32 max-w-6xl items-center justify-center px-6">
        <nav className="flex items-center gap-2 text-base sm:gap-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="px-3 py-2 font-medium text-muted-foreground transition-colors hover:text-foreground sm:px-4"
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
  return null;
}
