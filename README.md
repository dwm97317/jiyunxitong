# 集运中心 App - React 组件库

使用 Stitch Loop 技能将 UI 截图转换为 React 组件。

## 项目结构

```
├── DESIGN.md           # 设计系统文档
├── SITE.md             # 站点愿景和路线图
├── next-prompt.md      # 接力棒文件（当前任务）
├── stitch.json         # Stitch 项目配置
├── queue/              # Stitch 生成的临时文件
│   ├── *.html
│   └── *.png
└── site/
    └── src/
        └── components/ # React 组件
            └── *.jsx
```

## 已完成组件

- [x] HomePersonal.jsx - 首页-个人件

## 使用方法

1. 查看 `next-prompt.md` 了解下一个要生成的页面
2. 运行 stitch-loop 循环生成下一个组件
3. 组件会自动保存到 `site/src/components/`

## 技术栈

- React
- Tailwind CSS
- Google Material Symbols Icons
