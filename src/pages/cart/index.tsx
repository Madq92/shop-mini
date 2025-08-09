import { View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import type CustomTabBarComponent from "../../custom-tab-bar";
import { Button } from "@nutui/nutui-react-taro";

function Index() {
  Taro.useDidShow(() => {
    const pageObj = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBarComponent>(pageObj);
    tabbar?.setSelected(2);
  });

  function navigateToSettlement() {
    Taro.navigateTo({
      url: "/pages/settlement/index",
    });
  }
  return (
    <>
      <View>Cart</View>
      <View>
        <Button onClick={navigateToSettlement}>结算</Button>
      </View>
    </>
  );
}

export default Index;
