import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative mx-auto min-h-screen max-w-[44rem] bg-white bg-white shadow-lg dark:bg-ui-dark-1">
      {children}
    </main>
  );
};
