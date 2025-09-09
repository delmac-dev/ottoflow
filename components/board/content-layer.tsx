import { boardStore } from '@/lib/stores/board.store';
import Konva from 'konva';
import React, { use, useEffect } from 'react'
import { Layer, Transformer } from 'react-konva';
import { useStore } from 'zustand';
import RenderNode from './render-node';
import { useDebouncedValue } from '@mantine/hooks';
import { useSaveBoardRoot } from '@/lib/query.hooks';

export default function ContentLayer() {
  const layerRef = React.useRef<Konva.Layer>(null);
  const hasMounted = React.useRef(false);
  const root = useStore(boardStore, (s) => s.root);
  const [debouncedRoot] = useDebouncedValue(root, 5000);
  const BoardID = useStore(boardStore, (s) => s.boardID);
  const setIsSaving = useStore(boardStore, (s) => s.setIsSaving);
  const { mutate, isPending } = useSaveBoardRoot();
  const selectedNodes = useStore(boardStore, (s) => s.selectedNodes);
  const transformerRef = React.useRef<Konva.Transformer>(null);

  useEffect(() => {
    const unsub = boardStore.subscribe(
      (state) => state.shouldDownload,
      (val) => {
        if (val && layerRef.current) {
          const stage = layerRef.current.getStage();
          if (!stage) return;
          const group = stage.findOne('.page');
          const bg = stage.findOne('.background')?.getClientRect();
          if (!group) return;
          
          const dataUrl = group.toDataURL({
            x: bg?.x || 0,
            y: bg?.y || 0,
            width: bg?.width || 0,
            height: bg?.height || 0
          });
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `design.png`;
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
      const node = transformerRef.current?.getStage()?.findOne(`#${selectedNodes[0]}`);
      if(!node) return;

      // Set the nodes to the transformer
      if(node.getAttr('nodeType') === "Circle") {
        transformerRef.current?.enabledAnchors(['top-left', 'top-right', 'bottom-left', 'bottom-right']);
      } else if(node.getAttr('nodeType') === "Text") {
        transformerRef.current?.enabledAnchors(['middle-left', 'middle-right']);
      } else {
        transformerRef.current?.enabledAnchors(['top-left', 'top-center', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right']);
      }
      transformerRef.current.nodes([node]);
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
    <Layer ref={layerRef} name='content-layer'>
      {root ? <RenderNode node={root} /> : null}

      <Transformer
        ref={transformerRef}
        rotationSnaps={[0, 90, 180, 270]}
        rotationSnapTolerance={30}
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
