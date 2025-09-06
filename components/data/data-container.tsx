import { AppShell, Tabs, Text } from '@mantine/core'
import React, { useState } from 'react'
import AIArea from './ai-area'
import DataPanel from './data-panel'
import SchemaPanel from './schema-panel'

const dataPanel = [
  { tab: '1', name: 'Data', content: DataPanel },
  { tab: '2', name: 'Schema', content: SchemaPanel },
]

export default function DataContainer() {
  const [tab, setTab] = useState<string | null>('1');

  return (
    <AppShell.Navbar>
      <Tabs
        inverted
        value={tab}
        onChange={setTab}
        classNames={{
          list: "before:border-0!",
          tab: "data-[active]:bg-dark-600 data-[active]:border-t-2 py-2! rounded-none",
        }}
        renderRoot={(props) => <AppShell.Section {...props} grow />}
      >
        <Tabs.List>
          {dataPanel.map(item => (
            <Tabs.Tab key={item.tab} value={item.tab} px="xs" className='h-8'>
              <Text size='xs' fw={700}>
                {item.name}
              </Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {dataPanel.map(item => (
          <Tabs.Panel
            key={item.tab}
            value={item.tab}
            className='h-[calc(100%-32px)]'
          >
            <item.content />
          </Tabs.Panel>
        ))}
      </Tabs>
      <AIArea />
    </AppShell.Navbar>
  )
}
