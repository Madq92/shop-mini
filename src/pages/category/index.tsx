import "./index.scss";
import Taro from "@tarojs/taro";
import type CustomTabBarComponent from "../../custom-tab-bar";
import { useEffect, useMemo, useState } from "react";
import { SideBar } from "@nutui/nutui-react-taro";
import CategoryController, { CategoryDTO } from "../../api/CategoryController";
import SpuController, { SpuDTO } from "../../api/SpuController";
import { View } from "@tarojs/components";
import GoodsItemRow from "../../components/goods-item-row";

function Index() {
  Taro.useDidShow(() => {
    const pageObj = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBarComponent>(pageObj);
    tabbar?.setSelected(1);
  });

  const [categoryList, setCategoryList] = useState<CategoryDTO[]>([]);
  const [spuList, setSpuList] = useState<SpuDTO[]>();

  useEffect(() => {
    CategoryController.list().then((res) => {
      setCategoryList(res);
    });
    SpuController.list().then((res) => {
      setSpuList(res);
    });
  }, []);

  // 按 categoryId 分组并按 sort 排序
  const groupedSpu = useMemo(() => {
    if (!spuList) return {};

    // 先按 sort 排序
    const sortedSpuList = [...spuList].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

    // 按 categoryId 分组
    const grouped: Record<string, SpuDTO[]> = {};
    sortedSpuList.forEach((spu) => {
      const categoryId = spu.categoryId;
      if (!grouped[categoryId]) {
        grouped[categoryId] = [];
      }
      grouped[categoryId].push(spu);
    });

    return grouped;
  }, [spuList]);

  const [value, setValue] = useState<string>();

  function navigateToGoodsDetail(spuId: string) {
    Taro.navigateTo({
      url: `/pages/goods-detail/index?spuId=${spuId}`,
    });
  }

  return (
    <>
      <SideBar
        value={value}
        onChange={(value) => {
          setValue(String(value));
        }}
      >
        {categoryList?.map((item) => (
          <SideBar.Item key={item.categoryId} title={item.name}>
            <View className={"goodsList"}>
              {groupedSpu && groupedSpu[item.categoryId]?.map((spu) => <GoodsItemRow goods={spu} key={spu.spuId} onClick={() => navigateToGoodsDetail(spu.spuId)} />)}
            </View>
            {/*<Price price={123} size={"normal"} />*/}
          </SideBar.Item>
        ))}
      </SideBar>
    </>
  );
}

export default Index;
