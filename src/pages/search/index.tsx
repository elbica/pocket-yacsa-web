import { useRouter } from "next/router";
import { Suspense } from "react";

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
      <SearchInput
        {...inputProps}
        placeholder="당신이 생각한 '그 밈' 검색하기"
        spellCheck={false}
        type="text"
        onSearchByKeyWord={onSearchByKeyword}
      />
      <p className="mb-24 px-14 text-12-regular-160 text-gray-500">밈 제목,태그를 입력하세요</p>
      {inputProps.value && (
        <Suspense>
          <SearchResultList value={debouncedValue} onAddItem={onAddItem} />
        </Suspense>
      )}
      {!inputProps.value && (
        <SearchRecent items={items} onAddItem={onAddItem} onDelete={onDeleteItem} />
      )}
    </>
  );
}
