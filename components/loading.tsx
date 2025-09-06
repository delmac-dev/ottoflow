import { Center, Container, Loader, Stack, Text } from '@mantine/core'
import React from 'react'

export default function Loading() {
  return (
    <Container fluid bg={"dark.8"}>
      <Center h={"100dvh"}>
        <Stack align='center' gap='sm'>
          <Loader size={"sm"} color="dark.2" />
          <Text size='sm' c="dark.2" fw={"600"}>Loading...</Text>
        </Stack>
      </Center>
    </Container>
  )
}
