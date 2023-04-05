import { useRouter } from "next/router";

import type { IconName } from "@/component/common/Icon";
import { Icon } from "@/component/common/Icon";
import { TEXT_COLORS } from "@/styles";
import { Z_INDEX } from "@/util/constant";

const BottomNavigation = () => {
  const router = useRouter();
  const handleCellClick = (name: string) => {
    router.push("/" + name);
  };

  const isActive = (name: string) => {
    return router.pathname.startsWith(`/${name}`);
  };

  return (
    <nav
      className={`flex ${Z_INDEX.navigation} fixed bottom-0 w-full max-w-[44rem] bg-white pt-12 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]`}
    >
      <BottomNavigationCell
        active={isActive("camera")}
        icon="camera"
        name="알약촬영"
        onClick={() => handleCellClick("camera")}
      />
      <BottomNavigationCell
        active={isActive("search")}
        icon="search"
        name="검색"
        onClick={() => handleCellClick("search")}
      />
      <BottomNavigationCell
        active={isActive("profile")}
        icon="profile"
        name="내정보"
        onClick={() => handleCellClick("profile")}
      />
    </nav>
  );
};

interface CellProps {
  icon: IconName;
  name: string;
  active?: boolean;
  onClick: () => void;
}
const BottomNavigationCell = ({ icon, name, active, onClick }: CellProps) => {
  return (
    <button
      className="flex grow flex-col items-center justify-center gap-4 pb-12 text-center"
      onClick={onClick}
    >
      <Icon color={active ? "primary" : undefined} name={icon} />
      <span className={`${active ? TEXT_COLORS.primary : TEXT_COLORS[6]} text-12-regular-160`}>
        {name}
      </span>
    </button>
  );
};

export default BottomNavigation;
