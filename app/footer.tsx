import { boardStore } from '@/lib/stores/board.store'
import { AppShell, Center, Group, Loader, Text } from '@mantine/core'
import React from 'react'
import { useStore } from 'zustand'

export default function Footer() {
  const isBoardSaving = useStore(boardStore, (state) => state.isSaving);

  return (
    <AppShell.Footer>
      <Group h="100%" px={'md'} justify='space-between'>
        <Text size="xs" c="dark.2" fw={600}>© 2024 Ottoflow. All rights reserved.</Text>

        {!isBoardSaving ? (null): (
          <Group gap={8}>
            <Loader size={12} color='dark.2' />
            <Text size="xs" c={"dark.2"} fw={"600"}>Saving Board</Text>
          </Group>
        )}

      </Group>
    </AppShell.Footer>
  )
}
