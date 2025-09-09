import { handleDragEnd, handleDragStart, handleTransformEnd } from '@/lib/handlers';
import { INode } from '@/lib/types';
import React from 'react'
import { Circle } from 'react-konva';

type Props = {
  node: INode,
  optionalName?: string
  isClone?: boolean,
}

const OttoCircle = ({ node, optionalName, isClone=false }: Props) => {
  return (
    <Circle
      id={node.id}
      name={`${node.name} ${optionalName}`}
      nodeType={node.type}
      x={node.x}
      y={node.y}
      radius={node.radius}
      fill={node.fill}
      visible={node.visible}
      rotation={node.rotation}
      opacity={node.opacity}
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

export default OttoCircle