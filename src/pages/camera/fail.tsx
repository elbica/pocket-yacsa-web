import { Icon } from "@/component/common/Icon";
import { BottomNavigation } from "@/component/common/Navigation";
import { TEXT_COLORS } from "@/styles";

const CameraPage = () => {
  return (
    <>
      <div className="flex h-screen flex-col px-20 ">
        <h1 className={`mt-20 py-40 text-22-bold-140 ${TEXT_COLORS[9]}`}>
          알약을 찾을 수 없습니다. <br />
          다시 찍어주세요. 😥
        </h1>
        <button className="flex aspect-square w-full items-center justify-center rounded-8 border-2 border-dashed border-primary-light-0 bg-primary-light-3 dark:bg-ui-dark-2">
          <div className="flex w-fit flex-col items-center gap-2">
            <Icon color="primary" name="camera" />
            <span className={`text-12-regular-160 ${TEXT_COLORS[6]}`}>
              카메라로 사진을 찍어주세요
            </span>
          </div>
        </button>
        <div className="flex grow items-center py-24 pb-80 ">
          <button className="w-full rounded-8 bg-primary-light-2 py-17 text-16-bold-140 text-primary-light-0 active:bg-primary-dark-1 ">
            갤러리에서 가져오기
          </button>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default CameraPage;
