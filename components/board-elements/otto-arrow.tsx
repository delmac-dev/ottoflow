import { handleDragEnd, handleDragStart, handleTransformEnd } from '@/lib/handlers'
import { INode } from '@/lib/types'
import React from 'react'
import { Arrow } from 'react-konva'

type Props = {
  node: INode,
  optionalName?: string
  isClone?: boolean,
}

const OttoArrow = ({ node, optionalName, isClone=false }: Props) => {
  return (
    <Arrow
      id={node.id}
      name={`${node.name} ${optionalName}`}
      nodeType={node.type}

      visible={node.visible}
      rotation={node.rotation}
      opacity={node.opacity}
      x={node.x}
      y={node.y}
      points={node.points || []}
      pointerLength={node.pointerLength}
      pointerWidth={node.pointerWidth}
      fill={node.fill}
      stroke={node.stroke}
      strokeWidth={node.strokeWidth}

      shadowColor={node.shadow?.color}
      shadowBlur={node.shadow?.blur}
      shadowOffsetX={node.shadow?.x}
      shadowOffsetY={node.shadow?.y}
      shadowOpacity={node.shadow?.opacity}

      draggable={!isClone}

      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    />
  )
}

export default OttoArrow