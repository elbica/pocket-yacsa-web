import { useQuery } from "@tanstack/react-query";

import { Icon } from "@/component/common/Icon";
import { SearchItem } from "@/component/search/SearchItem";
import { api } from "@/util/axios";

interface Prop {
  value: string;
  onClick: (name: string) => void;
}

export const SearchResultList = ({ value, onClick }: Prop) => {
  const { data: autoCompletedTags } = useQuery(
    ["relatedSearch", value],
    () => api.get<string[]>(`/medicines/search/related?name=${value}`),
    { enabled: !!value },
  );

  if (!value || autoCompletedTags?.length === 0) {
    return null;
  }
  return (
    <ul className="w-full px-12 py-16">
      {autoCompletedTags?.map((tag) => (
        <li key={tag}>
          <SearchItem
            searchText={value}
            startComponent={<Icon className="min-w-24" color="black" name="smallSearch" />}
            tagName={tag}
            onClick={() => {
              onClick(tag);
            }}
          />
        </li>
      ))}
    </ul>
  );
};
