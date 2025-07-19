import { ActionIcon, Box, Container, Group, Stack, Textarea } from '@mantine/core'
import { FileImage, FileInput, FilePlusIcon, PlusIcon, SendHorizonalIcon } from 'lucide-react'
import React from 'react'

export default function ConfigPanel() {
  return (
    <Container fluid className='absolute w-full h-auto p-xs left-0 bottom-0 border-t border-dark-600'>
      
      <form>
        <Stack gap={"xs"}>
          <Textarea autosize minRows={1} maxRows={3} variant='unstyled' placeholder='Your prompt goes here' size='xs'/>
          <Group justify='space-between'>
            <ActionIcon type='button' variant='subtle' size="md" color='dark' className='hover:bg-dark-700'>
              <FilePlusIcon className='size-4 text-dark-50' />
            </ActionIcon>
            <ActionIcon type='submit' variant='subtle' size="md" color='dark' className='hover:bg-dark-700'>
              <SendHorizonalIcon className='size-4 text-dark-50' />
            </ActionIcon>
          </Group>
        </Stack>
      </form>
    </Container>
  )
}
