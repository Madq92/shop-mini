import BaseController from "./BaseController";

export default class SpuController extends BaseController {
  /**
   * 商品分页查询
   */
  static list() {
    return super.GET<SpuDTO[]>("/mini/spu");
  }

  /**
   * 商品详情
   */
  static detail(spuId: string) {
    return super.GET<SpuDTO>(`/mini/spu/${spuId}`);
  }
}

export enum SpuTypeEnum {
  SINGLE = "SINGLE",
  MULTI = "MULTI",
}

export enum ProdStatusEnum {
  ENABLE = "ENABLE",
  DISABLE = "DISABLE",
}

export type SkuDTO = {
  skuId?: string;
  spuId?: string;
  code?: string;
  sellPrice?: number;
  sellPrice1?: number;
  sellPrice2?: number;
  sellPrice3?: number;
  imgUrl?: string;
  weightFlag?: string;
  defaultWeight?: number;
  status?: string;
  specs?: DictDTO[];
};

export type SpuDTO = {
  spuId: string;
  name: string;
  code: string;
  type: string;
  unitId: string;
  unitName: string;
  weightUnitId: string;
  weightUnitName: string;
  categoryId: string;
  categoryName: string;
  parentCategoryId: string;
  parentCategoryName: string;
  weightFlag: string;
  imgUrlList: string[];
  spuDesc: string;
  sort: number;
  status: string;
  skus: SkuDTO[];
  props: DictDTO[];
};

export enum DictType {
  UNIT = "单位",
  SPEC = "规格",
  LABEL = "标签",
}

// 数据传输对象

/**
 * 字典组数据传输对象
 */
export type DictGroupDTO = {
  /**
   * 字典组ID
   */
  dictGroupId: string;

  /**
   * 字典组名称
   */
  name: string;

  /**
   * 字典类型
   */
  type?: string;

  /**
   * 子字典列表
   */
  dictDetails: DictDTO[];
};

/**
 * 字典数据传输对象
 */
export type DictDTO = {
  /**
   * 字典ID
   */
  dictId: string;

  /**
   * 字典组ID
   */
  dictGroupId: string;

  /**
   * 字典名称
   */
  name: string;

  /**
   * 字典类型
   */
  type: string;

  checked?: boolean;
};
