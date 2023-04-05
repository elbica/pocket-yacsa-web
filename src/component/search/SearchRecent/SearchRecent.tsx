import { useRouter } from "next/router";

import { Icon } from "@/component/common/Icon";
import type { RecentSearch } from "@/hooks/common";
import { isTagType } from "@/hooks/common";

import { SearchItem } from "../SearchItem";

interface Props {
  items: RecentSearch[];
  onAddItem: ({ value, type, id }: RecentSearch) => void;
  onDelete: (id: RecentSearch["id"]) => void;
}

export const SearchRecent = ({ items, onAddItem, onDelete }: Props) => {
  const router = useRouter();
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col justify-between">
      {items.map((item) => {
        const { id, value, type } = item;
        return (
          <SearchItem
            key={id}
            tagName={value}
            endComponent={
              <Icon
                className="absolute right-6"
                name="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
              />
            }
            startComponent={
              <Icon className="min-w-24" name={isTagType(type) ? "sharp" : "search"} />
            }
            onClick={() => {
              onAddItem({ value, type, id });
            }}
            onMouseDown={(e) => {
              // Prevent input blur
              e.preventDefault();
            }}
          />
        );
      })}
    </div>
  );
};
