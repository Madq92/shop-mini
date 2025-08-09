import Taro from "@tarojs/taro";

export interface WxLoginRequest {
  code: string;
}

export interface WxLoginResponse {
  /** 凭证值 */
  tokenValue?: string;
  /** 凭证名 */
  tokenName?: string;
}

namespace LoginController {
  export async function login(
    req: WxLoginRequest,
  ): Promise<WxLoginResponse | undefined> {
    const header = { "content-type": "application/json", source: "weapp" };
    const option = {
      isShowLoading: false,
      loadingText: "正在加载",
      url: BASE_URL_PREFIX + "c/login/wx",
      data: req,
      method: "POST",
      header: header,
    };

    const result = await Taro.request(option as Taro.request.Option).catch(
      (e) => {
        Taro.showToast({ icon: "error", title: "登录失败", duration: 3000 });
        console.error("登录失败", e);
      },
    );

    console.log("login res:", result);
    if (result && result.statusCode === 200) {
      return result.data.data;
    }
  }
}

export default LoginController;
