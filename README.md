# 📄 PDF 工具箱

一个运行在浏览器里的 PDF 处理工具，支持合并多个 PDF 文件、调整页面顺序。

**👉 在线使用：** `https://你的用户名.github.io/pdf-tool/`

## 功能

- **合并 PDF** — 上传多个 PDF，拖拽调整顺序，一键合并下载
- **调整页面顺序** — 上传单个 PDF，可视化预览每一页，拖拽重新排列，删除不需要的页，导出新 PDF
- 🔒 **完全本地处理** — 文件不上传到任何服务器，隐私安全
- 📱 **手机友好** — 支持触摸拖拽，适配移动端

## 部署到 GitHub Pages（5 分钟）

1. 在 GitHub 新建一个仓库，名称例如 `pdf-tool`
2. 把 `index.html` 上传到仓库根目录
3. 进入仓库 **Settings → Pages**
4. Source 选择 `Deploy from a branch`，Branch 选 `main`，目录选 `/（root）`
5. 点击 Save，稍等 1-2 分钟即可通过 `https://你的用户名.github.io/pdf-tool/` 访问

## 技术栈

- [pdf-lib](https://github.com/Hopding/pdf-lib) — PDF 合并与导出
- [PDF.js](https://mozilla.github.io/pdf.js/) — PDF 页面渲染预览
- 纯原生 HTML + CSS + JS，零依赖框架
