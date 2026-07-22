import Image from 'next/image';

export default function ProductHero() {
  return (
    <section className='overflow-hidden bg-[var(--background)]'>
      <div className='relative aspect-[4/5] w-full sm:aspect-[16/9]'>
        <Image
          src='/hero-section.png'
          alt='.G Genebra — українська крафтова джиневра'
          fill
          priority
          className='object-cover object-[65%_center] sm:object-center'
        />

        <div className='absolute inset-0 flex items-start pt-6 sm:items-center sm:pt-0'>
          <div className='max-w-[50%] px-5 text-left sm:max-w-[54%] sm:px-8 md:px-10 lg:px-14'>
            <h1 className='text-lg font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-5xl'>
              Крапка G - крафтовий джин із волі і сталі
            </h1>
            <p className='mt-2 max-w-md text-xs text-zinc-600 sm:mt-4 sm:text-sm md:text-base lg:max-w-lg lg:text-lg'>
              Міцний алкогольний напій створений методом потрійної дистиляції
              зернового дистиляту власного виробництва. Збалансований смак
              ялівцю, цитрусових і трав.
            </p>
            <a
              href='#order'
              className='mt-4 inline-block bg-[var(--accent)] px-4 py-2 text-xs font-medium text-white hover:opacity-90 sm:mt-6 sm:px-6 sm:py-3 sm:text-base lg:mt-8 lg:px-8 lg:py-3.5 lg:text-lg'
            >
              Замовити
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
