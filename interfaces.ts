import { MouseEvent } from "react";

export interface IconPropType {
  onClick: (event: MouseEvent<HTMLImageElement>) => void;
}
