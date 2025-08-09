import { View } from "@tarojs/components";
import "./index.scss";
import { Button } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";

function Index() {
  function navigateToOrderDetail() {
    Taro.showToast({
      title: "下单成功",
      duration: 3000,
      icon: "success",
    });
  }
  return (
    <>
      <View>Settlement</View>
      <View>
        <Button onClick={navigateToOrderDetail}>下单</Button>
      </View>
    </>
  );
}

export default Index;
