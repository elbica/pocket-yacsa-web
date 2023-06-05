import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main
      className="relative mx-auto max-w-[44rem] bg-white shadow-lg dark:bg-ui-dark-1"
      style={{ minHeight: "100dvh" }}
    >
      {children}
    </main>
  );
};
