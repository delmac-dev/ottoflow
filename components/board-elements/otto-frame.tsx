import { handleDragEnd, handleDragStart, handleTransformEnd } from '@/lib/handlers'
import { INode } from '@/lib/types'
import React from 'react'
import { Group, Rect } from 'react-konva'

type Props = {
  node: INode,
  optionalName?: string,
  children?: React.ReactNode
}

const OttoFrame = ({ node, optionalName, children }: Props) => {
  return (
    <Group
      id={node.id}
      name={`${node.name} ${optionalName}`}
      nodeType={node.type}
      x={node.x}
      y={node.y}
      width={node.width}
      height={node.height}
      
      visible={node.visible}
      rotation={node.rotation}
      opacity={node.opacity}

      draggable

      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    >
      <Rect
        id={`rect-${node.id}`}
        name={"frame-background"}
        nodeType={"Background"}

        x={0}
        y={0}
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

export default OttoFrame