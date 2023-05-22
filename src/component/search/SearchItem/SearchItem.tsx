import type { HTMLAttributes, ReactNode } from "react";

import { useColoredText } from "@/hooks/common";
import { TEXT_COLORS } from "@/styles";

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
      className={`${TEXT_COLORS["9"]} flex h-50 w-full cursor-pointer items-center gap-10 border-b border-gray-100 px-12 text-16-regular-140 dark:border-ui-dark-3`}
      {...rest}
    >
      {startComponent}
      <div className="grow truncate pr-4">{ColoredText}</div>
      {endComponent}
    </div>
  );
};
