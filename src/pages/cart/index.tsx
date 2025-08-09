import { View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import type CustomTabBarComponent from "../../custom-tab-bar";

function Index() {
  Taro.useDidShow(() => {
    const pageObj = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBarComponent>(pageObj);
    tabbar?.setSelected(2);
  });
  return (
    <>
      <View>Cart</View>
    </>
  );
}

export default Index;
