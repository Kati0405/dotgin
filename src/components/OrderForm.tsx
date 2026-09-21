'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { orderSchema, orderFieldSchema } from '@/lib/orderSchema';

const PRICE = 400;
const OLD_PRICE = 450;

type FieldErrors = Partial<
  Record<'name' | 'surname' | 'phone' | 'city' | 'branch' | 'comment', string>
>;

type NpCity = { ref: string; name: string; area: string };
type NpWarehouse = { ref: string; name: string };

function Field({
  name,
  label,
  error,
  type = 'text',
  placeholder,
  onValueChange,
}: {
  name: string;
  label: string;
  error?: string;
  type?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className='mb-2 block text-xs font-medium tracking-wide text-zinc-600 uppercase'
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onValueChange?.(e.target.value)}
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
  onValueChange,
}: {
  name: string;
  label: string;
  error?: string;
  placeholder?: string;
  optional?: boolean;
  onValueChange?: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className='mb-2 block text-xs font-medium tracking-wide text-zinc-600 uppercase'
      >
        {label}
        {optional && (
          <span className='ml-1 normal-case text-zinc-600'>
            (необов&apos;язково)
          </span>
        )}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        onChange={(e) => onValueChange?.(e.target.value)}
        className={`w-full resize-none border bg-white px-4 py-3.5 text-sm text-[var(--foreground)] shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--accent)] ${
          error ? 'border-red-400' : 'border-black/5'
        }`}
      />
      {error && <p className='mt-1.5 text-xs text-red-600'>{error}</p>}
    </div>
  );
}

function CityField({
  value,
  onChange,
  error,
}: {
  value: NpCity | null;
  onChange: (city: NpCity | null) => void;
  error?: string;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NpCity[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || query.trim().length < 2) {
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/nova-poshta?type=cities&query=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal },
        );
        const data = await res.json();
        setResults(data.cities ?? []);
      } catch {
        // ignore aborted/failed requests
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query, open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className='relative'>
      <label
        htmlFor='city'
        className='mb-2 block text-xs font-medium tracking-wide text-zinc-600 uppercase'
      >
        Населений пункт
      </label>
      <input
        id='city'
        type='text'
        autoComplete='off'
        placeholder='Почніть вводити назву міста'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (value) onChange(null);
        }}
        onFocus={() => setOpen(true)}
        className={`w-full border bg-white px-4 py-3.5 text-sm text-[var(--foreground)] shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--accent)] ${
          error ? 'border-red-400' : 'border-black/5'
        }`}
      />
      {error && <p className='mt-1.5 text-xs text-red-600'>{error}</p>}

      {open && query.trim().length >= 2 && (
        <div className='absolute z-10 mt-1 max-h-64 w-full overflow-y-auto border border-black/10 bg-white shadow-lg'>
          {loading && <p className='px-4 py-3 text-sm text-zinc-500'>Пошук…</p>}
          {!loading && results.length === 0 && (
            <p className='px-4 py-3 text-sm text-zinc-500'>
              Нічого не знайдено
            </p>
          )}
          {!loading &&
            results.map((city) => (
              <button
                key={city.ref}
                type='button'
                onClick={() => {
                  onChange(city);
                  setQuery(city.name);
                  setOpen(false);
                }}
                className='block w-full px-4 py-2.5 text-left text-sm hover:bg-black/5'
              >
                {city.name} <span className='text-zinc-500'>({city.area})</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

function BranchField({
  cityRef,
  value,
  onChange,
  error,
}: {
  cityRef: string | null;
  value: NpWarehouse | null;
  onChange: (branch: NpWarehouse | null) => void;
  error?: string;
}) {
  const [loadedFor, setLoadedFor] = useState<{
    cityRef: string;
    warehouses: NpWarehouse[];
  } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState(value?.name ?? '');
  const [open, setOpen] = useState(false);
  const [retryToken, setRetryToken] = useState(0);
  const [retrying, setRetrying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const warehouses = loadedFor?.cityRef === cityRef ? loadedFor.warehouses : [];
  const hasError = !!cityRef && loadError === cityRef;
  const loading =
    !!cityRef && loadedFor?.cityRef !== cityRef && !hasError && !retrying;

  useEffect(() => {
    if (!cityRef) return;

    const controller = new AbortController();
    fetch(
      `/api/nova-poshta?type=warehouses&cityRef=${encodeURIComponent(cityRef)}`,
      {
        signal: controller.signal,
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error('request failed');
        return res.json();
      })
      .then((data) => {
        setLoadedFor({ cityRef, warehouses: data.warehouses ?? [] });
        setLoadError(null);
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') setLoadError(cityRef);
      })
      .finally(() => setRetrying(false));

    return () => controller.abort();
  }, [cityRef, retryToken]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? warehouses.filter((w) => w.name.toLowerCase().includes(normalizedQuery))
    : warehouses;

  const placeholder = !cityRef
    ? 'Спочатку оберіть населений пункт'
    : loading
      ? 'Завантаження…'
      : hasError
        ? 'Не вдалося завантажити відділення'
        : 'Почніть вводити номер або адресу відділення';

  return (
    <div ref={containerRef} className='relative'>
      <label
        htmlFor='branch'
        className='mb-2 block text-xs font-medium tracking-wide text-zinc-600 uppercase'
      >
        Відділення або поштомат Нової пошти
      </label>
      <input
        id='branch'
        type='text'
        autoComplete='off'
        disabled={!cityRef || loading}
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (value) onChange(null);
        }}
        onFocus={() => setOpen(true)}
        className={`w-full border bg-white px-4 py-3.5 text-sm text-[var(--foreground)] shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-[var(--accent)] disabled:opacity-50 ${
          error ? 'border-red-400' : 'border-black/5'
        }`}
      />
      {error && <p className='mt-1.5 text-xs text-red-600'>{error}</p>}

      {open && !!cityRef && !loading && (
        <div className='absolute z-10 mt-1 max-h-64 w-full overflow-y-auto border border-black/10 bg-white shadow-lg'>
          {hasError && (
            <div className='flex items-center justify-between gap-2 px-4 py-3 text-sm text-red-600'>
              <span>
                {retrying
                  ? 'Спроба ще раз…'
                  : 'Не вдалося завантажити список відділень.'}
              </span>
              <button
                type='button'
                disabled={retrying}
                onClick={() => {
                  setRetrying(true);
                  setRetryToken((t) => t + 1);
                }}
                aria-label='Спробувати ще раз'
                title='Спробувати ще раз'
                className='shrink-0 rounded p-1 hover:bg-red-50 disabled:opacity-50'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className={`h-3.5 w-3.5 ${retrying ? 'animate-spin' : ''}`}
                >
                  <path d='M21 12a9 9 0 1 1-2.64-6.36' />
                  <path d='M21 4v5h-5' />
                </svg>
              </button>
            </div>
          )}
          {!hasError && filtered.length === 0 && (
            <p className='px-4 py-3 text-sm text-zinc-500'>
              Нічого не знайдено
            </p>
          )}
          {!hasError &&
            filtered.map((w) => (
              <button
                key={w.ref}
                type='button'
                onClick={() => {
                  onChange(w);
                  setQuery(w.name);
                  setOpen(false);
                }}
                className='block w-full px-4 py-2.5 text-left text-sm hover:bg-black/5'
              >
                {w.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default function OrderForm() {
  const [quantity, setQuantity] = useState(1);
  const [city, setCity] = useState<NpCity | null>(null);
  const [branch, setBranch] = useState<NpWarehouse | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const total = PRICE * quantity;

  function clearFieldErrorIfValid(field: keyof FieldErrors, value: string) {
    const schema =
      field === 'city'
        ? orderFieldSchema.cityName
        : field === 'branch'
          ? orderFieldSchema.branchName
          : orderFieldSchema[field];
    if (!schema) return;
    if (schema.safeParse(value).success) {
      setFieldErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const result = orderSchema.safeParse({
      name: form.get('name'),
      surname: form.get('surname'),
      phone: form.get('phone'),
      cityRef: city?.ref ?? '',
      cityName: city?.name ?? '',
      branchRef: branch?.ref ?? '',
      branchName: branch?.name ?? '',
      quantity,
      comment: form.get('comment'),
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        name: errors.name?.[0],
        surname: errors.surname?.[0],
        phone: errors.phone?.[0],
        city: errors.cityRef?.[0] ?? errors.cityName?.[0],
        branch: errors.branchRef?.[0] ?? errors.branchName?.[0],
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
            alt='Джиневер .G'
            fill
            sizes='64px'
            className='object-contain object-bottom'
          />
        </div>

        <div className='text-left'>
          <p className='font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight'>
            Джиневер .G
          </p>
          <p className='mt-0.5 text-sm text-zinc-600'>0,5 л · 42%</p>
        </div>

        <span className='hidden h-12 w-px bg-black/10 sm:block' />

        <div className='text-left'>
          <p className='flex items-baseline gap-2'>
            <span className='text-lg font-medium text-zinc-600 line-through'>
              {OLD_PRICE} грн
            </span>
            <span className='font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--accent)]'>
              {PRICE} <span className='text-xl font-semibold'>грн</span>
            </span>
          </p>
          <p className='-mt-1 text-sm text-zinc-600'>за пляшку</p>
        </div>
      </div>

      <p className='mt-4 flex items-center justify-center gap-1.5 text-center text-sm text-zinc-600'>
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
            onValueChange={(value) => clearFieldErrorIfValid('name', value)}
          />
          <Field
            name='surname'
            label='Прізвище'
            placeholder='Введіть ваше прізвище'
            error={fieldErrors.surname}
            onValueChange={(value) => clearFieldErrorIfValid('surname', value)}
          />
          <CityField
            value={city}
            onChange={(nextCity) => {
              setCity(nextCity);
              setBranch(null);
              clearFieldErrorIfValid('city', nextCity?.name ?? '');
            }}
            error={fieldErrors.city}
          />
          <BranchField
            key={city?.ref ?? 'no-city'}
            cityRef={city?.ref ?? null}
            value={branch}
            onChange={(nextBranch) => {
              setBranch(nextBranch);
              clearFieldErrorIfValid('branch', nextBranch?.name ?? '');
            }}
            error={fieldErrors.branch}
          />
          <Field
            name='phone'
            label='Телефон'
            type='tel'
            placeholder='+380 XX XXX XX XX'
            error={fieldErrors.phone}
            onValueChange={(value) => clearFieldErrorIfValid('phone', value)}
          />
        </div>

        <div>
          <div>
            <span className='mb-2 block text-xs font-medium tracking-wide text-zinc-600 uppercase'>
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
          onValueChange={(value) => clearFieldErrorIfValid('comment', value)}
        />

        <p className='text-center text-xs text-zinc-600'>
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
          {submitting ? 'Надсилання…' : 'Замовити'}
        </button>
      </form>
    </section>
  );
}
