import React, { useState } from 'react'
import Board from './board';
import { AppShell, Tabs, Text } from '@mantine/core';

const boardPanel = [
  { tab: '1', name: 'Board 1', content: Board }
];

export default function BoardContainer() {
  const [boardTab, setBoardTab] = useState<string | null>('1');

  return (
    <AppShell.Section grow bg="dark.8">
      <Tabs
        inverted
        value={boardTab}
        onChange={setBoardTab}
        classNames={{
          list: "before:border-0!",
          tab: "data-[active]:bg-dark-600 data-[active]:border-t-2 py-2! rounded-none",
        }}
      >
        <Tabs.List>
          {boardPanel.map(item => (
            <Tabs.Tab key={item.tab} value={item.tab} px="xs" className='h-8'>
              <Text size='xs' fw={700}>
                {item.name}
              </Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {boardPanel.map(item => (
          <Tabs.Panel key={item.tab} value={item.tab}>
            <item.content id={`board-${item.tab}`} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </AppShell.Section>
  )
}
