import { Portal } from "@/component/common/Portal";
import { Toast } from "@/component/common/Toast/Toast";
import { Z_INDEX } from "@/util/constant";

import { useToastContext } from "./context";

export const ToastContainer = () => {
  const toasts = useToastContext();

  return (
    <Portal id="toast-portal">
      <div
        className={`pointer-events-none fixed inset-0 h-screen bg-[rgba(23,23,23,0.35)] opacity-0 transition-opacity duration-300 ${
          toasts.length && "pointer-events-auto opacity-100"
        } px-18 ${
          Z_INDEX.toast
        } m-auto grid w-full max-w-[44rem] place-items-center content-center gap-6`}
      />
      <aside
        className={`pointer-events-none fixed inset-0 px-18 ${Z_INDEX.toast} m-auto grid w-full max-w-[44rem] place-items-center content-center gap-6`}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </aside>
    </Portal>
  );
};
