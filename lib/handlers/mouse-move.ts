import { boardStore } from "../stores/board.store";
import { Action, BoardMode, KonvaMouseEvent } from "../types";
import * as S from "@/lib/tool-actions/select-actions";
import * as F from "@/lib/tool-actions/frame-actions";
import * as R from "@/lib/tool-actions/rect-actions";
import * as C from "@/lib/tool-actions/circle-actions";
import * as A from  "@/lib/tool-actions/arrow-actions";
import * as L from "@/lib/tool-actions/line-actions";
import * as P from "@/lib/tool-actions/pen-actions";
import * as St from "@/lib/tool-actions/star-actions";
import * as Po from "@/lib/tool-actions/polygon-actions";
import * as Ri from "@/lib/tool-actions/ring-actions";
import * as T from "@/lib/tool-actions/text-actions";
import * as I from "@/lib/tool-actions/image-actions";

export default function mouseMove(e: KonvaMouseEvent) {
  const { activeTool } = boardStore.getState();

  switch (activeTool) {
    case Action.Select: S.mouseMove(e); break;
    case Action.Frame: F.mouseMove(e); break;
    case Action.Rectangle: R.mouseMove(e); break;
    case Action.Circle: C.mouseMove(e); break;
    case Action.Arrow: A.mouseMove(e); break;
    case Action.Line: L.mouseMove(e); break;
    case Action.Pen: P.mouseMove(e); break;
    case Action.Star: St.mouseMove(e); break;
    case Action.Polygon: Po.mouseMove(e); break;
    case Action.Ring: Ri.mouseMove(e); break;
    case Action.Text: T.mouseMove(e); break;
    case Action.Image: I.mouseMove(e); break;
    default: break;
  }
}