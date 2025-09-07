import { boardStore } from '@/lib/stores/board.store';
import Konva from 'konva';
import React, { use, useEffect } from 'react'
import { Layer, Transformer } from 'react-konva';
import { useStore } from 'zustand';
import RenderNode from './render-node';
import { useDebouncedValue } from '@mantine/hooks';
import { useSaveBoardRoot } from '@/lib/query.hooks';

export default function ContentLayer() {
  const pageRef = React.useRef<Konva.Group>(null);
  const hasMounted = React.useRef(false);
  const root = useStore(boardStore, (s) => s.root);
  const [debouncedRoot] = useDebouncedValue(root, 5000);
  const BoardID = useStore(boardStore, (s) => s.boardID);
  const isSaving = useStore(boardStore, (s) => s.isSaving);
  const setIsSaving = useStore(boardStore, (s) => s.setIsSaving);
  const { mutate, isPending } = useSaveBoardRoot();
  const selectedNodes = useStore(boardStore, (s) => s.selectedNodes);
  const transformerRef = React.useRef<Konva.Transformer>(null);

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

  useEffect(() => {
    if (selectedNodes.length && transformerRef.current) {
      // Get the nodes from the refs Map
      const nodes = selectedNodes.reduce<Konva.Rect[]>((acc, id) => {
        const node = transformerRef.current?.getStage()?.findOne(`#${id}`) as Konva.Rect;
        if (node) acc.push(node);
        return acc;
      }, []);

      transformerRef.current.nodes(nodes);
    } else if (transformerRef.current) {
      // Clear selection
      transformerRef.current.nodes([]);
    }
  }, [selectedNodes]);

  useEffect(() => {
    if (!debouncedRoot) return;

    // Skip the first run on mount
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    mutate({ root: debouncedRoot, boardID: BoardID });
  }, [debouncedRoot]);

  useEffect(() => {
    setIsSaving(isPending);
  }, [isPending, setIsSaving]);

  return (
    <Layer name='content-layer'>
      {root ? <RenderNode node={root} /> : null}

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
