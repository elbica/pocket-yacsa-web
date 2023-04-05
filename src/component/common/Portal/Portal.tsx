import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useIsMount } from "@/hooks/common";

interface Props {
  id: string;
  children: ReactNode | ReactNode[];
}

export const Portal = ({ id, children }: Props) => {
  const isMount = useIsMount();
  const ref = useRef<HTMLDivElement>();

  useEffect(
    () => () => {
      ref.current?.parentElement?.removeChild(ref.current);
    },
    [id],
  );

  if (!isMount) return null;

  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement("div");
    element.id = id;

    document.body.prepend(element);
  }

  ref.current = element as HTMLDivElement;

  return createPortal(<>{children}</>, ref.current);
};
