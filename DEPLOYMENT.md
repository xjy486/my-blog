# 博客部署指南

## 项目概述

这是一个基于 Next.js 15 构建的现代博客系统，具备以下特性：

### 🚀 主要功能
- **Markdown 支持**: 使用 Markdown 格式编写博客文章
- **静态站点生成**: 完全静态化，适合 GitHub Pages 托管
- **响应式设计**: 支持桌面端和移动端
- **深色模式**: 支持亮色/暗色主题切换
- **文章搜索**: 基于标题、摘要和标签的全文搜索
- **标签分类**: 支持文章标签分类和标签页面
- **阅读时间**: 自动计算文章阅读时间
- **SEO 优化**: 完整的元数据和 SEO 配置

### 🛠 技术栈
- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **内容**: Markdown + Gray Matter
- **图标**: Lucide React
- **部署**: GitHub Pages + GitHub Actions

## 部署到 GitHub Pages

### 第一步：创建 GitHub 仓库

1. 登录你的 GitHub 账号
2. 创建一个新的仓库（建议命名为 `my-blog` 或其他你喜欢的名称）
3. 不要初始化 README、.gitignore 或 LICENSE（我们已经有了）

### 第二步：连接本地仓库到 GitHub

在项目根目录运行以下命令（将 `YOUR_USERNAME` 和 `YOUR_REPO_NAME` 替换为你的 GitHub 用户名和仓库名）：

\`\`\`bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
\`\`\`

### 第三步：启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 "Settings" 标签
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分选择 "GitHub Actions"
5. 保存设置

### 第四步：触发自动部署

推送代码到 `main` 分支后，GitHub Actions 会自动运行部署流程：

1. 自动安装依赖
2. 构建静态网站
3. 部署到 GitHub Pages

部署完成后，你的博客将在以下地址可访问：
\`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME\`

## 添加新文章

### 创建文章文件

在 \`posts/\` 目录下创建新的 \`.md\` 文件，文件名将作为文章的 URL 路径。

### 文章格式

每篇文章都需要包含 frontmatter 元数据：

\`\`\`markdown
---
title: "文章标题"
date: "2024-01-20"
excerpt: "文章摘要描述"
tags: ["标签1", "标签2"]
author: "作者名称"
coverImage: "/images/cover.jpg"  # 可选
---

# 文章内容

这里是你的文章内容，支持完整的 Markdown 语法。

## 二级标题

- 列表项 1
- 列表项 2

\`\`\`

### 推送更新

添加新文章后，运行以下命令推送到 GitHub：

\`\`\`bash
git add .
git commit -m "Add new post: 文章标题"
git push
\`\`\`

GitHub Actions 会自动重新构建和部署你的博客。

## 自定义配置

### 修改网站信息

编辑 \`src/app/layout.tsx\` 文件中的元数据：

\`\`\`typescript
export const metadata: Metadata = {
  title: '你的博客标题',
  description: '你的博客描述',
  // ... 其他配置
}
\`\`\`

### 修改导航

编辑 \`src/components/header.tsx\` 文件修改导航栏。

### 修改主页内容

编辑 \`src/app/page.tsx\` 文件修改主页布局和内容。

## 本地开发

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 开发模式

\`\`\`bash
npm run dev
\`\`\`

访问 \`http://localhost:3000\` 查看网站。

### 构建预览

\`\`\`bash
npm run build
npm run start
\`\`\`

## 故障排除

### 构建失败
- 检查 Markdown 文件的 frontmatter 格式是否正确
- 确保所有必需的字段都已填写
- 查看 GitHub Actions 的构建日志

### 图片显示问题
- 将图片放在 \`public/images/\` 目录下
- 在 Markdown 中使用相对路径：\`/images/image.jpg\`

### 样式问题
- 确保 Tailwind CSS 类名正确
- 检查是否有 CSS 文件冲突

## 进一步定制

### 添加评论系统
可以集成 GitHub Discussions、Disqus 或 Giscus 等评论系统。

### 添加分析
可以集成 Google Analytics 或其他网站分析工具。

### 自定义主题
修改 Tailwind 配置文件和 CSS 变量来定制主题颜色。

---

🎉 现在你拥有了一个功能完整的博客系统！开始创作你的第一篇文章吧！
