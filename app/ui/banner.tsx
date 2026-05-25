import ThemeToggle from './theme-toggle';

export default function Banner() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="w-full md:max-w-[50vw] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white select-none">
          Liang-Hsuan Tseng
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
