'use client';

import { useState, type FormEvent } from 'react';

const PRICE = 466;

export default function OrderForm() {
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const total = PRICE * quantity;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get('name') ?? '').trim(),
      phone: String(form.get('phone') ?? '').trim(),
      city: String(form.get('city') ?? '').trim(),
      branch: String(form.get('branch') ?? '').trim(),
      quantity,
      comment: String(form.get('comment') ?? '').trim(),
      total,
    };

    if (!payload.name || !payload.phone || !payload.city || !payload.branch) {
      setError("Будь ласка, заповніть усі обов'язкові поля.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      setError('Не вдалося надіслати заявку. Спробуйте ще раз.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id='order'
      className='border border-black/10 bg-[var(--background)] px-6 py-10 shadow-sm'
    >
      <h2 className='text-center text-2xl font-semibold tracking-tight'>
        Замовити .G
      </h2>
      <p className='mt-1 text-center text-zinc-600'>466 грн · 0,5 л</p>

      <form onSubmit={handleSubmit} className='mt-8 space-y-4'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <input
            name='name'
            placeholder="Ім'я"
            required
            className='border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]'
          />
          <input
            name='city'
            placeholder='Місто'
            required
            className='border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]'
          />
          <input
            name='phone'
            type='tel'
            placeholder='Телефон'
            required
            className='border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]'
          />
          <input
            name='branch'
            placeholder='Відділення або поштомат Нової пошти'
            required
            className='border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]'
          />
          <div className='flex items-center justify-between border border-black/10 bg-white px-4 py-3 text-sm'>
            <label htmlFor='quantity'>Кількість пляшок</label>
            <select
              id='quantity'
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className='bg-transparent text-right outline-none'
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <input
            name='comment'
            placeholder="Коментар (необов'язково)"
            className='border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--accent)]'
          />
        </div>

        <p className='text-center text-sm text-zinc-600'>
          До підтвердження:{' '}
          <span className='font-semibold text-[var(--foreground)]'>
            {total} грн
          </span>
        </p>
        <p className='text-center text-xs text-zinc-500'>
          Доставка Новою поштою по Україні. Після заявки менеджер
          зв&apos;яжеться для підтвердження замовлення та оплати.
        </p>

        {error && <p className='text-center text-sm text-red-600'>{error}</p>}

        <button
          type='submit'
          disabled={submitting}
          className='w-full bg-[var(--accent)] px-6 py-3 font-medium text-white hover:opacity-90 disabled:opacity-60'
        >
          {submitting ? 'Надсилання…' : 'Надіслати заявку'}
        </button>

        {submitted && (
          <p className='border border-black/10 bg-white px-4 py-3 text-center text-sm text-zinc-600'>
            ✓ Дякуємо! Менеджер зв&apos;яжеться з вами, щоб підтвердити
            замовлення, доставку та оплату.
          </p>
        )}
      </form>
    </section>
  );
}
