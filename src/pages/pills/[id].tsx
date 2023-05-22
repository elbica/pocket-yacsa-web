import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import type { PropsWithChildren } from "react";
import React from "react";

import { BottomSheet } from "@/component/common/BottomSheet";
import { Icon } from "@/component/common/Icon";
import { BackButton } from "@/component/common/Navigation";
import { useToast } from "@/component/common/Toast";
import type { MedicineRes } from "@/models";
import { TEXT_COLORS } from "@/styles";
import { api } from "@/util/axios";

const FAVORITE_ID = "효능﹒효과";

const Section = ({ title, children, icon }: PropsWithChildren<{ title: string; icon: string }>) => {
  return (
    <Item key={title} value={title}>
      <Header>
        <Trigger className="flex w-full items-center justify-between gap-8 rounded-full py-12 text-16-bold-140 [&>span>#chevronDown]:data-[state=open]:rotate-180">
          <span className="pr-4 text-18-bold-140">{icon}</span>
          <span className={`${TEXT_COLORS["9"]} flex-grow text-left text-18-bold-140`}>
            {title}
          </span>
          <span className="flex h-40 w-40 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-ui-dark-2">
            <Icon
              aria-hidden
              className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
              color="black"
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

const getMatchedText = (text: string) =>
  /<body>(?<data>(.|\n)*)<\/body>/g
    .exec(text)
    ?.groups?.data.replaceAll("<h1>사용상의주의사항</h1>", "") || text;

export default function Pill() {
  const { show } = useToast();
  const { query } = useRouter();
  const id = query.id as string;
  const queryClient = useQueryClient();
  const { data } = useQuery(["medicines", id], () => api.get<MedicineRes>(`/medicines/id/${id}`), {
    enabled: !!id,
  });
  const addMutation = useMutation((medicineId: number) =>
    api.post(`/favorites?medicineId=${medicineId}`),
  );
  const deleteMutation = useMutation((medicineId: number) =>
    api.delete(`/favorites?medicineId=${medicineId}`),
  );

  const handleTogglePill = () => {
    if (!data) return;
    if (data.favorite) {
      deleteMutation.mutate(data.id, {
        onSuccess: () => {
          queryClient.invalidateQueries(["favorites"]);
          queryClient.invalidateQueries(["detection-logs"]);

          queryClient.setQueryData<MedicineRes>(["medicines", id], (data) => {
            const newData = structuredClone(data);
            if (!newData || !data) return data;
            newData.favorite = !data?.favorite;
            return newData;
          });
          show("내 서랍에서 삭제하였습니다");
        },
      });
    } else {
      addMutation.mutate(data.id, {
        onSuccess: () => {
          queryClient.invalidateQueries(["favorites"]);
          queryClient.invalidateQueries(["detection-logs"]);

          queryClient.setQueryData<MedicineRes>(["medicines", id], (data) => {
            const newData = structuredClone(data);
            if (!newData || !data) return data;
            newData.favorite = !data?.favorite;
            return newData;
          });
          show("내 서랍에 저장하였습니다");
        },
      });
    }
  };
  if (!data) return null;
  return (
    <>
      <div className="relative h-[32vh]">
        <Image fill alt="알약사진" src={data.image} style={{ objectFit: "cover" }} />
      </div>

      <BackButton className="absolute left-24 top-24" />
      <BottomSheet>
        <BottomSheet.Able>
          <BottomSheet.Title company={data.company} type="전문의약품">
            {data.name}
          </BottomSheet.Title>
          {/*<BottomSheet.Description>{data.effect}</BottomSheet.Description>*/}

          <Root
            collapsible
            className="min-w-300 bottomSheet mt-32 w-full"
            defaultValue={FAVORITE_ID}
            type="single"
          >
            {data.effect && (
              <Section icon="🏥" title="효능﹒효과">
                <span
                  className={`${TEXT_COLORS["8"]} whitespace-pre-line text-14-regular-140`}
                  dangerouslySetInnerHTML={{
                    __html: getMatchedText(data.effect),
                  }}
                />
              </Section>
            )}
            <Section icon="💊" title="성분">
              <div className={`${TEXT_COLORS["8"]} flex flex-wrap gap-8 text-14-regular-140`}>
                {data.ingredient.map((ingre) => (
                  <span
                    className="rounded-20 bg-primary-light-2 px-16 py-8 dark:bg-ui-dark-3"
                    key={ingre}
                  >
                    {ingre}
                  </span>
                ))}
              </div>
            </Section>

            <Section icon="🔖" title="용법﹒용량">
              <span
                className={`${TEXT_COLORS["8"]} whitespace-pre-line text-14-regular-140`}
                dangerouslySetInnerHTML={{
                  __html: getMatchedText(data.usages),
                }}
              />
            </Section>
            <Section icon="🌡️" title="주의사항">
              <span
                className={`${TEXT_COLORS["8"]} whitespace-pre-line text-14-regular-140`}
                dangerouslySetInnerHTML={{
                  __html: getMatchedText(data.precautions),
                }}
              />
            </Section>
          </Root>
        </BottomSheet.Able>
        <BottomSheet.Bottom>
          <button
            className={`h-56 w-full rounded-8 ${
              !data.favorite ? "bg-primary-light-0 text-white" : "bg-[#eaf0ff] text-primary-light-0"
            } text-16-bold-140  shadow-[0_4px_12px_rgba(0,0,0,0.15)]`}
            onClick={handleTogglePill}
          >
            {!data.favorite ? "내 서랍에 추가하기" : "내 서랍에 추가완료!"}
          </button>
          <div className="pointer-events-none fixed bottom-66 left-0 right-0 mx-auto h-40 w-full max-w-[44rem] bg-gradient-to-b from-transparent to-white dark:to-ui-dark-1" />
        </BottomSheet.Bottom>
        <style global jsx>{`
          .bottomSheet {
            .title {
              font-weight: 600;
            }
            .indent0 {
              padding-left: 0.8rem;
            }
            .indent1 {
              padding-left: 1.6rem;
            }
            .indent2 {
              padding-left: 2.4rem;
            }
          }
        `}</style>
      </BottomSheet>
    </>
  );
}
