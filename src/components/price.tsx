import { View,Text } from "@tarojs/components";

import "./price.scss";

export default function Price({ price ,unit}: { price?: number , unit? : string}) {
  // 将分的价格转换为元，保留两位小数
  const formattedPrice = price !== undefined ? (price / 100).toFixed(2) : '0.00';

  return (
    <View className="price">
      <Text className="symbol">¥</Text>
      <Text className="decimal">{formattedPrice}</Text>
      {unit && <Text className="unit"> / {unit}</Text>}
    </View>
  );
}
