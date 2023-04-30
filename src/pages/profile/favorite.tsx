import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { BackButton, BottomNavigation } from "@/component/common/Navigation";
import { Tab } from "@/component/common/Tab";
import { BG_COLORS, TEXT_COLORS } from "@/styles";

const SelectButtons = () => {
  const [selectIdx, setSelectIdx] = useState(0);

  return (
    <div className="flex text-12-regular-160">
      <button
        className={
          "rounded-l-12 px-12 py-6 " +
          (selectIdx === 0
            ? `${TEXT_COLORS["1"]} ${BG_COLORS.primary0} font-bold`
            : `${TEXT_COLORS["7"]} ${BG_COLORS.primary3} border border-primary-light-2`)
        }
        onClick={() => setSelectIdx(0)}
      >
        최신순
      </button>
      <button
        className={
          "rounded-r-12 px-12 py-6 " +
          (selectIdx === 1
            ? `${TEXT_COLORS["1"]} ${BG_COLORS.primary0} font-bold`
            : `${TEXT_COLORS["7"]} ${BG_COLORS.primary3} border border-primary-light-2`)
        }
        onClick={() => setSelectIdx(1)}
      >
        오래된순
      </button>
    </div>
  );
};

const InfiniteItem = () => {
  return (
    <Link className="flex flex-col overflow-hidden rounded-8 border border-gray-100" href="#">
      <div className="relative h-100 w-full">
        <Image fill alt="test" src="/picture/landing.png" />
      </div>
      <div className="flex flex-col px-16 py-12">
        <span className={`${TEXT_COLORS["8"]} mb-4 text-14-medium-140 font-bold`}>
          타이레놀 160mg
        </span>
        <span className={`${TEXT_COLORS["6"]} text-12-regular-160`}>2022.03.24</span>
        <span className={`${TEXT_COLORS["7"]} mt-4 text-12-regular-160`}>제약제약회사</span>
      </div>
    </Link>
  );
};

let infiniteListHeight = 0;
const InfiniteList = () => {
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
      <InfiniteItem />
      <InfiniteItem />
      <InfiniteItem />
      <InfiniteItem />
      <InfiniteItem />
      <InfiniteItem />
      <InfiniteItem />
      <InfiniteItem />
      <InfiniteItem />
      <InfiniteItem />
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
            <Tab.Content>
              <div className="mb-10 mt-24 flex w-full items-end justify-between">
                <SelectButtons />
                <span className={`${TEXT_COLORS["6"]} text-12-regular-160 underline`}>총 96개</span>
              </div>
              <InfiniteList />
            </Tab.Content>
            <Tab.Content>
              <div className="mb-10 mt-24 flex w-full items-end justify-between">
                <SelectButtons />
                <span className={`${TEXT_COLORS["6"]} text-12-regular-160 underline`}>총 96개</span>
              </div>
              <InfiniteList />
            </Tab.Content>
          </Tab.Panel>
        </Tab>
      </div>
      <BottomNavigation />
    </>
  );
};

export default FavoritePage;
