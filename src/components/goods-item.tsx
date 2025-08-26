import { View } from "@tarojs/components";
import { Cell, Image, Popup } from "@nutui/nutui-react-taro";
import SpuController, { SpuDTO } from "../api/SpuController";
import "./goods-item.scss";
import Price from "./price";
import { AddToCart } from "@nutui/icons-react-taro";
import { useState } from "react";
import Taro from "@tarojs/taro";

export default function GoodsItem({ goods, onClick, addToCart }: { goods: SpuDTO; onClick?: () => void; addToCart?: (skuId: string) => void }) {
  const [showBasic, setShowBasic] = useState(false);
  const [newGoods, setNewGoods] = useState<SpuDTO>(goods);
  const handAddToCart = async (e) => {
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
      const newGoods = await SpuController.detail(goods.spuId);
      setNewGoods(newGoods);
      setShowBasic(true);
    }
  };

  const imgUrl = goods.imgUrlList[0];
  const price = goods.skus?.length > 0 ? Math.min(...goods.skus.map((sku) => sku.sellPrice || 0)) : 0;

  return (
    <View className="goodsItem" onClick={onClick}>
      <Image className="img" src={imgUrl} mode="aspectFill" width={"100%"} height={"150px"} radius={"4px"} />
      <View className={"title"}>{goods.name}</View>
      <View className={"desc"}>
        <Price price={price} unit={goods.weightFlag === "Y" ? goods.weightUnitName : goods.unitName} />
        <AddToCart color="#FF0F23" size={24} onClick={handAddToCart} />
      </View>
      <Popup
        visible={showBasic}
        position="bottom"
        onClose={() => {
          setShowBasic(false);
        }}
      >
        <View style={{ height: "500px", overflowY: "scroll" }}>
          <Cell>
            <View>{newGoods.name}</View>
          </Cell>
          {newGoods.skus.map((sku) => (
            <Cell>
              <View key={sku.skuId}>{sku.skuId}</View>
            </Cell>
          ))}
        </View>
      </Popup>
    </View>
  );
}
