import { View } from "@tarojs/components";
import { Cell, Image, Popup } from "@nutui/nutui-react-taro";
import { SpuDTO } from "../api/SpuController";
import "./goods-item-row.scss";
import Price from "./price";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { AddToCart } from "@nutui/icons-react-taro";

export default function GoodsItemRow({ goods, onClick, addToCart }: { goods: SpuDTO; onClick?: () => void; addToCart?: (skuId: string) => void }) {
  const [showBasic, setShowBasic] = useState(false);
  const handAddToCart = (e) => {
    e.stopPropagation();
    if (goods.type === "SINGLE") {
      if (addToCart) {
        console.log("addToCart");
        const skuId = goods.skus[0]!.skuId!;
        addToCart(skuId);
        Taro.showToast({
          title: "添加购物车成功",
          icon: "success",
          duration: 2000,
        });
      }
    } else if (goods.type === "MULTI") {
      console.log("setShowBasic");
      setShowBasic(true);
    }
  };
  const imgUrl = goods.imgUrlList[0];
  const price = goods.skus?.length > 0 ? Math.min(...goods.skus.map((sku) => sku.sellPrice || 0)) : 0;
  return (
    <View className="goodsItem" onClick={onClick}>
      <View className="left">
        <Image className="img" src={imgUrl} mode="aspectFill" width={"100%"} radius={"4px"} />
      </View>
      <View className="right">
        <View className={"title"}>{goods.name}</View>
        <Price price={price} unit={goods.weightFlag === "Y" ? goods.weightUnitName : goods.unitName} />
        <AddToCart color="#FF0F23" size={24} onClick={handAddToCart} />
        <Popup
          visible={showBasic}
          position="bottom"
          onClose={() => {
            setShowBasic(false);
          }}
        >
          <View style={{ height: "500px", overflowY: "scroll" }}>
            <Cell>
              <View>{goods.name}</View>
            </Cell>
          </View>
        </Popup>
      </View>
    </View>
  );
}
