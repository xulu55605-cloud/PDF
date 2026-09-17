# 📄 PDF 工具箱 (PWA)

一个可安装的渐进式 Web 应用（PWA），运行在浏览器里，支持离线使用。

**👉 在线使用：** `https://你的用户名.github.io/pdf-tool/`

## 功能

- **合并 PDF** — 上传多个 PDF，拖拽调整顺序，一键合并下载
- **调整页面** — 可视化预览每页，拖拽排序、旋转、缩放（含填充满页面一键功能）
- 🔒 **完全本地处理** — 文件不上传任何服务器
- 📱 **可安装为 App** — 支持添加到 iOS/Android 主屏幕，离线可用

## 文件结构

```
pdf-tool/
├── index.html      # 主页面
├── manifest.json   # PWA 清单
├── sw.js           # Service Worker（离线缓存）
├── icon-192.png    # App 图标
└── icon-512.png    # App 图标（大）
```

## 部署到 GitHub Pages

1. 新建 GitHub 仓库（名称：`pdf-tool`，设为 Public）
2. 上传以上全部文件到仓库根目录
3. 进入 **Settings → Pages → Source** 选 `main` 分支，目录 `/（root）`，Save
4. 约 1-2 分钟后访问 `https://你的用户名.github.io/pdf-tool/`

> ⚠️ PWA 需要 **HTTPS** 才能启用 Service Worker，GitHub Pages 自动提供 HTTPS，无需额外配置。

## 安装为手机 App

### iPhone / iPad (Safari)
1. Safari 打开页面
2. 点击底部分享按钮 → **添加到主屏幕**

### Android (Chrome)
1. Chrome 打开页面
2. 页面顶部会出现"安装"横幅，点击即可
3. 或点击右上角菜单 → **添加到主屏幕**

## 技术栈

- [pdf-lib](https://github.com/Hopding/pdf-lib) — PDF 合并与导出
- [PDF.js](https://mozilla.github.io/pdf.js/) — PDF 页面渲染预览
- Service Worker — 离线缓存（Cache-First for CDN, Network-First for core）
- Web App Manifest — 可安装 PWA
