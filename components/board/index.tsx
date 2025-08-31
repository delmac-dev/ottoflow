import React from 'react';
import { Group, Layer, Rect, Stage } from 'react-konva';
import GridLayer from './grid-layer';
import { useMantineTheme } from '@mantine/core';
import ToolBar from './tool-bar';
import { Circle, Frame, Hexagon, Image, MoveUpRight, PenTool, Spline, Square, Star, Torus, Type } from 'lucide-react';

type Props = {
  width: number;
  height: number;
  id: string;
}

export default function Board({ width, height, id }: Props) {
  const theme = useMantineTheme();

  const tools = [
    [{ icon: Frame, label: 'Frame', action: () => {}, disabled: false }],
    [
      { icon: Square, label: 'Rectangle', action: () => {}, disabled: false },
      { icon: Circle, label: 'Circle', action: () => {}, disabled: false },
      { icon: MoveUpRight, label: 'Arrow', action: () => {}, disabled: false },
      { icon: Spline, label: 'Line', action: () => {}, disabled: false }
    ],
    [{ icon: PenTool, label: 'Pen', action: () => {}, disabled: false }],
    [
      { icon: Star, label: 'Star', action: () => {}, disabled: false },
      { icon: Hexagon, label: 'Polygon', action: () => {}, disabled: false },
      { icon: Torus, label: 'Ring', action: () => {}, disabled: false }
    ],
    [{ icon: Type, label: 'Text', action: () => {}, disabled: false }],
    [{ icon: Image, label: 'Image', action: () => {}, disabled: false }]
  ]

  return (
    <>
      <ToolBar tools={tools} />
      <Stage height={height} width={width}>
        <GridLayer width={width} height={height} cellSize={20} />
        <Layer>
          <Group>
            <Rect
              x={(width - 480) / 2}
              y={(height - 480) / 2}
              width={480}
              height={480}
              fill={theme.colors.green[5]}
            />

          </Group>
        </Layer>
      </Stage>
    </>
  )
}
