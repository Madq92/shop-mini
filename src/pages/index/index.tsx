import "./index.scss";
import Taro from "@tarojs/taro";
import type CustomTabBarComponent from "../../custom-tab-bar";
import { useEffect, useState } from "react";
import  { SpuDTO } from "../../api/SpuController";
import { View } from "@tarojs/components";
import GoodsItem from "../../components/goods-item";
import { Image, SearchBar, Swiper } from "@nutui/nutui-react-taro";
import ShopController from "../../api/ShopController";

const defaultBanners = [
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

  const [spuList, setSpuList] = useState<SpuDTO[]>([]);
  const [bannerList, setBannerList] = useState<string[]>([]);
  const [notice, setNotice] = useState<string>();

  useEffect(() => {
    ShopController.goods().then((res) => {
      setSpuList(res.goods);
    });
    ShopController.branner().then((res) => {
      setBannerList(res.banners);
    });
    ShopController.notice().then((res) => {
      setNotice(res.notice)
    })
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

  const finaBannerList = bannerList && bannerList.length > 0 ? bannerList : defaultBanners;

  return (
    <>
      <SearchBar placeholder="商品名称" rightIn="搜索" onFocus={navigateToGoodsSearce} />
      <View className="banner">
        <Swiper defaultValue={0} indicator>
          {finaBannerList.map((item) => (
            <Swiper.Item key={item}>
              <Image src={item} height={"150px"} radius={"8px"}></Image>
            </Swiper.Item>
          ))}
        </Swiper>
      </View>
      {notice && <View className="notice">{notice}</View>}
      <View className="goodsList">
        {spuList && spuList.length > 0 ? (
          spuList.map((spu) => (
            <GoodsItem
              goods={spu}
              key={spu.spuId}
              onClick={() => navigateToGoodsDetail(spu.spuId)}
              addToCart={(skuId) => {
                console.log("add to cart:", skuId);
              }}
            />
          ))
        ) : (
          <View>暂无商品</View>
        )}
      </View>
    </>
  );
}

// @ts-ignore
export default IndexPage;
