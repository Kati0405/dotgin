'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'age-verified';
const UNDER_AGE_REDIRECT = 'https://cat-bounce.com/';

export default function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem(STORAGE_KEY);
    if (!verified) setVisible(true);
  }, []);

  if (!visible) return null;

  function confirmAdult() {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  }

  function redirectUnderage() {
    window.location.href = UNDER_AGE_REDIRECT;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[var(--foreground)]/90 px-6'>
      <div className='w-full max-w-sm border border-black/10 bg-[var(--background)] px-8 py-10 text-center shadow-sm'>
        <span className='text-2xl font-semibold tracking-tight text-[var(--foreground)]'>
          .G
        </span>
        <h2 className='mt-6 text-xl font-semibold tracking-tight'>
          Вам виповнилося 18 років?
        </h2>
        <p className='mt-3 text-sm text-zinc-600'>
          Цей сайт присвячений алкогольному напою і призначений лише для осіб,
          яким виповнилося 18 років.
        </p>

        <div className='mt-8 flex flex-col gap-3'>
          <button
            type='button'
            onClick={confirmAdult}
            className='w-full bg-[var(--accent)] px-6 py-3 font-medium text-white hover:opacity-90'
          >
            Мені є 18
          </button>
          <button
            type='button'
            onClick={redirectUnderage}
            className='w-full border border-black/10 bg-white px-6 py-3 font-medium text-[var(--foreground)] hover:bg-black/5'
          >
            Мені немає 18
          </button>
        </div>
      </div>
    </div>
  );
}
