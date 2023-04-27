import { BG_COLORS, TEXT_COLORS } from "@/styles";

import type { Toast as Props } from "./types";

export const Toast = ({ message, id, color = "black", visible, ...rest }: Props) => {
  return (
    <output
      className={`shadow-[0_4px_12px_rgba(0,0,0,0.15)] ${
        !visible && "opacity-0"
      } transition-opacity duration-300 ${BG_COLORS["1"]} ${
        TEXT_COLORS["7"]
      } flex h-56 w-full items-center justify-center rounded-8 bg-white text-14-medium-140`}
      {...rest}
    >
      {typeof message === "function" ? message(id) : message}
    </output>
  );
};
