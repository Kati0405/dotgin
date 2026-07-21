const profile = [
  { label: "Ялівець", value: 90, note: "Високий" },
  { label: "Цитрус", value: 70, note: "Вище середнього" },
  { label: "Трави й спеції", value: 55, note: "Середній" },
  { label: "Зернова м'якість", value: 50, note: "Середній" },
];

export default function TastingProfile() {
  return (
    <section className="border border-black/10 bg-[var(--background)] px-6 py-10 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight">
        Смаковий профіль
      </h2>
      <p className="mt-3 max-w-md text-zinc-600">
        У .G попереду звучать ялівець і цитрус. Трави й спеції додають
        глибини, а власна зернова основа робить смак м&apos;якшим і більш
        округлим.
      </p>

      <div className="mt-8 space-y-5">
        {profile.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>{item.label}</span>
              <span className="text-zinc-500">{item.note}</span>
            </div>
            <div className="h-2 w-full overflow-hidden bg-black/10">
              <div
                className="h-full bg-[var(--accent)]"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
