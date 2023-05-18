import { useRouter } from "next/router";
import { Suspense } from "react";

import { BottomNavigation } from "@/component/common/Navigation";
import { SearchInput } from "@/component/search/SearchInput";
import { SearchRecent } from "@/component/search/SearchRecent";
import { SearchResultList } from "@/component/search/SearchResult";
import { useDebounce, useInput, useRecentSearch } from "@/hooks/common";

export default function Home() {
  const inputProps = useInput();
  const { items, onDeleteItem, onAddItem } = useRecentSearch();
  const router = useRouter();

  const onSearchByKeyword = () => {
    if (!inputProps.value || !inputProps.value.trim()) return;

    onAddItem({ value: inputProps.value, type: "keyword", id: Date.now() });
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
        />
        <p className="mb-8 ml-23 text-12-regular-160 text-[#c1c2c9]">알약을 검색해 보세요.</p>
        {inputProps.value && (
          <Suspense>
            <SearchResultList value={debouncedValue} onAddItem={onAddItem} />
          </Suspense>
        )}
        {!inputProps.value && (
          <SearchRecent items={items} onAddItem={onAddItem} onDelete={onDeleteItem} />
        )}
      </div>
      <BottomNavigation />
    </>
  );
}
