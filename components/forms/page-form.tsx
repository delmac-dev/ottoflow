import { INode } from '@/lib/types'
import { Grid, Group, Stack, Text } from '@mantine/core';
import React, { useEffect } from 'react'
import { useController, useForm } from 'react-hook-form'
import { useStore } from 'zustand';
import { boardStore } from '@/lib/stores/board.store';
import ColorInput from '../board/form-element/color-input';
import DefaultInput from '../board/form-element/default-input';
import { Blend, Droplet, Scan, SquareDashedTopSolid } from 'lucide-react';
import { cn } from '@/lib/utils';
import Wrapper from './wrapper';

export default function PageForm({node}: {node: INode}) {
  const updateRoot = useStore(boardStore, (s) => s.updateRoot);

  const { handleSubmit, control, reset, formState: { isDirty, isValid }} = useForm({
    defaultValues: {
      width: node.width,
      height: node.height,

      opacity: node.opacity,
      cornerRadius: node.cornerRadius,

      fill: node.fill,

      stroke: node.stroke,
      strokeWidth: node.strokeWidth,

      shadowX: node.shadow?.x,
      shadowY: node.shadow?.y,
      shadowBlur: node.shadow?.blur,
      shadowColor: node.shadow?.color,
      shadowOpacity: node.shadow?.opacity,
    }
  });

  useEffect(() => {
    if (isDirty && isValid) {
      handleSubmit((data) => {
        updateRoot(node.id, (n) => {
          const updatedNode = { 
            ...n, 
            ...data,
            shadow: {
              x: data.shadowX,
              y: data.shadowY,
              blur: data.shadowBlur,
              color: data.shadowColor,
              opacity: data.shadowOpacity,
            }
          };
          reset(data, { keepDirty: false });
          return updatedNode;
        });
      })();
    };
  }, [isDirty, isValid]);

  return (
    <>
      <Wrapper label="Layout">
        <DefaultInput name="width" control={control} label="W" type="number" />
        <DefaultInput name="height" control={control} label="H" type="number" />
      </Wrapper>
      <Wrapper label="Appearance">
        <DefaultInput name="opacity" control={control} icon={Blend} type="number" />
        <DefaultInput name="cornerRadius" control={control} icon={Scan} type="number" />
      </Wrapper>
      <Wrapper label="Fill">
        <ColorInput name="fill" control={control} />
      </Wrapper>
      <Wrapper label="Stroke">
        <ColorInput name="stroke" control={control} />
        <DefaultInput name="strokeWidth" control={control} icon={SquareDashedTopSolid} type="number" isFull />
      </Wrapper>
      <Wrapper label="Shadow" noBorder>
        <DefaultInput name="shadowX" control={control} label='X' type="number" />
        <DefaultInput name="shadowY" control={control} label='Y' type="number" />
        <DefaultInput name="shadowBlur" control={control} icon={Droplet} type="number" />
        <DefaultInput name="shadowOpacity" control={control} icon={Blend} type="number" />
        <ColorInput name="shadowColor" control={control} />
      </Wrapper>
    </>
  )
};
