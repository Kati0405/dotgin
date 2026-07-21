export default function Header() {
  return (
    <header className='w-full border-b border-black/[.08] dark:border-white/[.145]'>
      <div className='mx-auto flex max-w-3xl items-center justify-between px-6 py-4'>
        <span className='text-lg font-semibold tracking-tight text-black dark:text-zinc-50'>
          .G
        </span>
        <nav className='flex gap-6 text-sm text-zinc-600 dark:text-zinc-400'>
          <a href='#about' className='hover:text-black dark:hover:text-zinc-50'>
            About
          </a>
          <a href='#order' className='hover:text-black dark:hover:text-zinc-50'>
            Order
          </a>
        </nav>
      </div>
    </header>
  );
}
