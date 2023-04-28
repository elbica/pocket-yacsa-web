import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";
import { Children, cloneElement, createContext, isValidElement, useContext, useState } from "react";

import { TEXT_COLORS } from "@/styles";

const TabContext = createContext<any[]>([0]);

interface TabRootProps extends HTMLAttributes<HTMLButtonElement> {
  children:
    | string
    | ReactElement<{ idx?: number; className?: string }>[]
    | ReactElement<{ idx?: number; className?: string }>;
  className?: string;
}

interface TabElementProps extends TabRootProps {
  idx?: number;
}

function TabRoot({ children, className }: PropsWithChildren<{ className?: string }>) {
  const value = useState(0);
  return (
    <TabContext.Provider value={value}>
      <article className={`${className} flex w-full grow flex-col`}>{children}</article>
    </TabContext.Provider>
  );
}

const Panel = ({ children }: TabRootProps) => {
  const [currentIdx] = useContext(TabContext);
  console.log({ currentIdx, children });
  return (
    <section className="relative mt-43 grow overflow-y-hidden">
      {Children.map(children, (child, e) => {
        return e === currentIdx
          ? child
          : isValidElement(child) &&
              cloneElement(child, {
                className: "hidden",
              });
      })}
    </section>
  );
};

const Group = ({
  children,
  start,
  decorator,
}: TabRootProps & { start?: boolean; decorator?: ReactElement }) => {
  const [currentIdx] = useContext(TabContext);

  return (
    <div className="relative w-full grow-0">
      <section
        className={`${
          start ? "align-start" : "aling-center"
        } border-ui-light-07 riight-0 absolute left-0 border-b bg-white `}
      >
        {Children.map(children, (child, e) => {
          return isValidElement(child)
            ? e === currentIdx
              ? cloneElement(child, {
                  className: TEXT_COLORS["8"],

                  idx: e,
                })
              : cloneElement(child, {
                  idx: e,
                })
            : null;
        })}
        {decorator}
      </section>
    </div>
  );
};

const Label = ({ children, idx, className: style, onClick, ...rest }: TabElementProps) => {
  const setIdx = useContext(TabContext)[1];

  return (
    <button
      {...rest}
      className={`p-10 ${style && "border-b-2 border-black"}`}
      onClick={(e) => {
        setIdx(idx);
        onClick?.(e);
      }}
    >
      <span
        className={`text-16-medium-140 ${style ? TEXT_COLORS["9"] : TEXT_COLORS["6"]} ${style}`}
      >
        {children}
      </span>
    </button>
  );
};
const Content = ({ children, className: style }: TabElementProps) => {
  return <div className={`${style} flex flex-col`}>{children}</div>;
};

export const Tab = Object.assign(TabRoot, { Group, Label, Panel, Content });
