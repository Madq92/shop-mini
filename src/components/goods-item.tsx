import { View } from "@tarojs/components";
import { Image, Price } from "@nutui/nutui-react-taro";
import { SpuDTO } from "../api/SpuController";
import "./goods-item.scss";

export default function GoodsItem({ goods }: { goods: SpuDTO }) {
  return (
    <View className="goodsItem">
      <Image className="img" src={goods.imgUrlList[0]} mode="aspectFill" width={"100%"} height={"150px"} radius={"4px"} />
      <View className={"title"}>{goods.name}</View>
      <Price price={goods.skus[0].sellPrice} size={"normal"}/>
    </View>
  );
}
