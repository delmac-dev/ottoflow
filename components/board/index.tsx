import GridLayer from './grid-layer';
import ToolBar from './tool-bar';
import { Stage } from 'react-konva';
import SelectionLayer from './selection-layer';
import { useStore } from 'zustand';
import { boardStore } from '@/lib/stores/board.store';
import Example3 from './content-examples/example-3';
import click from '@/lib/handlers/click';
import mouseDown from '@/lib/handlers/mouse-down';
import mouseMove from '@/lib/handlers/mouse-move';
import mouseUp from '@/lib/handlers/mouse-up';

type Props = {
  id: string;
}

export default function Board({ id }: Props) {
  const width = useStore(boardStore, (s) => s.width);
  const height = useStore(boardStore, (s) => s.height);

  return (
    <>
      <ToolBar />
      <Stage
        name='stage'
        height={height}
        width={width}
        onClick={click}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
      >
        <GridLayer />
        <Example3 />
        <SelectionLayer />
      </Stage>
    </>
  )
};
