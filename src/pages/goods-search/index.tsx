import "./index.scss";
import { Button, SearchBar } from "@nutui/nutui-react-taro";
import { useState } from "react";
import GoodsItem from "../../components/goods-item";
import { View } from "@tarojs/components";
import SpuController, { SpuDTO } from "../../api/SpuController";
import Taro from "@tarojs/taro";

function Index() {
  const [searchKey, setSearchKey] = useState<string>();
  const [spuList, setSpuList] = useState<SpuDTO[]>();
  function handleOnSearch() {
    SpuController.list().then((res) => {
      setSpuList(res);
    });
  }
  function navigateToGoodsDetail(spuId: string) {
    Taro.navigateTo({
      url: `/pages/goods-detail/index?spuId=${spuId}`,
    });
  }

  return (
    <View className={"goodsSearch"}>
      <SearchBar
        value={searchKey}
        placeholder="商品名称"
        rightIn={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button type="primary" size="mini" onClick={handleOnSearch}>
              搜索
            </Button>
          </div>
        }
        onChange={(val: string) => setSearchKey(val)}
      />
      <View className="goodsList">
        {spuList?.map((spu) => (
          <GoodsItem goods={spu} key={spu.spuId} onClick={() => navigateToGoodsDetail(spu.spuId)} />
        ))}
      </View>
    </View>
  );
}
// @ts-ignore
export default Index;
