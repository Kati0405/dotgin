const facts = [
  {
    title: "Зроблено в Україні",
    description:
      "Ми працюємо в Бердичеві та створюємо локальний продукт із власним характером.",
  },
  {
    title: "Малі партії",
    description:
      "Невеликі тиражі дозволяють зберігати контроль якості та увагу до кожної деталі.",
  },
  {
    title: "Смак, що запам'ятовується",
    description:
      "Сухий, чистий, збалансований, із хвойними, пряними та цитрусовими нотами.",
  },
  {
    title: "Для тих, хто розуміє",
    description:
      "Це напій для людей, які цінують смак, походження й характер.",
  },
];

export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="scroll-mt-28 border border-black/10 bg-[var(--background)] px-6 py-10 shadow-sm sm:scroll-mt-20"
    >
      <div className="text-center">
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          Про нас
        </span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Створюємо характер у кожній краплі
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.title} className="text-center sm:text-left">
            <h3 className="text-base font-semibold tracking-tight">
              {fact.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-600">{fact.description}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 border-t border-black/5 pt-6 text-center text-sm font-medium tracking-tight text-zinc-700">
        .G — більше, ніж напій. Це характер.
      </p>
    </section>
  );
}
