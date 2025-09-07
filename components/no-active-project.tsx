import { AppShell, Center, Text } from '@mantine/core'
import React from 'react'

export default function NoActiveProject() {
  return (
    <AppShell.Section grow bg='dark.8' className='h-[calc(100vh-44px)]'>
      <Center className='h-full'>
        <Text size='sm'>Select or create a project to get started</Text>
      </Center>
    </AppShell.Section>
  )
}
