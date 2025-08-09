import { View } from "@tarojs/components";
import "./index.scss";
import { Button } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";

function Index() {
  function navigateToOrderDetail() {
    Taro.navigateTo({
      url: "/pages/order/detail/index",
    });
  }
  return (
    <>
      <View>Order</View>
      <View>
        <Button onClick={navigateToOrderDetail}>订单详情</Button>
      </View>
    </>
  );
}

export default Index;
