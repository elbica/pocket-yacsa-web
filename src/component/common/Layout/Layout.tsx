import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="px-18 relative mx-auto min-h-screen max-w-[48rem] bg-white shadow-lg">
      {children}
    </main>
  );
};
