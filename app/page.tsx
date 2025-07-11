import { cn } from "@/lib/utils";
import { Anchor, Button, Text } from "@mantine/core";

export default function Home() {

  const pages = [
    {url: "/test-board", name: "Board Editor"},
    {url: "/test-schedule", name: "Schedule Editor"},
    {url: "/test-ai", name: "AI Prompting"},
    {url: "/coming-soon", name: "Coming Soon"},
  ]

  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] bg-[var(--mantine-color-dark-9)] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div> */}
      <main className="relative z-20 flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Anchor
            c="dark.2"
            size="sm"
            href="/auth"
          >
            Authentication
          </Anchor>
          <Button size="compact-xs" variant="filled" radius="lg">Save</Button>
        </div>
      </main>
      <footer className="relative z-20 row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {pages.map(({url, name}) => (
          <Anchor
            c="dark.0"
            size="xs"
            key={url}
            href={url}
          >
            {name}
          </Anchor>
        ))}
      </footer>
    </div>
  );
}
