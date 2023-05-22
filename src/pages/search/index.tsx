import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { BottomNavigation } from "@/component/common/Navigation";
import { InfiniteList } from "@/component/result";
import { SearchInput } from "@/component/search/SearchInput";
import { SearchRecent } from "@/component/search/SearchRecent";
import { SearchResultList } from "@/component/search/SearchResult";
import { useDebounce, useInput } from "@/hooks/common";
import type { MedicineSearchPageRes } from "@/models";
import { api } from "@/util/axios";

interface RecentSearch {
  name: string;
  createdAt: string;
}
export default function Home() {
  const inputProps = useInput();
  const queryClient = useQueryClient();

  const [isSearchMedicine, setIsSearchMedicine] = useState(false);
  const { data: items } = useQuery(["recentSearch"], () =>
    api.get<RecentSearch[]>("/medicines/search/logs"),
  );
  const { mutate } = useMutation((name: string) => api.post(`/medicines/search/logs?name=${name}`));

  const handleSearchItem = (value: string) => {
    inputProps.setValue(value);
    if (value) {
      setIsSearchMedicine(true);

      if (!items?.filter((item) => item.name === value).length)
        mutate(value, {
          onSuccess: () => {
            queryClient.invalidateQueries(["recentSearch"]);
          },
        });
    }
  };

  const onSearchByKeyword = () => {
    if (!inputProps.value || !inputProps.value.trim()) return;
    handleSearchItem(inputProps.value);
  };
  const debouncedValue = useDebounce(inputProps.value);

  return (
    <>
      <div className="px-20 pt-16">
        <SearchInput
          {...inputProps}
          placeholder="알약을 입력해 주세요."
          spellCheck={false}
          type="text"
          onSearchByKeyWord={onSearchByKeyword}
          onChange={(e) => {
            inputProps.onChange(e);
            setIsSearchMedicine(false);
          }}
          onReset={() => {
            inputProps.onReset();
            setIsSearchMedicine(false);
          }}
        />
        <p className="mb-8 ml-23 text-12-regular-160 text-[#c1c2c9]">알약을 검색해 보세요.</p>
        {inputProps.value && !isSearchMedicine && (
          <SearchResultList value={debouncedValue.trim()} onClick={handleSearchItem} />
        )}
        {inputProps.value && isSearchMedicine && <SearchInfiniteResult value={inputProps.value} />}
        {!inputProps.value && <SearchRecent items={items || []} onClick={handleSearchItem} />}
      </div>
      <BottomNavigation />
    </>
  );
}

const SearchInfiniteResult = ({ value }: { value: string }) => {
  const { data, fetchNextPage } = useInfiniteQuery(
    ["searchMedicine", value],
    ({ pageParam = 0 }) =>
      api.get<MedicineSearchPageRes>(`/medicines/search/page?name=${value}&page=${pageParam + 1}`),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.lastPage ? undefined : lastPage.page;
      },
    },
  );
  const infiniteResultItems = data?.pages.flatMap((page) => page.medicineSearchList) || [];

  return (
    <>
      <InfiniteList items={infiniteResultItems} onRequestAppend={() => fetchNextPage()} />
    </>
  );
};
