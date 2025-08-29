"use client";

import { AppShell } from '@mantine/core';
import React from 'react'
import { Group, Layer, Rect, Stage } from 'react-konva'

export default function Canvas({width, height}:{width:number, height: number}) {

  return (
    <AppShell.Section grow>
      <Stage height={height} width={width} draggable className='overflow-'>
        <Layer>
          <Group>
            <Rect
              x={(width - 480) / 2}
              y={(height - 480) / 2}
              width={480}
              height={480}
              fill="#d4d4d8"
            />
          </Group>
        </Layer>
      </Stage>
    </AppShell.Section>
  )
}
