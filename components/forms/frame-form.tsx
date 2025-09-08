import { boardStore } from '@/lib/stores/board.store';
import { INode } from '@/lib/types'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useStore } from 'zustand';
import Wrapper from './wrapper';
import DefaultInput from '../board/form-element/default-input';
import ColorInput from '../board/form-element/color-input';
import { Blend, Droplet, Scan, SquareDashedTopSolid } from 'lucide-react';

export default function FrameForm({ node }: { node: INode }) {
  const updateRoot = useStore(boardStore, (s) => s.updateRoot);

  const formData = (n: INode) => ({
    x: n.x,
    y: n.y,
    rotation: n.rotation,

    width: n.width,
    height: n.height,

    opacity: n.opacity,
    cornerRadius: n.cornerRadius,

    fill: n.fill,

    stroke: n.stroke,
    strokeWidth: n.strokeWidth,

    shadowX: n.shadow?.x,
    shadowY: n.shadow?.y,
    shadowBlur: n.shadow?.blur,
    shadowColor: n.shadow?.color,
    shadowOpacity: n.shadow?.opacity,
  });

  const { handleSubmit, control, reset, formState: { isDirty, isValid } } = useForm({
    defaultValues: formData(node)
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
          return updatedNode;
        });
      })();
    };
  }, [isDirty, isValid]);

  useEffect(() => {
    reset(formData(node), { keepDirty: false });
  }, [node]);

  return (
    <>
      <Wrapper label="Position">
        <DefaultInput name="x" control={control} label="X" type="number" />
        <DefaultInput name="y" control={control} label="Y" type="number" />
      </Wrapper>
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
}