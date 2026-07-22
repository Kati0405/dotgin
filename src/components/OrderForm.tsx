'use client';

import { useState, type FormEvent } from 'react';
import { orderSchema } from '@/lib/orderSchema';

const PRICE = 466;

type FieldErrors = Partial<
  Record<'name' | 'surname' | 'phone' | 'city' | 'branch' | 'comment', string>
>;

function Field({
  name,
  label,
  error,
  type = 'text',
  optional = false,
}: {
  name: string;
  label: string;
  error?: string;
  type?: string;
  optional?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className='mb-1.5 block text-xs font-medium tracking-wide text-zinc-500 uppercase'
      >
        {label}
        {optional && (
          <span className='ml-1 normal-case text-zinc-400'>
            (необов&apos;язково)
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`w-full border bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)] ${
          error ? 'border-red-400' : 'border-black/10'
        }`}
      />
      {error && <p className='mt-1.5 text-xs text-red-600'>{error}</p>}
    </div>
  );
}

function TextareaField({
  name,
  label,
  error,
  optional = false,
}: {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className='mb-1.5 block text-xs font-medium tracking-wide text-zinc-500 uppercase'
      >
        {label}
        {optional && (
          <span className='ml-1 normal-case text-zinc-400'>
            (необов&apos;язково)
          </span>
        )}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        className={`w-full resize-none border bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)] ${
          error ? 'border-red-400' : 'border-black/10'
        }`}
      />
      {error && <p className='mt-1.5 text-xs text-red-600'>{error}</p>}
    </div>
  );
}

export default function OrderForm() {
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const total = PRICE * quantity;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const result = orderSchema.safeParse({
      name: form.get('name'),
      surname: form.get('surname'),
      phone: form.get('phone'),
      city: form.get('city'),
      branch: form.get('branch'),
      quantity,
      comment: form.get('comment'),
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        name: errors.name?.[0],
        surname: errors.surname?.[0],
        phone: errors.phone?.[0],
        city: errors.city?.[0],
        branch: errors.branch?.[0],
        comment: errors.comment?.[0],
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      setFormError('Не вдалося надіслати заявку. Спробуйте ще раз.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section
        id='order'
        className='border border-black/10 bg-[var(--background)] px-6 py-16 text-center shadow-sm'
      >
        <div className='mx-auto flex h-14 w-14 items-center justify-center border border-[var(--accent)] text-2xl text-[var(--accent)]'>
          ✓
        </div>
        <h2 className='mt-6 text-2xl font-semibold tracking-tight'>
          Дякуємо за замовлення!
        </h2>
        <p className='mx-auto mt-3 max-w-sm text-zinc-600'>
          Менеджер зв&apos;яжеться з вами найближчим часом, щоб підтвердити
          замовлення, доставку та оплату.
        </p>
      </section>
    );
  }

  return (
    <section
      id='order'
      className='border border-black/10 bg-[var(--background)] px-6 py-10 shadow-sm sm:px-10'
    >
      <h2 className='text-center text-2xl font-semibold tracking-tight'>
        Замовити
      </h2>
      <p className='mt-1 text-center text-zinc-600'>466 грн · 0,5 л</p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className='mx-auto mt-8 max-w-xl space-y-5'
      >
        <div className='grid gap-5 sm:grid-cols-2'>
          <Field name='name' label="Ім'я" error={fieldErrors.name} />
          <Field name='surname' label='Прізвище' error={fieldErrors.surname} />
          <Field name='city' label='Місто' error={fieldErrors.city} />
          <Field
            name='phone'
            label='Телефон'
            type='tel'
            error={fieldErrors.phone}
          />
        </div>

        <div className='grid gap-5 sm:grid-cols-2 sm:items-start'>
          <Field
            name='branch'
            label='Відділення або поштомат Нової пошти'
            error={fieldErrors.branch}
          />

          <div>
            <span className='mb-1.5 block text-xs font-medium tracking-wide text-zinc-500 uppercase'>
              Кількість пляшок
            </span>
            <div className='flex items-center border border-black/10 bg-white'>
              <button
                type='button'
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label='Зменшити кількість'
                className='flex h-12 w-12 shrink-0 items-center justify-center text-lg text-zinc-600 hover:bg-black/5 disabled:opacity-30'
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className='flex-1 text-center text-sm font-medium'>
                {quantity}
              </span>
              <button
                type='button'
                onClick={() => setQuantity((q) => Math.min(6, q + 1))}
                aria-label='Збільшити кількість'
                className='flex h-12 w-12 shrink-0 items-center justify-center text-lg text-zinc-600 hover:bg-black/5 disabled:opacity-30'
                disabled={quantity >= 6}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <TextareaField
          name='comment'
          label='Коментар'
          optional
          error={fieldErrors.comment}
        />

        <div className='flex items-center justify-between border border-black/10 bg-white px-5 py-4'>
          <span className='text-sm text-zinc-600'>До підтвердження</span>
          <span className='text-lg font-semibold tracking-tight'>
            {total} грн
          </span>
        </div>

        <p className='text-center text-xs text-zinc-500'>
          Доставка Новою поштою по Україні. Після заявки менеджер
          зв&apos;яжеться для підтвердження замовлення та оплати.
        </p>

        {formError && (
          <p className='text-center text-sm text-red-600'>{formError}</p>
        )}

        <button
          type='submit'
          disabled={submitting}
          className='w-full bg-[var(--accent)] px-6 py-3.5 font-medium tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60'
        >
          {submitting ? 'Надсилання…' : 'Надіслати заявку'}
        </button>
      </form>
    </section>
  );
}
