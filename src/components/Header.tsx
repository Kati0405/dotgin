import Image from "next/image";
import logo from "../../public/logo_dotg_cropped.png";

const navLinks = [
  { label: "Про джин", href: "#about" },
  { label: "Коктейлі", href: "#cocktails" },
  { label: "Про нас", href: "#about-us" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-black/[.06] bg-[#fcf8f0]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 lg:px-8">
        <a href="#top" aria-label="На головну" className="shrink-0">
          <Image src={logo} alt=".G" className="h-16 w-auto object-contain" priority />
        </a>

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
