"use client";

import { ActionIcon, Container, Group, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import ConfigPanel from './config-panel';
import { ChevronRightIcon, FileUpIcon, SaveIcon, Share2Icon } from 'lucide-react';

export default function ScheduleEditor() {
  const actionIcons = [ SaveIcon, Share2Icon, FileUpIcon];

  return (
    <Container fluid className='relative h-full bg-dark-900 p-0'>
      <Stack>
        <Group p="xs" justify='space-between'>
          <Group gap="0px">
            <ActionIcon
              type="submit"
              variant="subtle"
              size="md"
              color="dark"
              className="hover:bg-dark-700"
            >
              <ChevronRightIcon className="size-4.5 stroke-2 text-dark-50" />
            </ActionIcon>
            <Title order={6} fw="normal">SCHEDULES</Title>
          </Group>
          <Group gap="xs">
            {actionIcons.map(Icon => (
              <ActionIcon
                type="submit"
                variant="subtle"
                size="md"
                color="dark"
                className="hover:bg-dark-700"
              >
                <Icon className="size-4.5 stroke-2 text-dark-50" />
              </ActionIcon>
            ))}
          </Group>
        </Group>
        <Text size='xs' px="xs">Schedule editor</Text>
      </Stack>
      <ConfigPanel />
    </Container>
  )
}
