export function SkipIcon({className}: {className?: string}) {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m5 5 14 7-14 7V5z" />
      <line x1="19" x2="19" y1="5" y2="19" />
    </svg>
  );
}
