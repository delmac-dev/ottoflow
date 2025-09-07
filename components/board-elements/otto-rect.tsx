import { handleDragEnd, handleDragStart, handleTransformEnd } from '@/lib/handlers'
import { INode } from '@/lib/types'
import React from 'react'
import { Rect } from 'react-konva';

type Props = {
  node: INode,
  optionalName?: string
}

const OttoRect = ({ node, optionalName }: Props) => {

  return (
    <Rect
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
      fill={node.fill}

      shadowColor={node.shadow?.color}
      shadowBlur={node.shadow?.blur}
      shadowOffsetX={node.shadow?.x}
      shadowOffsetY={node.shadow?.y}
      shadowOpacity={node.shadow?.opacity}

      stroke={node.stroke}
      strokeWidth={node.strokeWidth}

      cornerRadius={node.cornerRadius}

      draggable

      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    />
  )
}

export default OttoRect