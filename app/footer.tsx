import { AppShell, Center, Group, Text } from '@mantine/core'
import React from 'react'

export default function Footer() {
  return (
    <AppShell.Footer>
      <Group h="100%" px={'md'}>
        <Text size="xs">© 2024 Ottoflow. All rights reserved.</Text>
      </Group>
    </AppShell.Footer>
  )
}
