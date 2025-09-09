import { boardStore } from '@/lib/stores/board.store';
import { INode } from '@/lib/types';
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form';
import { useStore } from 'zustand';
import Wrapper from './wrapper';
import DefaultInput from '../board/form-element/default-input';
import { AlignVerticalSpaceAround, Blend, Droplet, Pilcrow, SquareDashedTopSolid } from 'lucide-react';
import ColorInput from '../board/form-element/color-input';
import SegmentInput from '../board/form-element/segment-input';
import { SegmentedControlItem } from '@mantine/core';
import SelectInput from '../board/form-element/select-input';
import { scheduleStore } from '@/lib/stores/schedule.store';

const textTypes: SegmentedControlItem[] = [
  { label: "Literal", value: "literal" },
  { label: "Variable", value: "property" }
];

const supportedFonts = ["Arial"];
const fontStyles = [ "normal", "bold", "italic"];
const fontSizes = ["8", "10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "40", "44", "48", "56", "64"];
const decorations = ["underline", "line-through", "none"];

export default function TextForm({ node }: { node: INode }) {
  const updateRoot = useStore(boardStore, (s) => s.updateRoot);
  const properties = useStore(scheduleStore, (s) => s.properties);
  const inFrame = node.name.split(" ")[1] && node.name.split(" ")[1] === "frame-element";

  const keys:string[] = React.useMemo(() => {
    return properties.map((obj) => obj.key)
  }, [properties]);

  const formData = (n: INode) => ({
    text: {
      type: n.text?.type || "literal",
      value: n.text?.value || "",
      key: n.text?.key || "", //TODO: properties.length > 0 ? properties[0].key : "add some properties"
    },

    x: n.x,
    y: n.y,
    rotation: n.rotation,

    width: n.width,
    height: n.height,

    opacity: n.opacity,
    visible: n.visible,

    fontFamily: n.fontFamily,
    fontSize: n.fontSize,
    fontStyle: n.fontStyle,
    decoration: n.decoration,
    lineHeight: n.lineHeight,
    letterSpacing: n.letterSpacing,

    fill: n.fill,

    stroke: n.stroke,
    strokeWidth: n.strokeWidth,

    shadowX: n.shadow?.x,
    shadowY: n.shadow?.y,
    shadowBlur: n.shadow?.blur,
    shadowColor: n.shadow?.color,
    shadowOpacity: n.shadow?.opacity,
  });

  const { handleSubmit, control, reset, watch, formState: { isDirty, isValid } } = useForm({
    defaultValues: formData(node)
  });

  const textType = watch("text.type");

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
      <Wrapper label="Text">
        <SegmentInput name="text.type" control={control} data={textTypes} readOnly={!inFrame} />
        {textType === "literal" ?
          (<DefaultInput name="text.value" control={control} label='T' type='text' isFull />) :
          (<SelectInput name='text.key' control={control} data={keys} pH='variable' />)
        }
      </Wrapper>
      <Wrapper label="Position">
        <DefaultInput name="x" control={control} label="X" type="number" />
        <DefaultInput name="y" control={control} label="Y" type="number" />
      </Wrapper>
      <Wrapper label="Layout">
        <DefaultInput name="width" control={control} label="W" type="number" />
        <DefaultInput name="height" control={control} label="H" type="number" disabled />
      </Wrapper>
      <Wrapper label="Appearance">
        <DefaultInput name="opacity" control={control} icon={Blend} type="number" />
      </Wrapper>
      <Wrapper label="Typography">
        <SelectInput name="fontFamily" control={control} data={supportedFonts} pH='font family' />
        <SelectInput name="fontStyle" control={control} data={fontStyles} pH='font style' isFull={false} />
        <SelectInput name="fontSize" control={control} data={fontSizes} pH='font size' isFull={false} type='number' />
        <DefaultInput name="lineHeight" control={control} icon={AlignVerticalSpaceAround} type='number' />
        <DefaultInput name="letterSpacing" control={control} icon={Pilcrow} type='number' />
        <SelectInput name="decoration" control={control} data={decorations} pH='decoration' isFull={false} />
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
