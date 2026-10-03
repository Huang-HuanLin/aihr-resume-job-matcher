# 腾讯 AIHR — AI 求职智能匹配智能体

> 基于 AI 技术的智能求职辅助平台，帮助学生快速匹配合适岗位，并提供简历优化建议，提升简历初筛通过率。

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 目录

- [项目背景](#-项目背景)
- [核心功能](#-核心功能)
- [技术栈](#-技术栈)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [使用说明](#-使用说明)
- [核心算法](#-核心算法)
- [部署到 GitHub](#-部署到-github)
- [许可证](#-许可证)

---

## 🎯 项目背景

学生在求职场景中面临两大核心痛点：

1. **岗位搜寻成本高**：在海量岗位中，搜寻与自己背景、能力专长、职业兴趣匹配度高的工作机会需要花费大量时间。
2. **简历匹配度不明确**：明确感兴趣的岗位后，不确定自己的简历与岗位的匹配度，也不知道简历需要做哪些优化，才能提升通过简历初筛的命中率。

**腾讯 AIHR** 应运而生，通过 AI 智能匹配算法，帮助学生：
- 精准推荐高匹配度岗位
- 深度诊断简历与岗位的匹配度
- 提供具体可行的简历优化建议

---

## ✨ 核心功能

### 1. 智能岗位匹配
- 上传/选择简历，系统自动解析关键信息
- 基于技能、经验、学历、地点四维度进行匹配计算
- 按匹配度从高到低排序展示岗位列表
- 支持按行业、地点、薪资等条件筛选

### 2. 简历诊断分析
- 选择目标岗位，AI 分析简历与岗位的匹配度
- 可视化展示总体匹配度分数
- 雷达图展示各维度匹配情况
- 技能匹配详情：已具备技能 vs 待提升技能

### 3. 优化建议生成
- 针对简历薄弱环节提供具体优化建议
- 建议按优先级分类（高 / 中 / 低）
- 覆盖技能、经验、学历、项目、通用等多维度

---

## 🛠️ 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 前端框架 | React | 18.x |
| 语言 | TypeScript | 5.x |
| 构建工具 | Vite | 6.x |
| 样式方案 | Tailwind CSS | 3.x |
| 路由管理 | React Router | 7.x |
| 状态管理 | Zustand | 5.x |
| 动画库 | Framer Motion | 11.x |
| 图表库 | Recharts | 2.x |
| 图标库 | Lucide React | 0.511 |

---

## 📁 项目结构

```
ai-hr/
├── public/
│   └── favicon.svg              # 网站图标
├── src/
│   ├── assets/                  # 静态资源
│   ├── components/              # 可复用组件
│   │   └── layout/
│   │       ├── Header.tsx       # 顶部导航栏
│   │       └── Footer.tsx       # 底部信息栏
│   ├── data/                    # 模拟数据
│   │   ├── jobs.ts              # 岗位数据（15个）
│   │   └── resumes.ts           # 简历数据（5份）
│   ├── pages/                   # 页面组件
│   │   ├── Home.tsx             # 首页
│   │   ├── JobMatch.tsx         # 岗位匹配页
│   │   └── ResumeAnalysis.tsx   # 简历诊断页
│   ├── store/                   # 状态管理
│   │   └── useAppStore.ts       # Zustand 全局状态
│   ├── utils/                   # 工具函数
│   │   └── matcher.ts           # 匹配算法核心
│   ├── App.tsx                  # 应用主组件
│   ├── main.tsx                 # 应用入口
│   └── index.css                # 全局样式
├── index.html                   # HTML 入口
├── package.json                 # 项目依赖配置
├── tsconfig.json                # TypeScript 配置
├── vite.config.ts               # Vite 配置
├── tailwind.config.js           # Tailwind 配置
├── postcss.config.js            # PostCSS 配置
├── eslint.config.js             # ESLint 配置
├── start.bat                    # Windows 启动脚本
└── upload-to-github.bat         # GitHub 上传脚本
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.x
- **npm** >= 9.x

### 安装与运行

#### 方式一：一键启动（推荐）

双击项目根目录下的 `start.bat`，脚本会自动：
1. 检查并安装依赖
2. 启动开发服务器
3. 自动打开浏览器

#### 方式二：命令行启动

```bash
# 1. 进入项目目录
cd d:\AI

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

启动成功后，浏览器访问：**http://localhost:5173/**

### 其他命令

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint

# TypeScript 类型检查
npm run check
```

---

## 📖 使用说明

### 岗位匹配流程

1. 进入 **岗位匹配** 页面
2. 从演示简历中选择一份（或上传自己的简历）
3. 点击「开始匹配」按钮
4. 查看按匹配度排序的岗位列表
5. 点击岗位卡片可进入简历诊断详情

### 简历诊断流程

1. 进入 **简历诊断** 页面
2. 选择一份简历
3. 选择目标岗位
4. 系统自动分析匹配度
5. 查看匹配度分数、雷达图、技能详情
6. 查看 AI 生成的优化建议

---

## 🧠 核心算法

### 匹配度计算模型

匹配度评分基于四个维度加权计算：

| 维度 | 权重 | 说明 |
|------|------|------|
| 技能匹配 | 40% | 必备技能（70%）+ 加分技能（30%） |
| 经验匹配 | 30% | 工作年限与岗位要求的匹配程度 |
| 学历匹配 | 20% | 最高学历与岗位要求的匹配程度 |
| 地点匹配 | 10% | 期望工作地与岗位地点的匹配程度 |

### 计算公式

```
总分 = 技能匹配 × 0.4 + 经验匹配 × 0.3 + 学历匹配 × 0.2 + 地点匹配 × 0.1
```

### 优化建议生成

根据各维度匹配结果，自动生成针对性建议：
- **技能缺失** → 建议学习岗位要求的核心技能
- **经验不足** → 建议补充相关项目经验
- **学历偏低** → 建议通过技能证书弥补
- **项目偏少** → 建议补充项目经历
- **通用建议** → 建议使用量化数据展示成果

---

## 📦 部署到 GitHub

### 方式一：一键上传脚本

1. 先在 GitHub 新建仓库（不要勾选 README）
2. 双击项目根目录下的 `upload-to-github.bat`
3. 按提示输入 GitHub 用户名和仓库名
4. 等待上传完成

### 方式二：Git 命令行

```bash
# 初始化仓库
git init

# 添加源文件（.gitignore 自动排除 node_modules 和 dist）
git add .

# 提交
git commit -m "feat: 腾讯 AIHR - AI求职智能匹配智能体"

# 关联远程仓库
git remote add origin https://github.com/你的用户名/仓库名.git

# 推送
git branch -M main
git push -u origin main
```

---

