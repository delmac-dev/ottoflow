import { boardStore, exampleThreeStore } from '@/lib/stores/board.store';
import { useMantineTheme } from '@mantine/core';
import Konva from 'konva';
import React, { useEffect } from 'react'
import { Group, Layer, Rect, Text } from 'react-konva'
import { useStore } from 'zustand';

export default function Example3() {
  const theme = useMantineTheme();
  const pageRef = React.useRef<Konva.Group>(null);
  const width = useStore(boardStore, (state) => state.width);
  const height = useStore(boardStore, (state) => state.height);
  const position = useStore(exampleThreeStore, (state) => state.position);
  const { undo, redo, dragEnd } = useStore(exampleThreeStore);

  useEffect(() => {
    const unsub = boardStore.subscribe(
      (state) => state.shouldDownload,
      (val) => {
        if (val && pageRef.current) {
          const dataUrl = pageRef.current.toDataURL();
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `dl.png`;
          link.click();
          boardStore.getState().clearDownload();
        }
      }
    );
    return () => unsub();
  }, []);

  return (
    <Layer name='content-layer'>
      <Group
        ref={pageRef}
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
        <Text text="undo" onClick={undo} />
        <Text text="redo" x={40} onClick={redo} />
        <Rect
          x={position.x}
          y={position.y}
          width={50}
          height={50}
          fill="black"
          draggable
          onDragEnd={dragEnd}
        />
      </Group>
    </Layer>
  )
}
