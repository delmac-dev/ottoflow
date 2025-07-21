"use client";

import { ActionIcon, Box, Container, FloatingIndicator, Group, Stack, Tabs, Text, Title } from '@mantine/core'
import React, { useState } from 'react'
import { ChevronRightIcon, FileIcon, SaveIcon, Share2Icon } from 'lucide-react';
import AIPanel from './ai-panel';
import { cn } from '@/lib/utils';
import startCase from "lodash.startcase";


export default function ScheduleEditor() {
  const actionIcons = [SaveIcon, Share2Icon];
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };
  const schedules = [
    { id: '1', name: 'Data Structures', room: 'Room 101', lecturer: 'Dr. Smith', date: '2025-07-22', start_time: '09:00', end_time: '11:00' },
    { id: '2', name: 'Operating Systems', room: 'Room 102', lecturer: 'Prof. Johnson', date: '2025-07-23', start_time: '10:00', end_time: '12:00' },
    { id: '3', name: 'Database Systems', room: 'Room 103', lecturer: 'Dr. Lee', date: '2025-07-24', start_time: '11:00', end_time: '13:00' },
    { id: '4', name: 'Computer Networks', room: 'Room 104', lecturer: 'Ms. Brown', date: '2025-07-25', start_time: '12:00', end_time: '14:00' },
    { id: '5', name: 'Software Engineering', room: 'Room 105', lecturer: 'Mr. Davis', date: '2025-07-26', start_time: '13:00', end_time: '15:00' },
  ];

  return (
    <Stack className='h-[calc(100dvh_-_48px)] p-0 gap-0'>
      <Tabs variant="none" value={value} onChange={setValue} className='relative flex flex-col flex-1 overflow-hidden' >
        <Group justify='space-between' className='h-10 px-4 border-b border-dark-600'>
          <Tabs.List ref={setRootRef} className="relative h-full gap-4">
            <Tabs.Tab value="1" ref={setControlRef('1')} className="z-1 px-0">
              <Text size='xs' className={cn('text-dark-200 font-semibold', value == "1" && "text-dark-100")}>Data</Text>
            </Tabs.Tab>
            <Tabs.Tab value="2" ref={setControlRef('2')} className="z-1 px-0">
              <Text size='xs' className={cn('text-dark-200 font-semibold', value == "2" && "text-dark-100")}>Properties</Text>
            </Tabs.Tab>
            <FloatingIndicator 
              className='before:absolute before:w-full before:h-0.5 before:bg-dark-100 before:rounded-t-sm before:bottom-0 before:left-0'
              target={value ? controlsRefs[value] : null} 
              parent={rootRef}
            />
          </Tabs.List>
          {/* <Group gap="xs">
            {actionIcons.map((Icon, index) => (
              <ActionIcon
                key={index}
                type="submit"
                variant="subtle"
                size="md"
                color="dark"
                className="hover:bg-dark-500"
              >
                <Icon className="size-4 stroke-2 text-dark-50" />
              </ActionIcon>
            ))}
          </Group> */}
        </Group>
        <Stack className='p-0 flex-1 overflow-y-auto'>
          <Tabs.Panel value="1">
            <Stack className='gap-0 p-0'>
              {schedules.map((schedule) => (
                <Stack key={schedule.id} className='w-full p-5 not-last:border-b border-dark-600'>
                  {Object.entries(schedule).filter(([s]) => s !== "id").map(([key, value], index) => (
                    <Group className='justify-between'>
                      <Text className='text-xs text-dark-200 font-semibold'>{startCase(key)}</Text>
                      <Text className='text-xs text-dark-50 font-semibold'>{value}</Text>
                    </Group>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="2">
            <form>
              <Stack className='p-4'>
                <Text className='text-xs font-semibold text-dark-400 w-full text-center'>Properties Editor</Text>
              </Stack>
            </form>
          </Tabs.Panel>
        </Stack>
      </Tabs>
      <AIPanel />
    </Stack>
  )
}
