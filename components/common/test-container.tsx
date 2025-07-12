import { cn } from '@/lib/utils';
import { ActionIcon, Container, Group } from '@mantine/core';
import { Moon, Sun } from "lucide-react";

export default function TestContainer({children}: {children: React.ReactNode;}){
  return (
    <Container fluid p={0} className="relative min-h-screen">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(var(--color-dark-600)_1px,transparent_1px)]",
        )}
      />
      <Container bg="dark.8" size="sm" mih="inherit" className="relative border-x max-sm:border-0 border-dark-500">
        {children}
      </Container>

      <Group className='fixed right-5 bottom-5 gap-2 bg-dark-800 p-2 rounded-md'>
        <ActionIcon size="md" variant='default'>
          <Sun className='size-4 stroke-1'/>
        </ActionIcon>
        <ActionIcon size="md" variant='default'>
          <Moon className='size-4 stroke-1'/>
        </ActionIcon>
      </Group>
    </Container>
  )
}