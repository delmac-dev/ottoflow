import { handleDragEnd, handleDragStart, handleTransformEnd } from '@/lib/handlers';
import { scheduleStore } from '@/lib/stores/schedule.store';
import { INode } from '@/lib/types';
import React from 'react';
import { Text } from 'react-konva';
import { useStore } from 'zustand';

type Props = {
  node: INode,
  optionalName?: string,
  index?: number
  isClone?: boolean,
}

const OttoText = ({ node, optionalName, index=0, isClone=false }: Props) => {
  const data = useStore(scheduleStore, (s) => s.data);
  const finalText = node.text?.type === "literal"? node.text.value : data?.[index]?.[node.text?.key || ""];

  return (
    <Text
      id={node.id}
      name={`${node.name} ${optionalName}`}
      nodeType={node.type}

      x={node.x}
      y={node.y}
      rotation={node.rotation}
      
      width={node.width}
      
      opacity={node.opacity}
      visible={node.visible}

      fill={node.fill}

      shadowColor={node.shadow?.color}
      shadowBlur={node.shadow?.blur}
      shadowOffsetX={node.shadow?.x}
      shadowOffsetY={node.shadow?.y}
      shadowOpacity={node.shadow?.opacity}

      stroke={node.stroke}
      strokeWidth={node.strokeWidth}

      fontFamily={node.fontFamily}
      fontSize={node.fontSize}
      text={finalText ?? ""}
      fontWeight={300}
      fontStyle={node.fontStyle}
      align={node.align}
      verticalAlign={node.verticalAlign}
      lineHeight={node.lineHeight}
      letterSpacing={node.letterSpacing}
      textDecoration={node.decoration}
      

      draggable={!isClone}

      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTransform={(e) => {
        const node = e.target;
        const scaleX = node.scaleX();
        const newWidth = node.width() * scaleX;
        node.setAttrs({
          width: newWidth,
          scaleX: 1,
        });
      }}
      onTransformEnd={handleTransformEnd}
    />
  )
};

export default OttoText;
