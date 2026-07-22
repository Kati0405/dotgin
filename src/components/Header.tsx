import Image from "next/image";
import logo from "../../public/logo_ukrcraft_only_cropped.png";

const navLinks = [
  { label: "Про джин", href: "#about" },
  { label: "Коктейлі", href: "#cocktails" },
  { label: "Про нас", href: "#about-us" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-black/[.08] bg-[#fcf8f0]/90 shadow-[0_1px_12px_rgba(0,0,0,0.04)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:px-8">
        <a href="#top" aria-label="На головну" className="shrink-0">
          <Image src={logo} alt=".G" className="h-16 w-auto object-contain" priority />
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-sm font-medium text-[var(--foreground)] sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href="#order"
          className="bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:opacity-95"
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
