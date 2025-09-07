import { boardStore } from '@/lib/stores/board.store';
import { INode } from '@/lib/types'
import React from 'react';
import { Group, Rect } from 'react-konva';
import { useStore } from 'zustand';

type Props = {
  node: INode,
  children?: React.ReactNode
}

export default function OttoPage({ node, children }: Props) {
  const width = useStore(boardStore, (state) => state.width);
  const height = useStore(boardStore, (state) => state.height);

  return (
    <Group
      id={node.id}
      name={node.name}
      type={node.type}
      x={(width - (node.width ?? 0)) / 2}
      y={(height - (node.height ?? 0)) / 2}
      width={node.width}
      height={node.height}
      
      visible={node.visible}
      rotation={node.rotation}
      opacity={node.opacity}
    >
      <Rect
        id={`rect-${node.id}`}
        name={"Page Background"}
        type={"Page-Background"}

        x={node.x}
        y={node.y}
        width={node.width}
        height={node.height}
        fill={node.fill}

        shadowColor={node.shadow?.color}
        shadowBlur={node.shadow?.blur}
        shadowOffsetX={node.shadow?.x}
        shadowOffsetY={node.shadow?.y}
        shadowOpacity={node.shadow?.opacity}

        stroke={node.stroke}
        strokeWidth={node.strokeWidth}

        cornerRadius={node.cornerRadius}
      />
      {children}
    </Group>
  )
}
