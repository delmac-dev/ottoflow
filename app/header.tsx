import { AppShell, Avatar, Group, Select, Text, Title } from '@mantine/core'
import React from 'react'

export default function Header() {
  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify='space-between'>
        <Title order={6} className='text-xs'>Ottoflow</Title>
        <Select
          className='grow-0'
          size="xs"
          placeholder="Project"
          data={['React', 'Angular', 'Vue', 'Svelte']}
        />
        <Group>
          <Avatar src="/avatars/blue.jpg" alt="it's me" className='grow-0' size={"sm"} />
        </Group>
      </Group>
    </AppShell.Header>
  )
}
