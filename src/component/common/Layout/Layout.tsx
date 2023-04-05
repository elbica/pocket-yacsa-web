import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative mx-auto min-h-screen max-w-[44rem] bg-white shadow-lg">
      {children}
    </main>
  );
};
