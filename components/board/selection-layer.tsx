import { boardStore } from '@/lib/stores/board.store';
import React from 'react'
import { Layer, Rect } from 'react-konva'
import { useStore } from 'zustand'

export default function SelectionLayer() {
  const selectionNet = useStore(boardStore, (s) => s.selectionNet);

  return (
    <Layer name='selection-layer' listening={false}>
      {selectionNet.visible && (
        <Rect
          name="selection-net"
          x={Math.min(selectionNet.x1, selectionNet.x2)}
          y={Math.min(selectionNet.y1, selectionNet.y2)}
          width={Math.abs(selectionNet.x2 - selectionNet.x1)}
          height={Math.abs(selectionNet.y2 - selectionNet.y1)}
          fill="rgba(0, 0, 255, 0.1)"   // lighter blue fill
          stroke="rgba(0, 0, 255, 0.8)" // solid blue border
          strokeWidth={1}
        />
      )}
    </Layer>
  )
}
