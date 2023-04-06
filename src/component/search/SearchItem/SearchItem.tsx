import type { HTMLAttributes, ReactNode } from "react";

import { useColoredText } from "@/hooks/common";

interface SearchItemProps extends HTMLAttributes<HTMLDivElement> {
  searchText?: string;
  tagName: string;
  startComponent?: ReactNode;
  endComponent?: ReactNode;
}

export const SearchItem = ({
  searchText = "",
  tagName,
  startComponent,
  endComponent,
  ...rest
}: SearchItemProps) => {
  const { ColoredText } = useColoredText({ tagName, searchText });

  return (
    <div
      className="flex h-50 w-full cursor-pointer items-center gap-10 border-b border-gray-100 px-12 text-16-regular-140"
      {...rest}
    >
      {startComponent}
      <div className="max-w-230">{ColoredText}</div>
      {endComponent}
    </div>
  );
};
