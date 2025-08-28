"use client";

import { AppShell, Burger, Center, Group, Stack, Tabs, Text } from '@mantine/core';
import React, { useState } from 'react'
import Header from './header';
import Footer from './footer';
import AIChat from './ai-chat';
import Canvas from './canvas';
import Designer from './designer';

export default function TestPage() {
  const [tab, setTab] = useState<string | null>('1');

  return (
    <AppShell
      header={{ height: 44 }}
      footer={{ height: 24 }}
      navbar={{ width: 300, breakpoint: 'xs' }}
      padding={0}
    >
      <Header />
      <AppShell.Navbar>
        <AppShell.Section grow>
          <Tabs value={tab} onChange={setTab}> {/*inverted*/}
            <Tabs.List component={AppShell.Section}>
              <Tabs.Tab value="1">Tab 1</Tabs.Tab>
              <Tabs.Tab value="2">Tab 2</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="1">
              <form>
                <Stack className='p-4'>
                  <Text className='text-sm font-semibold text-dark-200 w-full text-center'>Schedule Editor</Text>
                </Stack>
              </form>
            </Tabs.Panel>
            <Tabs.Panel value="2">
              <form>
                <Stack className='p-4'>
                  <Text className='text-sm font-semibold text-dark-200 w-full text-center'>Properties Editor</Text>
                </Stack>
              </form>
            </Tabs.Panel>
          </Tabs>
        </AppShell.Section>
        <AIChat />
      </AppShell.Navbar>
      <Designer />
      <Footer />
    </AppShell>
  )
}
