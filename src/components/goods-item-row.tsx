import { View } from "@tarojs/components";
import { Image } from "@nutui/nutui-react-taro";
import { SpuDTO } from "../api/SpuController";
import "./goods-item-row.scss";
import Price from "./price";

export default function GoodsItemRow({ goods ,onClick}: { goods: SpuDTO ,onClick?: () => void  }) {
  const imgUrl = goods.imgUrlList[0];

  const price = goods.skus?.length > 0
    ? Math.min(...goods.skus.map(sku => sku.sellPrice || 0))
    : 0;

  return (
    <View className="goodsItem" onClick={onClick}>
      <View className="left">
        <Image className="img" src={imgUrl} mode="aspectFill" width={"100%"} radius={"4px"} />
      </View>
      <View className="right">
        <View className={"title"}>{goods.name}</View>
        <Price price={price} unit={goods.weightFlag === "Y" ? goods.weightUnitName :goods.unitName}/>
      </View>
    </View>
  );
}
