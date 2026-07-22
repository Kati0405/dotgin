import Image from 'next/image';

const ingredients = [
  { label: 'Ялівець', image: '/images/ingredients/juniper.png' },
  { label: 'Цитрус', image: '/images/ingredients/citrus.png' },
  { label: 'Коріандр', image: '/images/ingredients/coriander.png' },
  { label: 'Дягель', image: '/images/ingredients/angelica.png' },
  { label: 'Кориця', image: '/images/ingredients/cinnamon.png' },
  { label: 'Аніс', image: '/images/ingredients/anise.png' },
  { label: 'Солодка', image: '/images/ingredients/licorice.png' },
];

export default function TastingProfile() {
  return (
    <section className='border border-black/10 bg-[var(--background)] px-6 py-10 shadow-sm sm:px-10 lg:py-14'>
      <h2 className='text-center text-2xl font-semibold tracking-tight lg:text-3xl'>
        Смаковий профіль
      </h2>
      <p className='mx-auto mt-3 max-w-2xl text-center text-zinc-600 lg:text-lg'>
        .G має чистий, гармонійний смак із вираженими хвойними нотами та свіжим
        цитрусовим післясмаком. Використання виключно власної зернової основи
        забезпечує напою особливу м&apos;якість та глибину.
      </p>
      <p className='mx-auto mt-3 max-w-2xl text-center text-zinc-600 lg:text-lg'>
        Використання виключно власної зернової основи забезпечує напою особливу
        м&apos;якість та глибину.
      </p>
      <h3 className='text-center text-xl font-semibold tracking-tight pt-4 lg:text-2xl'>
        Ботанікали
      </h3>
      <div className='mt-8 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-7 md:gap-x-6'>
        {ingredients.map((item) => (
          <div key={item.label} className='flex flex-col items-center gap-3'>
            <div
              className='relative aspect-square w-full max-w-[130px]'
              style={{
                maskImage:
                  'radial-gradient(circle at center, black 55%, transparent 78%)',
                WebkitMaskImage:
                  'radial-gradient(circle at center, black 55%, transparent 78%)',
              }}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className='object-contain mix-blend-multiply'
              />
            </div>
            <span className='text-center text-xs text-zinc-600'>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
