import { useInfiniteQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import React, { useState } from "react";

import { BackButton, BottomNavigation } from "@/component/common/Navigation";
import { Tab } from "@/component/common/Tab";
import { InfiniteList } from "@/component/result";
import type { DetectionLogPageRes, FavoritePageRes } from "@/models";
import { BG_COLORS, TEXT_COLORS } from "@/styles";
import { api } from "@/util/axios";

const NoData = () => {
  return (
    <div
      className={`${TEXT_COLORS["8"]} fixed inset-0 m-auto h-fit w-fit text-center text-16-regular-140`}
    >
      데이터가 없습니다. 😥
    </div>
  );
};
const SelectButtons = ({ onClick }: { onClick: (mode: number) => void }) => {
  const [selectIdx, setSelectIdx] = useState(0);

  return (
    <div className="flex text-12-regular-160">
      <button
        className={
          "rounded-l-12 px-12 py-6 " +
          (selectIdx === 0
            ? `text-white ${BG_COLORS.primary0} font-bold dark:border-ui-dark-6`
            : `${TEXT_COLORS["7"]} ${BG_COLORS.primary3} border border-primary-light-2 dark:border-ui-dark-6`)
        }
        onClick={() => (setSelectIdx(0), onClick(0))}
      >
        최신순
      </button>
      <button
        className={
          "rounded-r-12 px-12 py-6 " +
          (selectIdx === 1
            ? `text-white ${BG_COLORS.primary0} font-bold`
            : `${TEXT_COLORS["7"]} ${BG_COLORS.primary3} border border-primary-light-2 dark:border-ui-dark-6`)
        }
        onClick={() => (setSelectIdx(1), onClick(1))}
      >
        오래된순
      </button>
    </div>
  );
};
const FavoritePage = () => {
  return (
    <>
      <div className="px-20">
        <BackButton className="absolute left-24 top-24" />

        <Tab className="items-center pt-20">
          <Tab.Group>
            <Tab.Label>촬영기록</Tab.Label>
            <Tab.Label>내 서랍</Tab.Label>
          </Tab.Group>
          <Tab.Panel>
            <HistoryList />
            <FavoriteList />
          </Tab.Panel>
        </Tab>
      </div>
      <BottomNavigation />
    </>
  );
};

const FavoriteList = (props: PropsWithChildren) => {
  const [order, setOrder] = useState("DESCENDING");
  const { data, isError, fetchNextPage } = useInfiniteQuery(
    ["favorites", order],
    ({ pageParam = 0 }) =>
      api.get<FavoritePageRes>(`/favorites?order=${order}&page=${pageParam + 1}`),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.lastPage ? undefined : lastPage.page;
      },
    },
  );
  const infiniteResultItems =
    data?.pages.flatMap((page) =>
      page.favorites?.map((logs) => ({
        id: logs.medicineId,
        company: logs.medicineCompany,
        image: logs.medicineImage,
        name: logs.medicineName,
        date: logs.createdAt.split("T")[0].replaceAll("-", "."),
      })),
    ) || [];

  return (
    <Tab.Content {...props}>
      {isError ? (
        <NoData />
      ) : (
        <>
          <div className="mb-10 mt-24 flex w-full items-end justify-between">
            <SelectButtons
              onClick={(mode) => {
                if (mode === 0) setOrder("DESCENDING");
                else setOrder("ASCENDING");
              }}
            />
            <span className={`${TEXT_COLORS["6"]} text-12-regular-160 underline`}>
              총 {data?.pages[0].total}개
            </span>
          </div>
          <InfiniteList items={infiniteResultItems} onRequestAppend={fetchNextPage} />
        </>
      )}
    </Tab.Content>
  );
};

const HistoryList = (props: PropsWithChildren) => {
  const [order, setOrder] = useState("DESCENDING");
  const { data, isError, fetchNextPage } = useInfiniteQuery(
    ["detection-logs", order],
    ({ pageParam = 0 }) =>
      api.get<DetectionLogPageRes>(`/detection-logs?order=${order}&page=${pageParam + 1}`),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.lastPage ? undefined : lastPage.page;
      },
    },
  );
  const infiniteResultItems =
    data?.pages.flatMap((page) =>
      page.detectionLogs.map((logs) => ({
        id: logs.medicineId,
        company: logs.medicineCompany,
        image: logs.medicineImage,
        name: logs.medicineName,
        date: logs.createdAt.split("T")[0].replaceAll("-", "."),
      })),
    ) || [];
  return (
    <Tab.Content {...props}>
      {isError ? (
        <NoData />
      ) : (
        <>
          <div className="mb-10 mt-24 flex w-full items-end justify-between">
            <SelectButtons
              onClick={(mode) => {
                if (mode === 0) setOrder("DESCENDING");
                else setOrder("ASCENDING");
              }}
            />
            <span className={`${TEXT_COLORS["6"]} text-12-regular-160 underline`}>
              총 {data?.pages[0].total}개
            </span>
          </div>
          <InfiniteList items={infiniteResultItems} onRequestAppend={fetchNextPage} />
        </>
      )}
    </Tab.Content>
  );
};

export default FavoritePage;
