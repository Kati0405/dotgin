'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { orderSchema } from '@/lib/orderSchema';

const PRICE = 400;
const OLD_PRICE = 450;

type FieldErrors = Partial<
  Record<'name' | 'surname' | 'phone' | 'city' | 'branch' | 'comment', string>
>;

function Field({
  name,
  label,
  error,
  type = 'text',
  placeholder,
}: {
  name: string;
  label: string;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className='mb-2 block text-xs font-medium tracking-wide text-zinc-500 uppercase'
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full border bg-white px-4 py-3.5 text-sm text-[var(--foreground)] shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--accent)] ${
          error ? 'border-red-400' : 'border-black/5'
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
  placeholder,
  optional = false,
}: {
  name: string;
  label: string;
  error?: string;
  placeholder?: string;
  optional?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className='mb-2 block text-xs font-medium tracking-wide text-zinc-500 uppercase'
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
        placeholder={placeholder}
        className={`w-full resize-none border bg-white px-4 py-3.5 text-sm text-[var(--foreground)] shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--accent)] ${
          error ? 'border-red-400' : 'border-black/5'
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
        className='scroll-mt-28 bg-[var(--background-alt)] px-6 py-16 text-center sm:scroll-mt-20'
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
      className='scroll-mt-28 bg-[var(--background-alt)] px-6 py-10 sm:px-10 sm:scroll-mt-20 lg:py-14'
    >
      <h2 className='text-center font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight lg:text-4xl'>
        Замовити
      </h2>

      <div className='mt-4 flex items-center justify-center'>
        <span className='h-px w-20 bg-black/15' />
      </div>

      <div className='mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-4'>
        <div className='relative h-28 w-16 shrink-0'>
          <Image
            src='/bottle_cutout.png'
            alt='.G Genebra'
            fill
            sizes='64px'
            className='object-contain object-bottom'
          />
        </div>

        <div className='text-left'>
          <p className='font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight'>
            .G Genebra
          </p>
          <p className='mt-0.5 text-sm text-zinc-500'>0,5 л · 42%</p>
        </div>

        <span className='hidden h-12 w-px bg-black/10 sm:block' />

        <div className='text-left'>
          <p className='flex items-baseline gap-2'>
            <span className='text-lg font-medium text-zinc-400 line-through'>
              {OLD_PRICE} грн
            </span>
            <span className='font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--accent)]'>
              {PRICE} <span className='text-xl font-semibold'>грн</span>
            </span>
          </p>
          <p className='-mt-1 text-sm text-zinc-500'>за пляшку</p>
        </div>
      </div>

      <p className='mt-4 flex items-center justify-center gap-1.5 text-center text-sm text-zinc-500'>
        <span className='text-[var(--accent)]'>&#10003;</span>
        Малі партії. Чесний продукт.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className='mx-auto mt-10 max-w-xl space-y-6'
      >
        <div className='grid gap-6 sm:grid-cols-2'>
          <Field
            name='name'
            label="Ім'я"
            placeholder='Введіть ваше ім’я'
            error={fieldErrors.name}
          />
          <Field
            name='surname'
            label='Прізвище'
            placeholder='Введіть ваше прізвище'
            error={fieldErrors.surname}
          />
          <Field
            name='city'
            label='Місто'
            placeholder='Введіть місто'
            error={fieldErrors.city}
          />
          <Field
            name='phone'
            label='Телефон'
            type='tel'
            placeholder='+380 XX XXX XX XX'
            error={fieldErrors.phone}
          />
        </div>

        <div className='grid gap-6 sm:grid-cols-2 sm:items-start'>
          <Field
            name='branch'
            label='Відділення або поштомат Нової пошти'
            placeholder='Номер відділення або поштомату'
            error={fieldErrors.branch}
          />

          <div>
            <span className='mb-2 block text-xs font-medium tracking-wide text-zinc-500 uppercase'>
              Кількість пляшок
            </span>
            <div className='flex items-center border border-black/5 bg-white shadow-sm'>
              <button
                type='button'
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label='Зменшити кількість'
                className='flex h-14 w-14 shrink-0 items-center justify-center text-xl text-zinc-600 hover:bg-black/5 disabled:opacity-30'
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className='flex-1 text-center text-base font-medium'>
                {quantity}
              </span>
              <button
                type='button'
                onClick={() => setQuantity((q) => Math.min(6, q + 1))}
                aria-label='Збільшити кількість'
                className='flex h-14 w-14 shrink-0 items-center justify-center text-xl text-zinc-600 hover:bg-black/5 disabled:opacity-30'
                disabled={quantity >= 6}
              >
                +
              </button>
            </div>

            <p className='mt-3 flex items-center gap-1.5 text-sm text-zinc-600'>
              <span className='text-[var(--accent)]'>&#128722;</span>
              Разом:{' '}
              <span className='font-semibold text-[var(--foreground)]'>
                {total} грн
              </span>
            </p>
          </div>
        </div>

        <TextareaField
          name='comment'
          label='Коментар'
          placeholder='Ваш коментар'
          optional
          error={fieldErrors.comment}
        />

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
