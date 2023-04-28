import { BottomNavigation } from "@/component/common/Navigation";
import { Tab } from "@/component/common/Tab";

const FavoritePage = () => {
  return (
    <>
      <Tab>
        <Tab.Group>
          <Tab.Label>촬영기록</Tab.Label>
          <Tab.Label>내 서랍</Tab.Label>
        </Tab.Group>
        <Tab.Panel>
          <Tab.Content>
            <div>안녕하세요</div>
            <div>안녕하세요</div>
            <div>안녕하세요</div>
          </Tab.Content>
          <Tab.Content>world</Tab.Content>
        </Tab.Panel>
      </Tab>
      <BottomNavigation />
    </>
  );
};

export default FavoritePage;
