import { handleDragEnd, handleDragStart } from '@/lib/handlers'
import { INode } from '@/lib/types'
import React from 'react'
import { Group, Rect } from 'react-konva'

type Props = {
  node: INode,
  optionalName?: string,
  children?: React.ReactNode
}

const OttoFrame = ({ node, optionalName, children }: Props) => {
  const { component } = node;

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
      onTransformEnd={handleDragEnd}
    >
      <Rect
        id={`rect-${node.id}`}
        name={"frame-background"}
        nodeType={"Background"}
        listening={false}

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
      <Group
        id={component?.id}
        name={component?.name}
        nodeType={component?.type}
        x={component?.x || 0}
        y={component?.y || 0}
        width={component?.width}
        height={component?.height}
        listening={false}
        visible={component?.visible}
        rotation={component?.rotation}
        opacity={component?.opacity}
      >
        <Rect
          id={`rect-${component?.id}`}
          name={"component-background"}
          nodeType={"Background"}
          listening={false}

          x={0}
          y={0}
          width={component?.width}
          height={component?.height}
          fill={component?.fill}

          shadowColor={component?.shadow?.color}
          shadowBlur={component?.shadow?.blur}
          shadowOffsetX={component?.shadow?.x}
          shadowOffsetY={component?.shadow?.y}
          shadowOpacity={component?.shadow?.opacity}

          stroke={component?.stroke}
          strokeWidth={component?.strokeWidth}

          cornerRadius={component?.cornerRadius}
        />
        {children}
      </Group>
    </Group>
  )
}

export default OttoFrame