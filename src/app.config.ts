export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/cart/index",
    "pages/my/index",
    "pages/category/index",
    "pages/order/index",
    "pages/order/detail/index",
    "pages/goods-detail/index",
    "pages/goods-search/index",
    "pages/settlement/index",
  ],

  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: true,
    color: "#000000",
    selectedColor: "#000000",
    backgroundColor: "#fff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/category/index",
        text: "分类",
      },
      {
        pagePath: "pages/cart/index",
        text: "购物车",
      },
      {
        pagePath: "pages/my/index",
        text: "我的",
      },
    ],
  },
});
