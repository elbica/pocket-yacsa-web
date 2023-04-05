import type { Toast as Props } from "./types";

export const Toast = ({ message, id, color = "black", visible, ...rest }: Props) => {
  return <output {...rest}>{typeof message === "function" ? message(id) : message}</output>;
};
