import type { PropsWithChildren, ReactElement } from "react";
import React, { cloneElement, createContext, useContext, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import { BG_COLORS, TEXT_COLORS } from "@/styles";

const SwipeSectionContext = createContext<boolean>(false);

const OPEN_DELAY = 400;

function SwipeSectionRoot({
  children,
  background,
}: PropsWithChildren<{ background?: ReactElement }>) {
  const [open, setOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const handlers = useSwipeable({
    onSwipedUp: () => setOpen(true),
    onSwipedDown: () => setOpen(false),
  });

  const handleBackgroundClick = () => {
    setIsFull((prev) => !prev);
  };

  return (
    <SwipeSectionContext.Provider value={open}>
      {background && cloneElement(background, { isFull, onClick: handleBackgroundClick })}
      {!isFull ? (
        <section
          {...handlers}
          className={`fixed bottom-0 flex w-full max-w-[44rem] flex-col justify-between rounded-t-24 px-20 py-12 shadow-[0_1px_20px_rgba(0,0,0,0.1)] transition-[height] dark:bg-ui-dark-1 ${
            open ? "h-[98vh] overflow-y-auto" : "h-[70vh]"
          } `}
        >
          {children}
        </section>
      ) : null}
      <div
        className={`pointer-event-none absolute flex w-full items-center justify-center rounded-t-24 bg-white py-8 transition-[top] dark:bg-ui-dark-1 ${
          open ? "top-[2vh]" : "top-[30vh]"
        }`}
      >
        <span
          className={`left-0 right-0 m-auto block h-4 w-80 rounded-13 bg-ui-light-2 dark:bg-ui-dark-3 `}
        />
      </div>
    </SwipeSectionContext.Provider>
  );
}

const Able = ({ children }: PropsWithChildren) => {
  return <div className="mt-24 w-full pb-80">{children}</div>;
};

const Bottom = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[44rem] bg-white px-20 pb-10 dark:bg-ui-dark-1"
        // className=" absolute bottom-0 left-0 w-full border-t border-t-0 bg-white"
      >
        {children}
      </div>
    </>
  );
};

const Title = ({
  children,
  english,
  company,
  type,
}: PropsWithChildren<{ english: string; company: string; type: string }>) => {
  return (
    <>
      <span className={`${TEXT_COLORS["9"]} mb-10 text-22-bold-140`}>{children}</span>
      <div className={`mt-8 flex gap-4 text-14-regular-140 ${TEXT_COLORS["7"]}`}>
        <span>{english}</span>/<span>{company}</span>/<span>{type}</span>
      </div>
    </>
  );
};
const Description = ({ children }: PropsWithChildren) => {
  const init = useContext(SwipeSectionContext);
  const [isOpen, setIsOpen] = useState<boolean>();

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (init) id = setTimeout(() => setIsOpen(init), OPEN_DELAY / 2);
    else setIsOpen(false);
    return () => id && clearTimeout(id);
  }, [init]);

  return (
    <span className={`text-14-regular-140 ${TEXT_COLORS["8"]} my-32 block break-words`}>
      {children}
    </span>
  );
};

const Tag = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex gap-8">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
};

export const BottomSheet = Object.assign(SwipeSectionRoot, {
  Able,
  Bottom,
  Title,
  Description,
  Tag,
});
