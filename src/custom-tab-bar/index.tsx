import { Component } from "react";
import Taro from "@tarojs/taro";

import "./index.scss";
import { Tabbar } from "@nutui/nutui-react-taro";
import { Cart, Category, Home, User } from "@nutui/icons-react-taro";

const tabPath = ["/pages/index/index", "/pages/category/index", "/pages/cart/index", "/pages/my/index"];
export default class CustomTabBarComponent extends Component {
  state = {
    selected: 0,
  };

  switchTab(index) {
    this.setSelected(index);
    const url = tabPath[index];
    Taro.switchTab({ url });
  }

  setSelected(idx: number) {
    this.setState({
      selected: idx,
    });
  }

  render() {
    return (
      <>
        <Tabbar className={"tabbar"} fixed value={this.state.selected} onSwitch={(index) => this.switchTab(index)}>
          <Tabbar.Item title="首页" icon={<Home />} />
          <Tabbar.Item title="分类" icon={<Category />} />
          <Tabbar.Item title="购物车" icon={<Cart />} />
          <Tabbar.Item title="我的" icon={<User />} />
        </Tabbar>
      </>
    );
  }
}
