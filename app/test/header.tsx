import { AppShell, Group, Text } from '@mantine/core'
import React from 'react'

export default function Header() {
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Text size='sm'>Ottoflow</Text>
      </Group>
    </AppShell.Header>
  )
}
