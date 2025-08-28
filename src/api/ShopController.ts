
import BaseController from "./BaseController";
import { SpuDTO } from "./SpuController";

export default class ShopController extends BaseController {
  /**
   * 首页banner
   */
  static async branner(): Promise<ShopIndexBannerResp> {
    return await super.GET<ShopIndexBannerResp>("/mini/shop/index/branner");
  }

  /**
   * 首页公告
   */
  static async notice(): Promise<ShopIndexNoticeResp> {
    return await super.GET<ShopIndexNoticeResp>("/mini/shop/index/notice");
  }

  /**
   * 首页商品列表
   */
  static async goods(): Promise<ShopIndexGoodsResp> {
    return await super.GET<ShopIndexGoodsResp>("/mini/shop/index/goods");
  }
}

export type ShopIndexBannerResp = {
  banners: string[];
};

export type ShopIndexNoticeResp = {
  notice: string;
};

export type ShopIndexGoodsResp = {
  goods: SpuDTO[];
};

