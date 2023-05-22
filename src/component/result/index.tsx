import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useIntersect } from "@/hooks/common";
import { TEXT_COLORS } from "@/styles";

interface Item {
  id: number;
  name: string;
  date?: string;
  company: string;
  image: string;
}

const InfiniteItem = ({ name, date, company, image, id }: Item) => {
  return (
    <Link
      className="flex flex-col overflow-hidden rounded-8 border border-gray-100 dark:border-ui-dark-3"
      href={`/pills/${id}`}
    >
      <div className="relative h-100 w-full">
        <Image fill alt="test" src={image} />
      </div>
      <div className="flex flex-col px-16 py-12">
        <span className={`${TEXT_COLORS["8"]} mb-4 text-14-medium-140 font-bold`}>{name}</span>
        {date && <span className={`${TEXT_COLORS["6"]} text-12-regular-160`}>{date}</span>}
        <span className={`${TEXT_COLORS["7"]} mt-4 text-12-regular-160`}>{company}</span>
      </div>
    </Link>
  );
};

let infiniteListHeight = 0;
export const InfiniteList = ({
  items,
  onRequestAppend,
}: {
  items: Item[];
  onRequestAppend: () => void;
}) => {
  const ref = useIntersect(onRequestAppend, { rootMargin: "200% 0px" });

  return (
    <div
      className="grid max-h-full shrink-0 grid-cols-2 gap-x-8 gap-y-16 overflow-y-auto pb-16"
      ref={(e) => {
        const rect = e?.getBoundingClientRect();
        if (!rect || !e) return;

        const fullHeight = window.innerHeight - rect.top - 80;
        if (rect.top) infiniteListHeight = fullHeight;

        e.style.maxHeight = infiniteListHeight + "px";
      }}
    >
      {items.map((item) => (
        <InfiniteItem key={item.name} {...item} />
      ))}
      <div className="h-20" ref={ref} />
    </div>
  );
};
