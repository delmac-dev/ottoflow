"use client";

import { AppShell, NavLink, ScrollArea, Stack, Tabs, Text } from '@mantine/core';
import React, { useState } from 'react'
import Header from './header';
import Footer from './footer';
import DataPanel from '../components/data/data-panel';
import SchemaPanel from '@/components/data/schema-panel';
import AIArea from '@/components/data/ai-area';
import { useViewportSize } from '@mantine/hooks';
import Board from '@/components/board';

export default function TestPage() {
  const [dataTab, setDataTab] = useState<string | null>('1');
  const [boardTab, setBoardTab] = useState<string | null>('1');
  const { width, height } = useViewportSize();

  const headerSize = 44;
  const footerSize = 24;
  const boardOffset = 64;
  const navbarWidth = 300;
  const stageHeight = height - headerSize - footerSize - boardOffset;
  const stageWidth = width - navbarWidth;

  const dataPanel = [
    { tab: '1', name: 'Data', content: DataPanel },
    { tab: '2', name: 'Schema', content: SchemaPanel },
  ]

  const boardPanel = [
    { tab: '1', name: 'Board 1', content: Board }
  ]

  return (
    <AppShell
      header={{ height: headerSize }}
      footer={{ height: footerSize }}
      navbar={{ width: navbarWidth, breakpoint: 'xs' }}
      padding={0}
      className='overflow-hidden'
    >
      <Header />
      <AppShell.Navbar>
        <Tabs
          inverted
          value={dataTab}
          onChange={setDataTab}
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
      <AppShell.Main className='relative'>
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
                <item.content width={stageWidth} height={stageHeight} id={`board-${item.tab}`} />
              </Tabs.Panel>
            ))}
          </Tabs>
        </AppShell.Section>
      </AppShell.Main>
      <Footer />
    </AppShell>
  )
};