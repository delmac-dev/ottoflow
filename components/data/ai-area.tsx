import { AppShell, Center, Stack, Text } from '@mantine/core'
import React from 'react'

export default function AIArea() {
  return (
    <AppShell.Section mih={100} p="xs">
      <Stack h="100%" w="100%" className='rounded-sm border border-dark-400'>
        <Center h="100%">
          <Text size='xs' fw={600}>AI Area</Text>
        </Center>
      </Stack>
    </AppShell.Section>
  )
}