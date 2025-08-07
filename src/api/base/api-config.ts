import Taro from "@tarojs/taro";
import qs from "query-string";
import { TOKEN_KEY, TOKEN_VALUE } from "../../utils/constants";
import LoginApi from "../login-api";

const baseUrlPrefix = BASE_URL_PREFIX;
const env =
  process.env.NODE_ENV === "development" ? "development" : "production";
console.log("编译环境：", env, baseUrlPrefix);

export interface CommonResult<T> {
  data: T;
  success: boolean;
  errorCode: string;
  errorDesc: string;
}

export interface PageRequest {
  pageIndex?: number;
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
  totalSize?: number;
  pageIndex?: number;
  pageSize?: number;
  values?: T[];
}

const api = {
  baseUrl: baseUrlPrefix,

  changeBaseUrl(url: string) {
    this.baseUrl = url;
  },

  async baseOptions(params, method = "GET") {
    if (params.retries > 3) {
      console.error("重试3次未能成功");
      return;
    }
    if (params.retries) {
      console.info("重试次数", params.retries);
    }
    let { url, data } = params;
    const header = {};

    // header设置
    // -- 设置token
    const tokenKey = Taro.getStorageSync(TOKEN_KEY);
    const tokenValue = Taro.getStorageSync(TOKEN_VALUE);
    if (tokenKey && tokenValue) {
      header[tokenKey] = tokenValue;
    }

    // -- 设置contentType
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    header["content-type"] = contentType;

    // -- 设置source
    header["source"] = "weapp";

    const option = {
      isShowLoading: false,
      loadingText: "正在加载",
      url: this.baseUrl + url,
      data: data,
      method: method,
      header: header,
    };
    const result = await Taro.request(option as Taro.request.Option).catch(
      (err) => {
        console.error("Taro request error:", err);
        Taro.showToast({
          title: "请求服务器失败，请稍后重试!",
          duration: 3000,
          icon: "error",
        });
      }
    );
    if (!result) {
      return;
    }
    if (result.statusCode === 200) {
      return result.data.data;
    } else if (result.statusCode == 401) {
      // 清除Token
      Taro.removeStorageSync(TOKEN_KEY);
      Taro.removeStorageSync(TOKEN_VALUE);
      console.error("未登录，正在重新登录");

      // wxLogin
      const wxLoginRes = await Taro.login();
      console.log("wxLogin:", wxLoginRes);
      // appLogin
      const resData = await LoginApi.login({ code: wxLoginRes.code });
      console.log("appLogin", resData);
      if (resData) {
        Taro.setStorageSync(TOKEN_KEY, resData.tokenName);
        Taro.setStorageSync(TOKEN_VALUE, resData.tokenValue);

        // 重新发起请求
        params.retries = params.retries ? 1 : params.retries + 1;
        return await this.baseOptions(params, method);
      }
    } else if (result.statusCode == 403) {
      // 跳转手机登录页面
      Taro.navigateTo({ url: "/pages/login/index" });
    } else {
      console.error("Request error", result.data);
      Taro.showToast({
        title: result.data.errorMessage,
        duration: 3000,
        icon: "none",
      });
    }
  },

  get(url, data = {}) {
    let params;
    if (data && Object.keys(data).length > 0) {
      const query = qs.stringify(data);
      params = { url: url + "?" + query };
    } else {
      params = { url };
    }
    return this.baseOptions(params);
  },
  post(url, data = {}) {
    let params = { url, data };
    return this.baseOptions(params, "POST");
  },

  put(url, data) {
    let params = { url, data };
    return this.baseOptions(params, "PUT");
  },

  delete(url, data) {
    let params = { url, data };
    return this.baseOptions(params, "DELETE");
  },
};

export default api;
