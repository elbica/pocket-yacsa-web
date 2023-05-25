import { Icon } from "@/component/common/Icon";
import { BottomNavigation } from "@/component/common/Navigation";
import { TEXT_COLORS } from "@/styles";

const CameraPage = () => {
  return (
    <>
      <button
        aria-label="뒤로가기"
        className="fixed flex h-60 w-60 items-center justify-center pl-16 pt-20"
      >
        <Icon name="back" />
      </button>
      <div className="flex flex-col place-content-center pb-80" style={{ height: "100dvh" }}>
        <div className="flex flex-col items-center justify-center">
          <Icon height={120} name="logo" width={120} />
          <h1 className={`pt-40 text-22-bold-140 ${TEXT_COLORS[9]}`}>알약을 찾고 있어요</h1>
          <span className={`pt-12 text-14-medium-140 ${TEXT_COLORS[6]}`}>
            조금만 기다려 주세요!
          </span>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default CameraPage;
