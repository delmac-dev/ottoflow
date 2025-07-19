"use client";

import { Container, Text } from '@mantine/core'
import React from 'react'
import ConfigPanel from './config-panel';

export default function ScheduleEditor() {
  return (
    <Container fluid className='relative h-full bg-dark-900 p-0'>
      <Text size='xs'>Schedule editor</Text>
      <ConfigPanel />
    </Container>
  )
}
