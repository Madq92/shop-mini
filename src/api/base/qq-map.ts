import { QQMapWX } from "./qqmap-wx-jssdk";

const qqmapInstance = new QQMapWX({
  key: QQ_MAP_KEY,
});

export default qqmapInstance;

//逆地址解析,通过经纬度获取位置等信息
// qqmapsdk.reverseGeocoder({
//     location: {latitude, longitude},
//     success: (res) => {
//         console.log("reverseGeocoder", res)
//         //获取当前城市
//         console.log(res.result.address_component.city);
//     },
//     fail: (res) => {
//         console.log("reverseGeocoder", res)
//     }
// })

export function reverseGeocoder(
  latitude: number,
  longitude: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    qqmapInstance.reverseGeocoder({
      location: { latitude, longitude },
      success: (res) => {
        console.log("reverseGeocoder", res);
        //获取当前城市
        resolve(res.result.address);
      },
      fail: (res) => {
        console.log("reverseGeocoder", res);
        reject(res);
      },
    });
  });
}
