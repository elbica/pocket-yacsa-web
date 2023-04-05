import type { ReactElement } from "react";

import type { toastColors } from "./style";

export type ToastType = "success" | "custom";

export interface Toast {
  type: ToastType;
  id: number;
  message: ReactElement | string | ((id: number) => ReactElement | string);
  visible: boolean;
  color?: keyof typeof toastColors;
  duration?: number;
  className?: string;
}

export type ToastOption = Omit<Toast, "type" | "id" | "message" | "visible">;
