import Image from 'next/image';

const highlights = [
  { label: 'Власний пшеничний дистилят', image: '/images/hightlights/wheat.png' },
  { label: 'Потрійна дистиляція', image: '/images/hightlights/our_distillery.png' },
  { label: 'Натуральні ботанікали', image: '/images/hightlights/natural_ingrigients.png' },
  { label: 'Без зайвого', image: '/images/hightlights/pure.png' },
];

export default function Story() {
  return (
    <section
      id='about'
      className='relative scroll-mt-28 overflow-hidden bg-[var(--background-alt)] sm:scroll-mt-20'
    >
      <div className='relative px-6 py-10 text-center sm:px-10 lg:py-14'>
        <h2 className='text-2xl font-semibold tracking-tight lg:text-3xl'>
          Від зерна до пляшки
        </h2>
        <p className='mx-auto mt-3 max-w-md text-zinc-600 lg:max-w-2xl lg:text-lg'>
          Для <strong>.G</strong> ми самі виробляємо пшеничний дистилят і проводимо потрійну
          дистиляцію. Кожну партію створюємо вручну, невеликими обсягами, щоб
          контролювати чистоту, аромат і смак на кожному етапі.
        </p>
      </div>

      <div className='relative border-t border-black/5 px-6 pb-10 pt-8 sm:px-10 lg:pb-14'>
        <div className='mx-auto grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4'>
          {highlights.map((item) => (
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
      </div>
    </section>
  );
}
