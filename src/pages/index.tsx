import Image from "next/image";

import { Icon } from "@/component/common/Icon";

export default function Home() {
  return (
    <>
      <div className="relative z-10 flex h-screen flex-col items-center justify-around px-20  py-80">
        <Image alt="알약이미지" height={277} src="/picture/3d_logo.png" width={305} />
        <div className="flex flex-col gap-20 pb-20">
          <h1 className="text-center text-28-bold-140 text-white">
            알약을 3초만에 <br />
            찾아보세요
          </h1>
          <span className="text-center text-20-medium-140 text-white">
            건강한 약 복용을 위해 <br />
            포켓약사가 도와드릴게요
          </span>
        </div>

        <button
          className="flex h-56 w-full items-center justify-center gap-8 rounded-8 bg-white px-14 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          onClick={() => {
            window.location.href = "https://pocketyacsa.shop/oauth2/login/google";
          }}
        >
          <Icon name="google" />
          <span className="text-16-bold-140 text-ui-dark-1 ">Google로 시작하기</span>
        </button>
      </div>
      <Image
        fill
        alt="background_gradation"
        src="/picture/landing.png"
        style={{ objectFit: "cover" }}
      />
    </>
  );
}
