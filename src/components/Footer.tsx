export default function Footer() {
  return (
    <footer className="bg-[var(--accent)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-8 text-center text-sm text-zinc-300 sm:flex-row sm:justify-between sm:text-left lg:px-8">
        <div className="text-zinc-100">
          <p>ТОВ «Укркрафт»</p>
          <p>м. Бердичів</p>
          <p>+38 063 223 83 32</p>
        </div>
        <p className="font-medium text-zinc-100">18+</p>
        <div className="space-y-1">
          <p>
            <a href="/privacy" className="underline hover:text-white">
              Політика конфіденційності
            </a>
          </p>
          <p>
            <a href="/terms" className="underline hover:text-white">
              Умови замовлення
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
