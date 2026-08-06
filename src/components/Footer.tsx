import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='bg-[var(--accent)]'>
      <div className='mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 text-center text-sm text-zinc-300 sm:flex-row sm:justify-between sm:text-left lg:px-8'>
        <div className='text-zinc-100'>
          <p>ТОВ «Укркрафт»</p>
          <p>м. Бердичів</p>
          <p>+38 063 223 83 32</p>
        </div>
        <p className='font-medium text-zinc-100'>18+</p>
        <div className='flex items-center gap-3'>
          <a
            href='https://www.instagram.com/ukr_craft_'
            aria-label='Instagram'
            title='Instagram'
            className='flex h-9 w-9 items-center justify-center rounded-full border border-zinc-100/30 transition hover:border-white'
          >
            <Image
              src='/images/social/instagram.png'
              alt=''
              width={20}
              height={20}
              className='h-5 w-5 object-contain brightness-0 invert'
            />
          </a>
          <a
            href='#'
            aria-label='Viber'
            title='Viber'
            className='flex h-9 w-9 items-center justify-center rounded-full border border-zinc-100/30 transition hover:border-white'
          >
            <Image
              src='/images/social/viber.png'
              alt=''
              width={20}
              height={20}
              className='h-5 w-5 object-contain brightness-0 invert'
            />
          </a>
          <a
            href='#'
            aria-label='Telegram'
            title='Telegram'
            className='flex h-9 w-9 items-center justify-center rounded-full border border-zinc-100/30 transition hover:border-white'
          >
            <Image
              src='/images/social/telegram.png'
              alt=''
              width={20}
              height={20}
              className='h-5 w-5 object-contain brightness-0 invert'
            />
          </a>
        </div>
        <div className='space-y-1'>
          <p>
            <a href='/privacy' className='underline hover:text-white'>
              Політика конфіденційності
            </a>
          </p>
          <p>
            <a href='/terms' className='underline hover:text-white'>
              Умови замовлення
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
