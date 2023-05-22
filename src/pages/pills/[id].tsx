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
const MOCK_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
<body>
<h1>사용상의주의사항</h1><p class="title">1. 경고</p>
<div><p class="indent0" >포도당 함유제제를 정맥주사하는 환자는 치아민(비타민 B<sub>1</sub>) 소모율이 높기 때문에 순간적으로 치명적인 치아민 결핍을 초래할 가능성이 있다.</p>
</div><p class="title">2. 다음 환자에는 투여하지 말 것.</p>
<div><p class="indent0" >1) 수분과다상태 환자</p>
<p class="indent0" >2) 저장성 탈수증 환자</p>
<p class="indent0" >3) 저칼륨혈증 환자</p>
<p class="indent0" >4) 고나트륨혈증 환자</p>
</div><p class="title">3. 다음 환자에는 신중히 투여할 것.</p>
<div><p class="indent0" >1) 신질환에서 기인한 신부전 환자</p>
<p class="indent0" >2) 심부전 환자</p>
<p class="indent0" >3) 고장성 탈수증 환자</p>
<p class="indent0" >4) 폐쇄성 요로질환에 의한 요량감소가 있는 환자</p>
<p class="indent0" >5) 당뇨병 환자</p>
<p class="indent0" >6) 고염소혈증 환자</p>
<p class="indent0" >7) 저나트륨혈증(120 mmol/L 미만) 환자</p>
</div><p class="title">4. 이상반응</p>
<div><p class="indent0" >1) 대량ㆍ급속투여에 의해 뇌부종, 폐부종, 말초부종, 산증, 수중독이 나타날 수 있다.</p>
<p class="indent0" >2) 신생아, 미숙아에 급속투여(시간당 100mL 이상)하는 경우 수중독이 나타날 수 있다.</p>
<p class="indent0" >3) 주입정맥에서 혈전증이 나타날 수 있다.</p>
</div><p class="title">5. 일반적 주의</p>
<div><p class="indent0" >혈당, 혈청 전해질, 체액 평형을 정기적으로 모니터링해야 한다.</p>
</div><p class="title">6. 임부, 수유부, 가임여성, 신생아, 유아, 소아, 고령자에 대한 투여</p>
<div><p class="indent0" >1) 이 의약품의 용기는 가소제로 Di-(2-EthylHexyl)Phthalate(DEHP)를 사용한 PVC 재질로서 DEHP는 어린 동물을 이용한 시험에서 수컷 생식기의 발달 및 정자형성에 영향을 미친다는 보고가 있습니다. 이러한 PVC 용기의 경우 DEHP가 극미량 용출될 수 있으나 DEHP에 노출되어 나타나는 위험성은 없거나 거의 없습니다. 따라서 이 의약품을 사용하지 않아서 발생할 수 있는 위험성은 DEHP에 의하여 우려되는 위험성보다 훨씬 크기 때문에 사용을 기피할 필요는 없습니다.(DEHP를 사용한 PVC재질의 용기에 한함)</p>
<p class="indent0" >2) 임신 중 투여에 대한 안전성이 확립되지 않았으므로 치료상의 유익성이 태아에 대한 잠재적 위해성을 상회한다고 판단되는 경우에만 투여한다.</p>
<p class="indent0" >3) 분만 중에 포도당을 함유한 용액을 정맥 투여할 경우, 산모에게 고혈당증을 초래할 수 있으며, 신생아의 반동저혈당증 뿐만 아니라, 태아의 고혈당증 및 대사성 산증을 일으킬 수 있다. 태아의 고혈당증은 태아의 인슐린 수치를 증가시킬 수 있으며, 이는 출산 후 신생아 저혈당증을 초래할 수 있다. 해당 약물을 투여하기 전에 환자에 대한 유익성과 위해성을 고려해야 한다.</p>
<p class="indent0" >4) 신생아(특히 조산아나 저체중아의 경우)는 저혈당증 또는 고혈당증의 위험이 높아진다. 그러므로 잠재적인 장기간 부작용을 피하기 위한 적절한 혈당 조절을 할 수 있도록 면밀한 모니터링이 필요하다. 신생아의 저혈당증은 발작, 혼수, 뇌손상을 초래할 수 있다. 고혈당증은 뇌실내출혈, 박테리아 및 곰팡이 감염의 후기발병, 미숙아의 망막병증, 괴사성작은창자큰창자염, 기관지폐이형성증, 입원기간의 연장 및 사망과 관련된다.</p>
<p class="indent0" >5) 유아 및 고령자에게는 급속 또는 장시간 투여해서는 안된다.</p>
<p class="indent0" >6) 고령자에 투여시 특히 중증 심부전 및 신부전 환자에게는 순환과부하를 피하기 위해 주의하여 투여하여야 한다.</p>
</div><p class="title">7. 과량투여시의 처치</p>
<div><p class="indent0" >이뇨제를 투여하여야 한다.</p>
</div><p class="title">8. 적용상의 주의</p>
<div><p class="indent0" >1) 투여전</p>
<p class="indent2" >(1) 투여전에 감염에 대한 처치를 한다(환자의 피부나 기구 소독).</p>
<p class="indent2" >(2) 한랭기에는 체온정도로 따뜻하게 하여 사용한다.</p>
<p class="indent2" >(3) 개봉 후 즉시 사용하고, 잔액은 사용하지 않는다.</p>
<p class="indent0" >2) 투여시</p>
<p class="indent2" >천천히 정맥주사한다.</p>
<p class="indent1" >3) 용기에 있는 공기로 인한 공기색전증의 가능성을 피하기 위하여 연속하여 연결해서는 안 된다.</p>
</div><p class="title">9. 보관 및 취급상의 주의사항</p>
<div><p class="indent0" >실온에서 보관한다.</p>
</div></body>
</html>`;

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
                <span className={`${TEXT_COLORS["8"]} text-14-regular-140`}>{data.effect}</span>
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
              <span className={`${TEXT_COLORS["8"]} whitespace-pre-line text-14-regular-140`}>
                {data.usages}
              </span>
            </Section>
            <Section icon="🌡️" title="주의사항">
              <span
                className={`${TEXT_COLORS["8"]} whitespace-pre-line text-14-regular-140`}
                dangerouslySetInnerHTML={{
                  __html:
                    /<body>(?<data>(.|\n)*)<\/body>/g
                      .exec(MOCK_HTML)
                      ?.groups?.data.replaceAll("<h1>사용상의주의사항</h1>", "") || "",
                }}
              ></span>
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
