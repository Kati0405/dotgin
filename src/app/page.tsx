export default function Home() {
  return (
    <div className='flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center'>
        <h1 className='text-3xl font-semibold tracking-tight text-black dark:text-zinc-50'>
          .G
        </h1>
        <p className='mt-4 max-w-md text-lg text-zinc-600 dark:text-zinc-400'>
          Small-batch gin, coming soon.
        </p>
      </main>
    </div>
  );
}
