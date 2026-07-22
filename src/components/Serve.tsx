"use client";

import { useState } from "react";
import Image from "next/image";

const cocktails = [
  {
    name: "Джин-тонік",
    description:
      "Лід, сухий тонік, .G і смужка лимонної цедри. Просте поєднання, у якому ялівець і цитрус залишаються на першому плані.",
    ratio: "1 частина .G · 2 частини сухого тоніку",
    image: "/images/cocktails/gin-tonic.webp",
  },
  {
    name: "Негроні",
    description:
      "Рівні частини .G, червоного вермуту і Campari. Гіркий, міцний, з апельсиновою цедрою.",
    ratio: "1 частина .G · 1 частина вермуту · 1 частина Campari",
    image: "/images/cocktails/negroni.webp",
  },
  {
    name: "Дайкірі з джином",
    description:
      "Свіжий лаймовий сік, цукровий сироп і .G. Коротке струшування з льодом до легкої піни.",
    ratio: "2 частини .G · 1 частина лайму · 1 частина сиропу",
    image: "/images/cocktails/daiquiri.webp",
  },
  {
    name: "Френч 75",
    description:
      ".G, лимонний сік і цукровий сироп, до верху шампанським. Легкий і святковий.",
    ratio: "1 частина .G · 0.5 частини лимону · шампанське",
    image: "/images/cocktails/french75.webp",
  },
  {
    name: "Джин Соур",
    description:
      "Лимонний сік, цукровий сироп, .G і крапля яєчного білка для м'якої текстури.",
    ratio: "2 частини .G · 1 частина лимону · 1 частина сиропу",
    image: "/images/cocktails/gin-sour.webp",
  },
];

export default function Serve() {
  const [index, setIndex] = useState(0);
  const cocktail = cocktails[index];

  const goPrev = () =>
    setIndex((i) => (i - 1 + cocktails.length) % cocktails.length);
  const goNext = () => setIndex((i) => (i + 1) % cocktails.length);

  return (
    <section
      id="cocktails"
      className="scroll-mt-28 border border-black/10 bg-[var(--background)] px-6 py-10 shadow-sm sm:scroll-mt-20 sm:px-10 lg:py-14"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Попередній коктейль"
          className="hidden h-10 w-10 shrink-0 items-center justify-center border border-black/10 text-lg hover:bg-black/5 sm:flex"
        >
          ←
        </button>

        <div className="flex flex-1 flex-col items-center gap-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold tracking-tight lg:text-3xl">
              {cocktail.name}
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-zinc-600 sm:mx-0">
              {cocktail.description}
            </p>
            <p className="mt-4 text-sm text-zinc-500">{cocktail.ratio}</p>
          </div>

          <div className="relative h-40 w-40 shrink-0 overflow-hidden border border-black/10 bg-white lg:h-48 lg:w-48">
            <Image
              src={cocktail.image}
              alt={cocktail.name}
              fill
              sizes="(min-width: 1024px) 192px, 160px"
              className="object-cover"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Наступний коктейль"
          className="hidden h-10 w-10 shrink-0 items-center justify-center border border-black/10 text-lg hover:bg-black/5 sm:flex"
        >
          →
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 sm:hidden">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Попередній коктейль"
          className="flex h-10 w-10 items-center justify-center border border-black/10 text-lg hover:bg-black/5"
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Наступний коктейль"
          className="flex h-10 w-10 items-center justify-center border border-black/10 text-lg hover:bg-black/5"
        >
          →
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {cocktails.map((c, i) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Перейти до рецепту: ${c.name}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-[var(--accent)]" : "bg-black/15"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
