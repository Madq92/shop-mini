import qs from "query-string";
import api from "./base/api-config";

export default class BaseController {
  static GET<D>(url, data?): Promise<D> {
    let params;
    if (data && Object.keys(data).length > 0) {
      const query = qs.stringify(data);
      params = { url: url + "?" + query };
    } else {
      params = { url };
    }
    return api.baseRequest(params, "GET");
  }
  static POST<D>(url, data?): Promise<D> {
    let params = { url, data };
    return api.baseRequest(params, "POST");
  }

  static PUT<D>(url, data?): Promise<D> {
    let params = { url, data };
    return api.baseRequest(params, "PUT");
  }

  static DELETE<D>(url, data?): Promise<D> {
    let params = { url, data };
    return api.baseRequest(params, "DELETE");
  }
}

export interface CommonResult<T> {
  data: T;
  success: boolean;
  errorCode: string;
  errorDesc: string;
}

export interface PageReq {
  pageNum?: number;
  pageSize?: number;
  orderRules?: (
    | "ID_ASC"
    | "ID_DESC"
    | "SORT_ASC"
    | "SORT_DESC"
    | "SERVER_CREATE_TIME_ASC"
    | "SERVER_CREATE_TIME_DESC"
    | "SERVER_UPDATE_TIME_DESC"
    | "SERVER_UPDATE_TIME_ASC"
    | "LAST_LOGIN_TIME_ASC"
    )[];
}

export interface PageList<T> {
  total?: number;
  current?: number;
  size?: number;
  records?: T[];
}
