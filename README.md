# 我的博客

这是一个基于 Next.js 15 构建的现代化博客系统，支持 Markdown 文章、搜索功能、标签系统和深色/浅色主题切换。

## ✨ 特性

- 🌓 **深色/浅色主题切换** - 支持系统主题自动切换
- 🔍 **全文搜索** - 搜索文章标题、内容和标签
- 🏷️ **标签系统** - 完善的文章分类和标签管理
- 📱 **响应式设计** - 完美适配桌面端、平板和移动设备
- ⚡ **静态站点生成** - 基于 Next.js SSG，加载速度极快
- 📝 **Markdown 支持** - 使用 Markdown 编写文章，支持代码高亮
- 🎨 **现代化设计** - 使用 Tailwind CSS 构建的美观界面
- 🚀 **GitHub Pages 部署** - 一键部署到 GitHub Pages

## 🛠️ 技术栈

- **框架**: [Next.js 15](https://nextjs.org/) - React 全栈框架
- **语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **图标**: [Lucide React](https://lucide.dev/) - 美观的图标库
- **Markdown**: [gray-matter](https://github.com/jonschlinkert/gray-matter) + [remark](https://remark.js.org/) - Markdown 处理
- **日期**: [date-fns](https://date-fns.org/) - 现代化的日期工具库

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看项目。

### 构建生产版本

```bash
npm run build
```

### 导出静态文件

```bash
npm run build
```

生成的静态文件将在 `out` 目录中。

## 📝 添加文章

1. 在 `posts` 目录下创建新的 `.md` 文件
2. 添加 frontmatter 信息：

```markdown
---
title: "文章标题"
date: "2024-01-01"
excerpt: "文章摘要"
tags: ["标签1", "标签2"]
author: "作者名"
coverImage: "/images/cover.jpg" # 可选
---

# 文章内容

这里是文章的正文内容...
```

## 🌐 部署到 GitHub Pages

### 1. 配置仓库

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 "GitHub Actions" 作为源

### 2. 配置路径（如果需要）

如果您的仓库不是 `username.github.io`，请在 `next.config.ts` 中取消注释并修改以下行：

```typescript
basePath: '/your-repo-name',
assetPrefix: '/your-repo-name/',
```

### 3. 自动部署

每次推送到 `main` 分支时，GitHub Actions 会自动构建和部署您的博客。

## 📁 项目结构

```
blog_project/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # GitHub Actions 部署配置
│   └── copilot-instructions.md # Copilot 指令文件
├── posts/                      # Markdown 文章目录
│   ├── welcome-to-my-blog.md
│   ├── nextjs-blog-guide.md
│   └── typescript-best-practices.md
├── public/                     # 静态资源
│   └── .nojekyll              # 告诉 GitHub Pages 不使用 Jekyll
├── src/
│   ├── app/                   # Next.js App Router 页面
│   │   ├── posts/[slug]/      # 文章详情页
│   │   ├── tags/              # 标签相关页面
│   │   ├── search/            # 搜索页面
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   └── globals.css        # 全局样式
│   ├── components/            # React 组件
│   │   ├── header.tsx         # 页面头部
│   │   ├── footer.tsx         # 页面脚部
│   │   └── post-card.tsx      # 文章卡片
│   ├── lib/                   # 工具函数
│   │   ├── blog.ts            # 博客相关函数
│   │   └── theme-provider.tsx # 主题上下文
│   └── types/                 # TypeScript 类型定义
│       └── blog.ts            # 博客类型
├── next.config.ts             # Next.js 配置
├── package.json               # 项目依赖
└── README.md                  # 项目说明
```

## 🎨 自定义

### 修改主题色彩

在 `src/app/globals.css` 中修改 CSS 变量或 Tailwind 类名。

### 添加新功能

1. 在 `src/components/` 中创建新组件
2. 在 `src/lib/` 中添加工具函数
3. 在 `src/app/` 中添加新页面

### 修改布局

编辑 `src/app/layout.tsx` 和相关组件文件。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

- GitHub: [您的GitHub用户名](https://github.com/yourusername)
- 邮箱: your.email@example.com

---

⭐ 如果这个项目对您有帮助，请给它一个 Star！
