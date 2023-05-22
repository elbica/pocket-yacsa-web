import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Icon } from "@/component/common/Icon";
import { api } from "@/util/axios";

import { SearchItem } from "../SearchItem";

interface RecentSearch {
  name: string;
  createdAt: string;
}
interface Props {
  items: RecentSearch[];
  onClick: (value: string) => void;
}

export const SearchRecent = ({ items, onClick }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ name, createdAt }: RecentSearch) =>
      api.delete(`/medicines/search/logs?name=${name}&createdAt=${createdAt}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["recentSearch"]);
      },
    },
  );
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col justify-between px-12 py-16">
      {items.map((item) => {
        const { name, createdAt } = item;
        return (
          <SearchItem
            key={name}
            tagName={name}
            endComponent={
              <Icon
                className="ml-auto min-w-24"
                color="black"
                name="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  mutate({ name, createdAt });
                  // onDelete(id);
                }}
              />
            }
            startComponent={
              <Icon className="min-w-24" color="black" height={24} name="smallSearch" width={24} />
            }
            onClick={() => {
              onClick(name);
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
