import { View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import type CustomTabBarComponent from "../../custom-tab-bar";
import { Button } from "@nutui/nutui-react-taro";

function Index() {
  Taro.useDidShow(() => {
    const pageObj = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBarComponent>(pageObj);
    tabbar?.setSelected(3);
  });

  function navigateToOrder() {
    Taro.navigateTo({
      url: "/pages/order/index",
    });
  }
  return (
    <>
      <View>My</View>
      <View>
        <Button onClick={navigateToOrder}>订单</Button>
      </View>
    </>
  );
}

export default Index;
