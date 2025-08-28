import { AppShell, Center, Text } from '@mantine/core'
import React from 'react'

export default function Footer() {
  return (
    <AppShell.Footer>
      <Center h="100%">
        <Text size="xs">© 2024 Your Company. All rights reserved.</Text>
      </Center>
    </AppShell.Footer>
  )
}
