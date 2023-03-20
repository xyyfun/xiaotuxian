# vue-app

## 项目初始化

```
npm install
```

### 项目启动

```
npm run serve
```

### 项目打包

```
npm run build
```

## 项目介绍

### 项目介绍

- 电商发展十余年，是个成熟的模式，小兔鲜儿是B2C电商平台，综合品类平台。
- 平台理念：（品质）新鲜、（价格）亲民、（物流）快捷。

### 功能模块
- 首页组件
- 登录组件
- 注册组件
- 商品所有分类组件
  - 商品分类

- 商品详情组件
- 购物车组件
- 提交订单组件
- 支付组件
- 个人中心组件
  - 个人中心组件
  - 个人信息组件
  - 安全组件
  - 地址管理组件
  - 我的足迹组件
  - 我的订单组件
  - 我的收藏商品组件
  - 收藏的专题组件
  - 关注的品牌组件
- 下载手机应用组件

### 使用技术
- Vue2.0（选项式api开发）
- vue-cli（项目脚手架）
- axios（项目请求工具）
- vue-router（单页面路由）
- vuex（状态管理）
- 算法库[Power Set](https://github.com/zhousg/javascript-algorithms/tree/master/src/algorithms/sets/power-set)
- vue-lazyload（图片懒加载）
- lodash（工具库）
- less（预编译器）
- element-ui（第三方组件）

### 封装的组件

- 面包屑组件
- 分页组件
- 城市选择组件
- 弹出框组件
- 模块头部组件
- 骨架屏组件

### 函数封装
- 表单验证
- 读取/存储用户数据
- IntersectionObserver 校验元素是否进入可视区域
- request 二次封装 axios

### 项目难点

- 商品详情规格（sku&spu）
1. 使用第三方算法库[Power Set](https://github.com/zhousg/javascript-algorithms/tree/master/src/algorithms/sets/power-set)将获取的数据封装成带有所有商品规格的路径字典。
2. 点击商品规格，发送规格id，根据id在路径字典中进行查找，在字典中可点击，不在字典中则禁用
