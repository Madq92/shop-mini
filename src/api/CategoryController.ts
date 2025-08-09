import BaseController from "./BaseController";


export default class CategoryController extends BaseController {
  static list(req?: CategoryQueryReq) {
    return super.GET<CategoryDTO[]>("/mini/category", req);
  }

}
export type CategoryQueryReq = {
  parentId: string;
  name: string;
};

/**
 * 分类数据传输对象
 */
export type CategoryDTO = {
  /**
   * 参数主键
   */
  categoryId: string;

  /**
   * 参数名称
   */
  parentId: string;

  /**
   * 参数键名
   */
  name: string;

  /**
   * 参数键值
   */
  sort: number;
};
