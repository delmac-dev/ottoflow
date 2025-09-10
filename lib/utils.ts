import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { INode, KonvaMouseEvent } from "./types";
import Konva from "konva";
import { refine } from "zod";

/**
 * COMBINES AND MERGES CSS CLASS NAMES WITH PROPER CONFLICT RESOLUTION.
 *
 * @param inputs - Variable number of class values (strings, objects, arrays, etc.) to be combined.
 * @returns A merged string of class names with Tailwind CSS conflicts resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * GENERATES THE BASE URL FOR THE APPLICATION BASED ON THE DEPLOYMENT ENVIRONMENT.
 * 
 * @returns The complete base URL string with appropriate protocol (HTTPS for production, HTTP otherwise).
 */
export const _baseUrl = () => {

  if(process.env.NEXT_PUBLIC_VERCEL_ENV === "production")
    return (`https://${process.env.OTTOFLOW_URL}`)
  else
    return (`http://${process.env.OTTOFLOW_URL}`)

};

// Returns a *new* root with only the updated branch changed
export function updateNodeById(
  root: INode,
  id: string,
  updater: (node: INode) => INode
): INode {
  // If this is the node we want, apply updater
  if (root.id === id) {
    return updater(root);
  }

  // If it's a frame/page, recurse into children
  if (root.type === "Page" || root.type === "Frame") {
    return {
      ...root,
      children: root.children?.map(child => updateNodeById(child, id, updater)),
      component: root.type === "Frame" && root.component
        ? updateNodeById(root.component, id, updater)
        : root.component
    };
  }

  // Otherwise return as-is (no change)
  return root;
}

export function getNodeById(root: INode, id: string): INode | undefined {
  if (root.id === id) return root;

  if (!root.children) return undefined;

  for (const child of root.children) {
    if (child.id === id) return child;

    if (child.type === "Frame") {
      if (child.component?.id === id) return child.component;

      if (child.children) {
        for (const nested of child.children) {
          if (nested.id === id) return nested;
        }
      }
    }
  }

  return undefined;
}

export function removeNodeById(root: INode, id: string): INode {
  if (root.type === "Page" || root.type === "Frame") {
    return {
      ...root,
      children: root.children
        ?.filter(child => child.id !== id) // ✅ remove only from children
        .map(child => removeNodeById(child, id)), // ✅ recurse into children
      // keep component untouched
      component: root.type === "Frame" ? root.component : undefined,
    };
  }

  // non-container nodes stay as-is
  return root;
};

/**
 * GETS THE PARENT NODE ID AND RELATIVE POSITION FOR ADDING NEW NODES.
 * 
 * @param e - Konva mouse event object
 * @returns Object containing parentId and relativePos, or null if not found
 */
export const getDropTarget = (e: KonvaMouseEvent) => {
  const stage = e.target.getStage();
  if (!stage) return null;

  let group;
  let parentId;
  let relativePos;
  let isPage = true;

  if (e.evt.shiftKey) {
    // find the group (parent node) id
    group = e.target.findAncestor(".root-child"); // Konva Group
    if (!group) {
      return null;
    }
    parentId = group.id();
    const referenceGroup = e.target.findAncestor(".component");
    relativePos = referenceGroup.getRelativePointerPosition();
    isPage = false;
  } else {
    // find the first group with name "background"
    group = stage.findOne((node: Konva.Group) => node.getType() === "Group" && node.name() === "page");
    if (!group) {
      return null;
    }
    parentId = group.id();
    relativePos = group.getRelativePointerPosition();
    isPage = true;
  }

  if (!relativePos) return null;

  return { parentId, relativePos, isPage };
};

export const round = (num: number, decimals = 2) =>
  Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

export function computeLayout(
  container: INode,
  object: INode,
  cols: number, // 0 => flex-row, 1 => flex-col, >1 => grid
  count: number,
  gapX: number = 0,
  gapY: number = 0,
  padding: number = 0
) {
  const { width: cw = 0, height: ch = 0 } = container;
  const { width: ow = 0, height: oh = 0 } = object;

  const children: { x: number; y: number; width: number; height: number }[] = [];

  // normalize cols
  let effectiveCols = cols === 0 ? count : cols;
  const rows = Math.ceil(count / effectiveCols);

  for (let i = 0; i < count; i++) {
    const col = i % effectiveCols;
    const row = Math.floor(i / effectiveCols);

    children.push({
      x: padding + col * (ow + gapX), // relative to container
      y: padding + row * (oh + gapY), // relative to container
      width: ow,
      height: oh,
    });
  }

  return {
    x: container.x, // keep container position for global
    y: container.y,
    width: padding * 2 + effectiveCols * ow + (effectiveCols - 1) * gapX,
    height: padding * 2 + rows * oh + (rows - 1) * gapY,
    children,
  };
}