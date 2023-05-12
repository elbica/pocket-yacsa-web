import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useRef } from "react";

import { Icon } from "@/component/common/Icon";
import { BottomNavigation } from "@/component/common/Navigation";
import type { MedicineRes } from "@/models";
import { TEXT_COLORS } from "@/styles";
import { api } from "@/util/axios";

const CameraPage = () => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation((data: FormData) => api.post<MedicineRes>("/detection", data), {
    onMutate: () => router.push("/camera/loading"),
    onSuccess: (data) => {
      queryClient.setQueryData([`/pills`, data?.id], data);
      router.replace(`/pills/${data?.id}`);
    },
    onError: () => router.replace("/camera/fail"),
  });
  const handleClickButton = () => {
    ref.current?.click();
  };
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = new FormData();
    file.append("image", e.target.files[0]);
    mutation.mutate(file);
  };

  return (
    <>
      <div className="flex flex-col px-20 " style={{ minHeight: "100dvh" }}>
        <h1 className={`mt-20 py-40 text-22-bold-140 ${TEXT_COLORS[9]}`}>
          알약을 찾을 수 없습니다. <br />
          다시 찍어주세요. 😥
        </h1>
        <input
          hidden
          accept="image/*"
          capture="environment"
          ref={ref}
          type="file"
          onChange={handleFileChange}
        />
        <button
          className="flex aspect-square w-full items-center justify-center rounded-8 border-2 border-dashed border-primary-light-0 bg-primary-light-3 dark:bg-ui-dark-2"
          style={{ maxHeight: "43dvh" }}
          onClick={handleClickButton}
        >
          <div className="flex w-fit flex-col items-center gap-2">
            <Icon color="primary" name="camera" />
            <span className={`text-12-regular-160 ${TEXT_COLORS[7]}`}>
              카메라로 사진을 찍어주세요
            </span>
          </div>
        </button>
        <button className="flex grow items-center py-24 pb-80 ">
          <label className="w-full rounded-8 bg-primary-light-2 py-17 text-center text-16-bold-140 text-primary-light-0 active:bg-primary-dark-1 ">
            갤러리에서 가져오기
            <input hidden type="file" onChange={handleFileChange} />
          </label>
        </button>
      </div>
      <BottomNavigation />
    </>
  );
};

export default CameraPage;
