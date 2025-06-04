import { ReactNode } from "react";

import { IconNameType } from "~components/Icon";

import { Size, Status } from "./enum.utils";

export type ActionType<T> = {
  click: (item: T) => void;
  icon?: IconNameType;
  label?: string;
  status?: Status;
};

export type FieldType<T = {}> = {
  adapter?: (item: T) => ReactNode;
  key: keyof T & string;
  label: string;
  size: Size;
  sortable?: boolean;
};
