import {EffectAllowed} from "ngx-drag-drop";

export interface Draggable {
  content: string;
  effectAllowed: EffectAllowed,
  disable: boolean,
  handle: boolean,

}
