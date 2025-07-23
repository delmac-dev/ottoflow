import { useAppStore } from '@/lib/stores/app.store';
import React from 'react';
import { Group, Layer, Rect, Stage } from 'react-konva';

const Canvas = () => {
  const { width:_WIDTH, height: _HEIGHT } = useAppStore(s => s.canvas_options);


  return (
    <Stage height={_HEIGHT} width={_WIDTH} draggable>
      <Layer>
        <Group>
          <Rect
            x={(_WIDTH - 480) / 2}
            y={(_HEIGHT - 480) / 2}
            width={480}
            height={480}
            fill="#d4d4d8"
          />
        </Group>
      </Layer>
    </Stage>
  )
}

export default Canvas