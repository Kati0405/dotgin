export default function Serve() {
  return (
    <section
      id="cocktails"
      className="flex flex-col items-center gap-8 border border-black/10 bg-[var(--background)] px-6 py-10 shadow-sm sm:flex-row sm:items-center"
    >
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Найкраще звучить у джин-тоніку
        </h2>
        <p className="mt-3 max-w-sm text-zinc-600">
          Лід, сухий тонік, .G і смужка лимонної цедри. Просте поєднання, у
          якому ялівець і цитрус залишаються на першому плані.
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          1 частина .G · 2 частини сухого тоніку
        </p>
      </div>

      <div className="flex h-40 w-32 shrink-0 items-end justify-center border border-black/10 bg-white">
        <div className="mb-4 h-1 w-16 bg-black/10" />
      </div>
    </section>
  );
}
