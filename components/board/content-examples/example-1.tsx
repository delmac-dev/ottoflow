import React, { useEffect } from 'react';
import { Group, Layer, Rect, Stage, Text, Transformer } from 'react-konva';
import { useMantineTheme } from '@mantine/core';
import Konva from 'konva';
import { _getClientRect } from '@/lib/utils';
import { useStore } from 'zustand';
import { boardStore, exampleOneStore } from '@/lib/stores/board.store';

const initialRectangles = [
  {
    x: 60,
    y: 60,
    width: 100,
    height: 90,
    fill: 'red',
    id: 'rect1',
    name: 'rect',
    rotation: 0,
  },
  {
    x: 250,
    y: 100,
    width: 150,
    height: 90,
    fill: 'green',
    id: 'rect2',
    name: 'rect',
    rotation: 0,
  },
];

export default function Example1() {
  const theme = useMantineTheme();
  const width = useStore(boardStore, (s) => s.width);
  const height = useStore(boardStore, (s) => s.height);
  const elements = useStore(exampleOneStore, (s) => s.elements);
  const setElements = useStore(exampleOneStore, (s) => s.setElements);
  const selectedIds = useStore(exampleOneStore, (s) => s.selectedIds);
  const transformerRef = React.useRef<Konva.Transformer>(null);

  useEffect(() => {
    setElements(initialRectangles);
  }, []);

  useEffect(() => {
    if (selectedIds.length && transformerRef.current) {
      // Get the nodes from the refs Map
      const nodes = selectedIds.reduce<Konva.Rect[]>((acc, id) => {
        const node = transformerRef.current?.getStage()?.findOne(`#${id}`) as Konva.Rect;
        if (node) acc.push(node);
        return acc;
      }, []);

      transformerRef.current.nodes(nodes);
    } else if (transformerRef.current) {
      // Clear selection
      transformerRef.current.nodes([]);
    }
  }, [selectedIds]);

  const handleDragEnd = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const id = e.target.id();
    const newElements = [...elements];
    const index = newElements.findIndex(el => el.id === id);
    if (index !== -1) {
      newElements[index] = {
        ...newElements[index],
        x: e.target.x(),
        y: e.target.y()
      };
      setElements(newElements);
    }
  };

  const handleTransformEnd = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // Find which rectangle(s) were transformed
    const id = e.target.id();
    const node = e.target;


    const newElements = [...elements];

    // Update each transformed node
    const index = newElements.findIndex(r => r.id === id);

    if (index !== -1) {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      // Reset scale
      node.scaleX(1);
      node.scaleY(1);

      // Update the state with new values
      newElements[index] = {
        ...newElements[index],
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
        rotation: node.rotation(),
      };
    }

    setElements(newElements);
  };

  return (
    <Layer name='content-layer'>
      <Group
        id="page"
        name='page'
        x={(width - 480) / 2}
        y={(height - 480) / 2}
        width={480}
        height={480}
        clip={{ x: 0, y: 0, width: 480, height: 480 }}
      >
        <Rect
          x={0}
          y={0}
          id="background"
          name="background"
          width={480}
          height={480}
          fill={theme.colors.dark[0]}
        />

        {/* Render rectangles directly */}
        {elements.map(rect => (
          <Rect
            key={rect.id}
            {...rect}
            draggable
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
        ))}
      </Group>
      <Transformer
        ref={transformerRef}
        boundBoxFunc={(oldBox, newBox) => {
          // Limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    </Layer>
  )
}
