import { useRef } from "react";

import { Portal } from "@/component/common/Portal";
import { Toast } from "@/component/common/Toast/Toast";
import { useIsomorphicLayoutEffect } from "@/hooks/common";
import { Z_INDEX } from "@/util/constant";

import { useToastContext } from "./context";

let prevHeight = 0;
const EXPAND_DELAY = 200;

export const ToastContainer = () => {
  const toasts = useToastContext();

  const ref = useRef<HTMLElement>(null!);

  /**
   * NOTE FLIP Animation
   *  @link https://web.dev/building-a-toast-component/#managing-one-or-many-toasts
   */
  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      const currentHeight = ref.current.getBoundingClientRect().height;

      if (currentHeight > prevHeight) {
        const invert = currentHeight - prevHeight;

        ref.current.animate(
          [{ transform: `translateY(${invert}px)` }, { transform: "translateY(0)" }],
          {
            duration: EXPAND_DELAY,
            easing: "ease-out",
          },
        );
      }
      prevHeight = currentHeight;
    }
  }, [toasts]);

  // TODO z-index 관리
  return (
    <Portal id="toast-portal">
      <aside
        className={`fixed inset-x-0 bottom-32 px-18 ${Z_INDEX.toast} m-auto grid w-full max-w-[44rem] place-items-center content-end gap-6`}
        ref={ref}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </aside>
    </Portal>
  );
};
