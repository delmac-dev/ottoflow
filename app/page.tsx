import { cn } from "@/lib/utils";

export default function Home() {

  const pages = [
    {url: "/test-board", name: "Board Editor"},
    {url: "/test-schedule", name: "Schedule Editor"},
    {url: "/test-ai", name: "AI Prompting"},
    {url: "/coming-soon", name: "Coming Soon"},
  ]

  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] bg-neutral-950 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative h-20 w-full">
        <div className="absolute h-full w-[100%] left-0 top-0 bg-neutral-950"/>
        <div className="absolute h-full w-[95%] left-0 top-0 bg-neutral-900" />
        <div className="absolute h-full w-[90%] left-0 top-0 bg-neutral-800" />
        <div className="absolute h-full w-[80%] left-0 top-0 bg-neutral-700" />
        <div className="absolute h-full w-[70%] left-0 top-0 bg-neutral-600" />
        <div className="absolute h-full w-[60%] left-0 top-0 bg-neutral-500" />
        <div className="absolute h-full w-[50%] left-0 top-0 bg-neutral-400" />
        <div className="absolute h-full w-[40%] left-0 top-0 bg-neutral-300" />
        <div className="absolute h-full w-[30%] left-0 top-0 bg-neutral-200" />
        <div className="absolute h-full w-[20%] left-0 top-0 bg-neutral-100" />
        <div className="absolute h-full w-[10%] left-0 top-0 bg-neutral-50" />
      </div>
      <main className="relative z-20 flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/auth"
          >
            Authentication
          </a>
        </div>
      </main>
      <footer className="relative z-20 row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {pages.map(({url, name}) => (
          <a
            key={url}
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href={url}
          >
            {name}
          </a>
        ))}
      </footer>
    </div>
  );
}
