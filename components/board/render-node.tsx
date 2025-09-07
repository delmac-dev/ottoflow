import { INode } from "@/lib/types";
import React from "react";
import OttoPage from "../board-elements/otto-page";
import OttoRect from "../board-elements/otto-rect";
import OttoCircle from "../board-elements/otto-circle";

type Props = {
  node: INode,
  optionalName?: string
}
export default function RenderNode({node, optionalName}:Props) {
  switch (node.type) {
    case "Page": return (
      <OttoPage node={node}>
        {node.children?.map( (childNode) => 
          <RenderNode key={childNode.id} node={childNode} optionalName={"root-child"} />
        )}
      </OttoPage>
    );
    // case "Frame": return (
    //   <OttoFrame node={node}>
    //     {node.children?.map( (childNode) => 
    //       <RenderNode key={childNode.id} node={childNode} />
    //     )}
    //   </OttoFrame>
    // );
    case "Rect": return <OttoRect node={node} optionalName={optionalName} />;
    case "Circle": return <OttoCircle node={node} optionalName={optionalName} />;
    default: return null;
  }
};