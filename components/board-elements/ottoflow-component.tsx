import { INode } from '@/lib/types';
import React from 'react';
import { Group, Rect } from 'react-konva';

type Props = {
  node: INode | null,
  children?: React.ReactNode
}

export default function OttoFlowComponent({ node, children }: Props) {
  if (!node) return null;
  return (
    <Group
      id={node?.id}
      name={node?.name}
      nodeType={node?.type}
      x={node?.x || 0}
      y={node?.y || 0}
      width={node?.width}
      height={node?.height}

      visible={node?.visible}
      rotation={node?.rotation}
      opacity={node?.opacity}
    >
      <Rect
        id={`rect-${node?.id}`}
        name={"component-background"}
        nodeType={"Background"}

        x={0}
        y={0}
        width={node?.width}
        height={node?.height}
        fill={node?.fill}

        shadowColor={node?.shadow?.color}
        shadowBlur={node?.shadow?.blur}
        shadowOffsetX={node?.shadow?.x}
        shadowOffsetY={node?.shadow?.y}
        shadowOpacity={node?.shadow?.opacity}

        stroke={node?.stroke}
        strokeWidth={node?.strokeWidth}

        cornerRadius={node?.cornerRadius}
      />
      {children}
    </Group>
  )
}
