import { ActionIcon, Group, Stack } from '@mantine/core'
import { MoreHorizontal, MoreVertical, Plus } from 'lucide-react'
import React from 'react'

export default function DataPanel() {
  return (
    <Stack>
      <Group bg="dark.6" justify='flex-end' px="xs" gap={4} className='h-8'>
        <ActionIcon variant='subtle' color='dark.2' size='input-xs'>
          <Plus className='size-4'/>
        </ActionIcon>
        <ActionIcon variant='subtle' color='dark.2' size='input-xs'>
          <Plus className='size-4'/>
        </ActionIcon>
        <ActionIcon variant='subtle' color='dark.2' size='input-xs'>
          <MoreVertical className='size-4'/>
        </ActionIcon>
      </Group>
    </Stack>
  )
}
