export function PlayIcon({className}: {className?: string}) {
  return (
    <div
      className={`ml-1 h-0 w-0 border-t-12 border-b-12 border-l-20 border-t-transparent border-b-transparent border-l-white ${className || ""}`}
    />
  );
}


