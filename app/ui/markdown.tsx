export function H1({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h1 className={`text-3xl py-3 font-[900] leading-tight tracking-tight text-gray-800 dark:text-white ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h2 className={`text-2xl py-2 font-[700] leading-tight tracking-tight text-gray-800 dark:text-gray-100 ${className}`}>
      {children}
    </h2>
  );
}

export function P({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={`text-[1.05em] font-[400] leading-[1.28] text-gray-700 dark:text-gray-300 ${className}`}>
      {children}
    </p>
  );
}
