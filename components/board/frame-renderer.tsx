import { INode } from '@/lib/types';
import React, { useEffect, useMemo } from 'react';
import OttoFrame from '../board-elements/otto-frame';
import OttoFlowComponent from '../board-elements/ottoflow-component';
import RenderNode from './render-node';
import { useStore } from 'zustand';
import { scheduleStore } from '@/lib/stores/schedule.store';
import { computeLayout } from '@/lib/utils';
import { rest } from 'lodash';

type Props = {
  node: INode,
  optionalName?: string,
}

export default function FrameRenderer({ node, optionalName }: Props) {
  const data = useStore(scheduleStore, (s) => s.data);

  const computedLayout = useMemo(() => {
    if (!node.component) return {
      x: 0, y: 0, width: 0, height: 0, children: []
    };
    return computeLayout(
      node, 
      node.component, 
      node.layout ?? 0, 
      data.length, 
      node.gapX ?? 0, 
      node.gapY ?? 0, 
      node.padding ?? 0
    );
  }, [node, data.length]);

  const { children, ...rest } = computedLayout;

  return (
    <OttoFrame node={{...node, ...rest}} optionalName={optionalName}>
      {data.map((_, index) => {

        if(index === 0) {
          if (!node.component) return null;

          return (
            <OttoFlowComponent key={node.component.id} node={node.component}>
              {node.children?.map((childNode) =>
                <RenderNode key={childNode.id} node={childNode} optionalName={"component-child"} />
              )}
            </OttoFlowComponent>
          )
        } else {
          if (!node.component) return null;
          const clone = children[index];
          if (!clone) return null;
          const id = node.component.id + "-clone-" + index;

          return (
            <OttoFlowComponent key={id} node={{...node.component, ...clone, id}}>
              {node.children?.map((childNode) =>
                <RenderNode key={childNode.id} node={childNode} optionalName={"component-child"} index={index} />
              )}
            </OttoFlowComponent>
          )
        }
      })}
    </OttoFrame>
  )
}
