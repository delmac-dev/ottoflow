import { INode } from "@/lib/types";
import React from "react";
import OttoPage from "../board-elements/otto-page";
import OttoRect from "../board-elements/otto-rect";
import OttoCircle from "../board-elements/otto-circle";
import OttoArrow from "../board-elements/otto-arrow";
import OttoText from "../board-elements/otto-text";
import FrameRenderer from "./frame-renderer";

type Props = {
  node: INode,
  optionalName?: string
  index?: number,
  isClone?: boolean,
}
export default function RenderNode({node, optionalName, index, isClone}:Props) {

  switch (node.type) {
    case "Page": return (
      <OttoPage node={node}>
        {node.children?.map( (childNode) => 
          <RenderNode key={childNode.id} node={childNode} optionalName={"root-child"} />
        )}
      </OttoPage>
    );
    case "Frame": return <FrameRenderer node={node} optionalName={optionalName} />;
    case "Rect": return <OttoRect node={node} optionalName={optionalName} isClone={isClone} />;
    case "Circle": return <OttoCircle node={node} optionalName={optionalName} isClone={isClone} />;
    case "Arrow": return <OttoArrow node={node} optionalName={optionalName} isClone={isClone} />;
    case "Text": return <OttoText node={node} optionalName={optionalName} index={index} isClone={isClone} />;
    default: return null;
  }
};