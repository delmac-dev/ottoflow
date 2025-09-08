import { boardStore } from '@/lib/stores/board.store';
import { INode } from '@/lib/types';
import { Group, ScrollArea, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { useStore } from 'zustand';
import PageForm from '../forms/page-form';
import FrameForm from '../forms/frame-form';
import RectForm from '../forms/rect-form';
import CircleForm from '../forms/circle-form';
import ComponentForm from '../forms/component-form';
import TextForm from '../forms/text-form';

export default function PropertiesPanel() {
  const selectedNodes = useStore(boardStore, (s) => s.selectedNodes);
  const root = useStore(boardStore, (s) => s.root);
  const getNode = useStore(boardStore, (s) => s.getNode);
  
  // Get fresh node reference when root changes
  const node = React.useMemo(() => {
    return selectedNodes.length > 0 ? getNode(selectedNodes[0]) : root;
  }, [selectedNodes, root, getNode]);

  return (
    <Stack className='absolute gap-0 overflow-hidden w-56 right-0 top-12 bottom-3 bg-dark-700 rounded-l-md border border-r-0 border-dark-400'>
      <Group className='w-full p-xs border-b border-dark-400'>
        <Text className="font-semibold text-xs">
          {node?.type}
        </Text>
      </Group>
      <ScrollArea className="w-full flex-1 p-0" scrollbarSize={4}>
        {node && <FormSelector node={node} />}
      </ScrollArea>
    </Stack>
  )
};

const FormSelector = ({node}:{node: INode}) => {
  switch (node.type) {
    case "Page": return <PageForm node={node} />;
    case "Frame": return <FrameForm node={node} />;
    case "Rect": return <RectForm node={node} />;
    case "Circle": return <CircleForm node={node} />;
    case "Component": return <ComponentForm node={node} />;
    case "Text": return <TextForm node={node} />
    default: return null;
  }
}
