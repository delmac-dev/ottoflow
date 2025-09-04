import { boardStore } from '@/lib/stores/board.store';
import Konva from 'konva';
import React, { useEffect } from 'react'
import { Layer } from 'react-konva';
import { useStore } from 'zustand';

export default function ContentLayer() {
  const pageRef = React.useRef<Konva.Group>(null);
  const width = useStore(boardStore, (state) => state.width);
  const height = useStore(boardStore, (state) => state.height);

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
    </Layer>
  )
}
