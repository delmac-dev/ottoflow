import { ActionIcon, Group, Stack, Tooltip } from '@mantine/core'
import { Circle, Download, Frame, Hexagon, Image, LucideIcon, MousePointer2, MoveUpRight, PenTool, Spline, Square, Star, Torus, Type } from 'lucide-react'
import React from 'react';
import ToolButton from './tool-button';
import { boardStore } from '@/lib/stores/board.store';
import { Action } from '@/lib/types';

type Tool = {
  icon: LucideIcon;
  label: string;
  tool: Action;
}

type RightTool = {
  icon: LucideIcon;
  label: string;
  action: () => void;
  disabled: boolean;
}

const leftTools: Tool[][] = [
  [{ icon: MousePointer2, label: 'Select', tool: Action.Select }],
  [{ icon: Frame, label: 'Frame', tool: Action.Frame }],
  [
    { icon: Square, label: 'Rectangle', tool: Action.Rectangle },
    { icon: Circle, label: 'Circle', tool: Action.Circle },
    { icon: MoveUpRight, label: 'Arrow', tool: Action.Arrow },
    { icon: Spline, label: 'Line', tool: Action.Line }
  ],
  [{ icon: PenTool, label: 'Pen', tool: Action.Pen }],
  [
    { icon: Star, label: 'Star', tool: Action.Star },
    { icon: Hexagon, label: 'Polygon', tool: Action.Polygon },
    { icon: Torus, label: 'Ring', tool: Action.Ring },
  ],
  [{ icon: Type, label: 'Text', tool: Action.Text }],
  [{ icon: Image, label: 'Image', tool: Action.Image }]
];

const downloadFn = () => {
  const { shouldDownload, triggerDownload } = boardStore.getState();
  if (!shouldDownload) {
    triggerDownload();
  }
}

const rightTools: RightTool[] = [
  { icon: Download, label: 'Export', action: downloadFn, disabled: false },
]

export default function ToolBar() {
  return (
    <Group bg="dark.6" px="xs" className='h-8' justify='space-between'>
      <Group justify='flex-start' gap={4}>
        {leftTools.map((tool) => (
          <React.Fragment key={tool[0].label}>
            {tool.length === 1 ? (
              <ToolButton {...tool[0]} />
            ) : (
              <ToolButton.Multiple tools={tool} />
            )}
          </React.Fragment>
        ))}
      </Group>
      <Group justify='flex-end' gap={4}>
        {rightTools.map((tool) => (
          <DownloadButton key={tool.label} {...tool} />
        ))}
      </Group>
    </Group>
  )
};

const DownloadButton = (props: RightTool) => {
  const { label, action, disabled } = props;
  return (
    <Tooltip label={label} position='bottom' h={24} color='dark.6' className='text-xs'>
      <ActionIcon
        onClick={action}
        disabled={disabled}
        variant='subtle'
        color='dark.2'
        size='input-xs'
      >
        <props.icon className='size-4' />
      </ActionIcon>
    </Tooltip>
  )
};
