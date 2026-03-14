# 快递管理系统

一个基于 React + TypeScript + Vite 的快递管理系统。

## 功能特性

- 📦 快递列表管理
- 🔍 扫码查询快递
- 📋 订单详情查看
- 🏷️ 多状态筛选（全部、未入库、已入库、未打包、未付款、未发货、已发货）

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (图标)

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 项目结构

```
src/
├── components/
│   ├── PackageList.tsx    # 快递列表页面
│   ├── OrderDetail.tsx    # 订单详情页面
│   └── Scanner.tsx        # 扫码页面
├── App.tsx                # 主应用组件
├── main.tsx              # 应用入口
└── index.css             # 全局样式
```
