const navLinks = [
  { label: "Про джин", href: "#about" },
  { label: "Коктейлі", href: "#cocktails" },
  { label: "Про нас", href: "#about-us" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-black/[.06] bg-[var(--background)]">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-4">
        <span className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
          .G
        </span>

        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-[var(--foreground)] sm:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:opacity-70">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#order"
          className="bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Замовити
        </a>
      </div>

      <nav className="flex items-center justify-center gap-4 overflow-x-auto border-t border-black/[.06] px-4 py-2 text-sm font-medium text-[var(--foreground)] sm:hidden">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="whitespace-nowrap hover:opacity-70">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
