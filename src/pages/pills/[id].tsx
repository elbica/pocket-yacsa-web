import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import Image from "next/image";
import type { PropsWithChildren } from "react";
import React from "react";

import { BottomSheet } from "@/component/common/BottomSheet";
import { Icon } from "@/component/common/Icon";
import { useToast } from "@/component/common/Toast";
import { TEXT_COLORS } from "@/styles";

const FAVORITE_ID = "북마크";

const Section = ({ title, children, icon }: PropsWithChildren<{ title: string; icon: string }>) => {
  return (
    <Item key={title} value={title}>
      <Header>
        <Trigger className="flex w-full items-center justify-between gap-8 rounded-full py-12 text-16-bold-140 [&>span>#chevronDown]:data-[state=open]:rotate-180">
          <span className="pr-4 text-18-bold-140">{icon}</span>
          <span className="flex-grow text-left text-18-bold-140">{title}</span>
          <span className="flex h-40 w-40 items-center justify-center rounded-full hover:bg-gray-100">
            <Icon
              aria-hidden
              className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
              id="chevronDown"
              name="chevronDown"
            />
          </span>
        </Trigger>
      </Header>
      <Content className="overflow-hidden pl-8 data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
        {children}
        <div className="h-28" />
      </Content>
    </Item>
  );
};

export default function Pill() {
  const { show } = useToast();
  const handleTogglePill = () => {
    show("내 서랍에 저장하였습니다");
  };
  return (
    <>
      <div className="relative h-[32vh]">
        <Image fill alt="알약사진" src="/picture/landing.png" />
      </div>
      <BottomSheet>
        <BottomSheet.Able>
          <BottomSheet.Title company="한국얀센" english="Tylenol Tab.160mg" type="전문의약품">
            타이레놀정 160mg
          </BottomSheet.Title>
          <BottomSheet.Description>
            폴리프로필렌, 다층필름플라스틱용기에 든 무색 투명한 액.
          </BottomSheet.Description>

          <Root collapsible className="min-w-300 w-full" defaultValue={FAVORITE_ID} type="single">
            <Section icon="💊" title="성분">
              <div className={`${TEXT_COLORS["7"]} flex flex-wrap gap-8 text-14-regular-140`}>
                <span className="rounded-20 bg-primary-light-2 px-16 py-8">옥수수전분</span>
                <span className="rounded-20 bg-primary-light-2 px-16 py-8">미결정셀룰로오스</span>
                <span className="rounded-20 bg-primary-light-2 px-16 py-8">
                  밀봉용기밀봉용기밀봉용
                </span>
              </div>
            </Section>
            <Section icon="📑" title="저장방법">
              <span className={`${TEXT_COLORS["8"]} text-14-regular-140`}>
                밀봉용기, 냉장(2~8℃)보관, 차광보관
              </span>
            </Section>
            <Section icon="🏥" title="효능﹒효과">
              <span className={`${TEXT_COLORS["8"]} text-14-regular-140`}>
                밀봉용기, 냉장(2~8℃)보관, 차광보관
              </span>
            </Section>
            <Section icon="🔖" title="용법﹒용량">
              <span className={`${TEXT_COLORS["8"]} text-14-regular-140`}>
                밀봉용기, 냉장(2~8℃)보관, 차광보관
              </span>
            </Section>
            <Section icon="🌡️" title="주의사항">
              <span className={`${TEXT_COLORS["8"]} text-14-regular-140`}>
                밀봉용기, 냉장(2~8℃)보관, 차광보관
              </span>
            </Section>
          </Root>
        </BottomSheet.Able>
        <BottomSheet.Bottom>
          <button
            className="h-56 w-full rounded-8 bg-primary-light-0 text-16-bold-140 text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            onClick={handleTogglePill}
          >
            내 서랍에 저장하기
          </button>
          <div className="pointer-events-none fixed bottom-66 left-0 right-0 mx-auto h-40 w-full max-w-[44rem] bg-gradient-to-b from-transparent to-white " />
        </BottomSheet.Bottom>
      </BottomSheet>
    </>
  );
}
