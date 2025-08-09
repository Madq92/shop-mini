import "./index.scss";
import Taro from "@tarojs/taro";
import type CustomTabBarComponent from "../../custom-tab-bar";
import { useEffect, useState } from "react";
import SpuController, { SpuDTO } from "../../api/SpuController";
import { View } from "@tarojs/components";
import GoodsItem from "../../components/goods-item";
import { Image, SearchBar, Swiper } from "@nutui/nutui-react-taro";

const list = [
  "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
  "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
  "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
  "https://storage.360buyimg.com/jdc-article/fristfabu.jpg",
];
function IndexPage() {
  Taro.useDidShow(() => {
    const pageObj = Taro.getCurrentInstance().page;
    const tabbar = Taro.getTabBar<CustomTabBarComponent>(pageObj);
    tabbar?.setSelected(0);
  });

  const [spuList, setSpuList] = useState<SpuDTO[]>();
  const [bannerList, setBannerList] = useState<string[]>([]);

  useEffect(() => {
    SpuController.list().then((res) => {
      setSpuList(res);
    });
    setBannerList(list);
  }, []);

  function navigateToGoodsDetail(spuId: string) {
    Taro.navigateTo({
      url: `/pages/goods-detail/index?spuId=${spuId}`,
    });
  }

  function navigateToGoodsSearce() {
    Taro.navigateTo({
      url: "/pages/goods-search/index",
    });
  }

  return (
    <>
      <SearchBar placeholder="商品名称" rightIn="搜索" onFocus={navigateToGoodsSearce} />
      <View className="banner">
        <Swiper defaultValue={0} indicator>
          {bannerList.map((item) => (
            <Swiper.Item key={item}>
              <Image src={item} height={"150px"} radius={"8px"}></Image>
            </Swiper.Item>
          ))}
        </Swiper>
      </View>
      <View className="goodsList">
        {spuList?.map((spu) => (
          <GoodsItem goods={spu} key={spu.spuId} onClick={() => navigateToGoodsDetail(spu.spuId)} />
        ))}
      </View>
    </>
  );
}

// @ts-ignore
export default IndexPage;
