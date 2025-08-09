import "./index.scss";
import Taro from "@tarojs/taro";
import type CustomTabBarComponent from "../../custom-tab-bar";


function Index() {
  Taro.useDidShow(() => {
    const pageObj = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBarComponent>(pageObj);
    tabbar?.setSelected(1);
  });

  // const [categoryList, setCategoryList] = useState<CategoryDTO[]>();
  // useEffect(() => {
  //   CategoryController.list().then((res) => {
  //     setCategoryList(res);
  //   });
  // }, []);

  // const [value, setValue] = useState<number | string>("0");
  // const list = Array.from(new Array(3).keys());
  return (
    <>
      {/*<SideBar*/}
      {/*  style={{ height: 300 }}*/}
      {/*  value={value}*/}
      {/*  onChange={(value) => {*/}
      {/*    setValue(value);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {list.map((item) => (*/}
      {/*    <SideBar.Item key={item} title={`Opt ${item + 1}`}>*/}
      {/*      {`Content ${item + 1}`}*/}
      {/*    </SideBar.Item>*/}
      {/*  ))}*/}
      {/*</SideBar>*/}
    </>
  );
}

export default Index;
