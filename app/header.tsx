import { AppShell, Avatar, Group, Select, Text, Title } from '@mantine/core'
import React from 'react'

export default function Header() {
  return (
    <AppShell.Header>
      <Group grow h="100%" px="md" justify='between'>
        <Title order={6}>Ottoflow</Title>
        <Select
          size="xs"
          placeholder="Project"
          data={['React', 'Angular', 'Vue', 'Svelte']}
        />
        <Avatar src="/blue.jpg" alt="it's me" />
      </Group>
    </AppShell.Header>
  )
}
