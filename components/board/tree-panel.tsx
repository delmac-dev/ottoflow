import { boardStore } from '@/lib/stores/board.store';
import { INode } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getTreeExpandedState, Group, RenderTreeNodePayload, ScrollArea, Stack, Text, Tree, TreeNodeData, useTree } from '@mantine/core'
import { ChevronRight, Trash } from 'lucide-react';
import React, { useEffect } from 'react';
import { useStore } from 'zustand';

function nodeToTree(node: INode): TreeNodeData {
  if (node.type === "Frame" && node.component) {
    return {
      label: node.type,
      value: node.id,
      children: [
        {
          label: node.component.type,
          value: node.component.id,
          children: node.children?.map((child) => nodeToTree(child)) || [],
        },
      ],
    };
  }

  return {
    label: node.type,
    value: node.id,
    children: node.children?.map((child) => nodeToTree(child)) || [],
  };
}

export default function TreePanel() {
  const root = useStore(boardStore, (s) => s.root);
  const selectedNodes = useStore(boardStore, (s) => s.selectedNodes);

  const treeData = React.useMemo(
    () => root?.children?.map(nodeToTree) || [],
    [root]
  );
  const tree = useTree({
    initialSelectedState: selectedNodes,
    initialExpandedState: getTreeExpandedState(treeData, '*')
  });
  

  useEffect(() => {
    tree.setSelectedState(selectedNodes);
  }, [selectedNodes, tree]);

  return (
    <Stack className='absolute overflow-hidden w-56 left-0 top-12 bottom-3 bg-dark-700 rounded-r-md border border-l-0 border-dark-400'>
      <ScrollArea className="w-full flex-1 p-1">
        <Tree
          tree={tree}
          data={treeData}
          expandOnClick={false}
          levelOffset={0}
          renderNode={(payload) => <Branch {...payload} />}
        />
      </ScrollArea>
    </Stack>
  )
};

const Branch = (props: RenderTreeNodePayload) => {
  const removeNode = useStore(boardStore, (s) => s.removeNode);
  const toggleSelectedNode = useStore(boardStore, (s) => s.toggleSelectedNode);
  const { node, expanded, hasChildren, elementProps, tree, level, selected } = props;
  const paddingLeft = (level-1) * 16;

  return (
    <Group 
      {...elementProps}
      style={{ paddingLeft }}
      className={cn(
        "group overflow-hidden gap-0 h-7 hover:bg-dark-600/70 rounded-sm mb-1",
        {'bg-dark-600': selected}
      )}
    >
      <button 
        className={cn(
          'h-full w-4 cursor-pointer flex items-center justify-center',
          {'hover:bg-dark-500/70': hasChildren}
        )}
        disabled={!hasChildren}
        onClick={() => tree.toggleExpanded(node.value)}
      >
        <ChevronRight
          className={cn(
            "size-3.5 transition-transform text-dark-300", 
            {"hidden": !hasChildren}, 
            { "rotate-90": expanded })}
        />
      </button>
      <button
        className='flex-1 px-1 h-full cursor-pointer'
        onClick={() => toggleSelectedNode(node.value)}
      >
        <Text
          className={cn(
            'text-sm font-medium text-dark-100 text-start'
          )}
        >
          {node.label}
        </Text>
      </button>
      <button
        className={cn(
          'h-full w-7 hidden hover:bg-dark-500/70 cursor-pointer items-center justify-center',
          {'group-hover:flex': node.label !== "Component"}
        )}
        onClick={() => removeNode(node.value)}
      >
        <Trash className='size-4 text-dark-300 ' />
      </button>
    </Group>
  );
};
