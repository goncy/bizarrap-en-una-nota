export default function Loading() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-4 md:p-6">
      {/* Polaroid skeleton */}
      <article className="w-full max-w-[300px] bg-white p-4 shadow-2xl">
        <div className="h-80 w-full animate-pulse bg-gray-200" />
        <div className="mt-4 flex items-center justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
        </div>
      </article>
    </main>
  );
}
