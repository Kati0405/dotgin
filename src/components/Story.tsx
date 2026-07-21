const highlights = [
  "Власний пшеничний дистилят",
  "Потрійна дистиляція",
  "Ручна робота",
  "Малі партії",
];

export default function Story() {
  return (
    <section
      id="about"
      className="border border-black/10 bg-[var(--background)] px-6 py-10 shadow-sm"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center border border-black/10 text-2xl">
        🌾
      </div>
      <h2 className="mt-6 text-center text-2xl font-semibold tracking-tight">
        Від зерна до пляшки
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-zinc-600">
        Для .G ми самі виробляємо пшеничний дистилят і проводимо потрійну
        дистиляцію. Кожну партію створюємо вручну, невеликими обсягами, щоб
        контролювати чистоту, аромат і смак на кожному етапі.
      </p>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
        {highlights.map((item, i) => (
          <li key={item} className="flex items-center gap-3">
            <span className="border border-black/10 bg-white px-4 py-2">
              {item}
            </span>
            {i < highlights.length - 1 && (
              <span className="text-zinc-400">·</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
