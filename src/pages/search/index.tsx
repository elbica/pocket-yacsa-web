import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";

import { BottomNavigation } from "@/component/common/Navigation";
import { SearchInput } from "@/component/search/SearchInput";
import { SearchRecent } from "@/component/search/SearchRecent";
import { SearchResultList } from "@/component/search/SearchResult";
import { useDebounce, useInput } from "@/hooks/common";
import { api } from "@/util/axios";

interface RecentSearch {
  name: string;
  createdAt: string;
}
export default function Home() {
  const inputProps = useInput();
  const [isSearchMedicine, setIsSearchMedicine] = useState(false);
  const { data: items } = useQuery(["recentSearch"], () =>
    api.get<RecentSearch[]>("/medicines/search/logs"),
  );

  const handleSearchItem = (value: string) => {
    inputProps.setValue(value);
    setIsSearchMedicine(true);
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
          onReset={() => {
            inputProps.onReset();
            setIsSearchMedicine(false);
          }}
        />
        <p className="mb-8 ml-23 text-12-regular-160 text-[#c1c2c9]">알약을 검색해 보세요.</p>
        {inputProps.value && !isSearchMedicine && (
          <SearchResultList value={debouncedValue.trim()} onClick={handleSearchItem} />
        )}
        {inputProps.value && isSearchMedicine && <div>hello</div>}
        {!inputProps.value && <SearchRecent items={items || []} onClick={handleSearchItem} />}
      </div>
      <BottomNavigation />
    </>
  );
}
