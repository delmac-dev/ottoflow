import React, { useState } from 'react'
import Board from './board';
import { AppShell, Tabs, Text } from '@mantine/core';
import { useStore } from 'zustand';
import { boardStore } from '@/lib/stores/board.store';

const boardPanel = [
  { tab: '1', name: 'Board 1', content: Board }
];

export default function BoardContainer() {
  const boardName = useStore(boardStore, (s) => s.name);

  return (
    <AppShell.Section grow bg="dark.8">
      <Tabs
        inverted
        defaultValue={"1"}
        classNames={{
          list: "before:border-0!",
          tab: "data-[active]:bg-dark-600 data-[active]:border-t-2 py-2! rounded-none",
        }}
      >
        <Tabs.List>
          <Tabs.Tab value={"1"} px="xs" className='h-8'>
            <Text size='xs' fw={700}>
              {boardName}
            </Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={"1"}>
          <Board />
        </Tabs.Panel>
      </Tabs>
    </AppShell.Section>
  )
}
