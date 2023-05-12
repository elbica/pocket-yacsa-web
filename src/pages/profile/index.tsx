import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Icon } from "@/component/common/Icon";
import { BottomNavigation } from "@/component/common/Navigation";
import Switch from "@/component/common/Switch";
import type { MyPageRes } from "@/models";
import { TEXT_COLORS } from "@/styles";
import { api } from "@/util/axios";

const ProfilePage = () => {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get<MyPageRes>("/my-page/info"),
  });

  const [defaultDarkMode, setDefaultDarkMode] = useState(false);

  const handleToggleDarkmode = () => {
    document.documentElement.classList.toggle("dark");
    document.documentElement.classList.contains("dark")
      ? localStorage.setItem("pocket-dark-mode", "true")
      : localStorage.setItem("pocket-dark-mode", "false");
  };

  useEffect(() => {
    if (localStorage.getItem("pocket-dark-mode") === "true") {
      document.documentElement.classList.add("dark");
      setDefaultDarkMode(true);
    }
  }, []);

  return (
    <>
      <div className="relative flex h-screen flex-col justify-around px-20 pb-80 pt-20">
        <img
          alt="백그라운드 이미지"
          className="absolute left-0 right-0 top-0 z-0 w-full"
          src="/picture/profile_background.png"
        />
        <section className="z-1 relative flex flex-col items-center">
          <div className="h-100 w-100 rounded-50 bg-primary-light-2" />
          <h1 className={`pt-16 text-22-medium-140 ${TEXT_COLORS[8]}`}>
            <b className={`font-bold ${TEXT_COLORS[9]}`}>{data?.memberName ?? "OOO"}님</b>{" "}
            안녕하세요!
          </h1>
          <div className="flex justify-center pt-24">
            <div className="flex w-[12rem] flex-col items-center gap-4 border-r border-[#eaebf1] pr-20 dark:border-ui-dark-3">
              <b className={`text-[3.2rem] font-bold leading-[4.4rem] ${TEXT_COLORS[9]}`}>
                {data?.detectionLogCount ?? "--"}
              </b>
              <span className={`${TEXT_COLORS[7]} text-16-regular-140`}>촬영기록</span>
            </div>
            <div className="flex w-[12rem] flex-col items-center gap-4 pl-20">
              <b className={`text-[3.2rem] font-bold leading-[4.4rem] ${TEXT_COLORS[9]}`}>
                {data?.favoriteCount ?? "--"}
              </b>
              <span className={`${TEXT_COLORS[7]} text-16-regular-140`}>내 서랍</span>
            </div>
          </div>
        </section>
        <ul className="rounded-8 bg-primary-light-3 px-16 py-8 dark:bg-ui-dark-2">
          <li className="flex h-56 w-full items-center justify-between border-b border-primary-light-2 px-4 py-8">
            <div className="flex items-center gap-8">
              <Icon name="moon" />
              <span className={`${TEXT_COLORS[7]} text-16-regular-140`}>다크모드</span>
            </div>
            <Switch
              defaultChecked={defaultDarkMode}
              key={defaultDarkMode + ""}
              onClick={handleToggleDarkmode}
            />
          </li>
          <li className="flex h-56 w-full items-center justify-between px-4 py-8">
            <div className="flex items-center gap-8">
              <Icon name="post" />
              <button>
                <span className={`${TEXT_COLORS[7]} text-16-regular-140`}>이용약관</span>
              </button>
            </div>
            <Icon name="rightArrow" />
          </li>
        </ul>
        <div className="ml-auto flex w-fit gap-12 px-8 py-10 text-14-regular-140">
          <button className={`${TEXT_COLORS[5]}`}>회원탈퇴</button>
          <button
            className={`${TEXT_COLORS[7]} underline`}
            onClick={() => {
              window.location.href = "https://pocketyacsa.shop/logout";
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default ProfilePage;
