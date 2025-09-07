import { INode } from "@/lib/types";
import React from "react";
import OttoPage from "../board-elements/otto-page";
import OttoRect from "../board-elements/otto-rect";

type Props = {
  node: INode
}
export default function RenderNode({node}:Props) {
  switch (node.type) {
    case "Page": return (
      <OttoPage node={node}>
        {node.children?.map( (childNode) => 
          <RenderNode key={childNode.id} node={childNode} />
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
    case "Rect": return <OttoRect node={node} />;
    default: return null;
  }
};