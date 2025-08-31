import { ActionIcon, Group, Stack } from '@mantine/core'
import { LucideIcon, MoreVertical, Plus } from 'lucide-react'
import React from 'react';
import ToolButton from './tool-button';

type Tool = {
  icon: LucideIcon;
  label: string;
  action: () => void;
  disabled: boolean;
}

type Props = {
  tools: Tool[][];
}

export default function ToolBar({ tools }: Props) {
  return (
    <Group bg="dark.6" justify='flex-start' px="xs" gap={4} className='h-8'>
      {tools.map((tool) => (
        <React.Fragment key={tool[0].label}>
          {tool.length === 1 ? (
            <ToolButton {...tool[0]} />
          ) : (
            <ToolButton.Multiple tools={tool} />
          )}
        </React.Fragment>
      ))}
    </Group>
  )
}
