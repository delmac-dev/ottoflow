import { AppShell, Center, Text } from '@mantine/core'
import React from 'react'

export default function SignInBody() {

  return (
    <AppShell.Section grow bg='dark.8' className='h-[calc(100vh-44px)]'>
      <Center className='h-full'>
        <Text size='sm'>Sign in to begin your workspace</Text>
      </Center>
    </AppShell.Section>
  )
}
