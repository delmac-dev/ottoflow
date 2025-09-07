import { ScrollArea, Stack } from '@mantine/core'
import React from 'react'

export default function PropertiesPanel() {
  return (
    <Stack className='absolute overflow-hidden w-56 right-0 top-12 bottom-3 bg-dark-700 rounded-l-md border border-r-0 border-dark-400'>
      <ScrollArea className="w-full flex-1 p-1">
        Properties Panel
      </ScrollArea>
    </Stack>
  )
}
