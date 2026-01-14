# 🏀 NBA Analytics Mini Program

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-WeChat_Mini_Program-green.svg)
![Cloud](https://img.shields.io/badge/backend-WeChat_Cloud_Development-orange.svg)

一款基于微信原生开发 + 云开发的专业级 NBA 数据分析小程序。提供实时比分、高阶数据看板、球员深度分析及比赛胜率预测功能。

## ✨ 核心特性

### 1. 📅 实时赛程 (Live Scores)
- **实时比分刷新**：支持每分钟自动轮询，即时掌握比赛进程。
- **状态感知**：清晰区分「未开始」、「进行中 (Live)」和「已结束 (Final)」。
- **关键数据**：展示节数、剩余时间及电视转播渠道。

### 2. 📊 专业数据看板 (Advanced Dashboard)
- **四象限攻防图**：使用 ECharts 绘制球队进攻效率 vs 防守效率散点图，直观呈现联盟格局。
- **高阶数据榜单**：展示真实命中率 (TS%)、使用率 (USG%) 等进阶指标 Top 5。
- **交互式图表**：支持点击查看详情，数据可视化效果极佳。

### 3. 🏆 深度榜单 (Rankings)
- **多维度统计**：覆盖得分、篮板、助攻、效率值 (PER)、胜利贡献值 (WS) 等7大类。
- **实时排名**：Top 3 高亮显示，支持下拉刷新获取最新数据。
- **球员导航**：点击榜单直接跳转至球员详情页。

### 4. 🔮 智能预测 (Predictions)
- **胜率预估**：基于历史交手和近期状态的胜率进度条。
- **里程碑预测**：趣味性的球员数据达成概率（如：詹姆斯得分 > 25.5）。

### 5. 👤 球员与球队详情 (Detail Pages)
- **能力雷达图**：六维能力分布（进攻、防守、组织等）。
- **最强阵容分析**：展示球队净效率最高的 5 人组合。
- **生涯趋势**：关键数据可视化展示。

---

## 🛠 技术栈

*   **前端**：微信小程序原生 (WXML, WXSS, JS)
*   **后端**：微信云开发 (Cloud Functions, Cloud Database)
*   **图表库**：`echarts-for-weixin` (高性能 Canvas 渲染)
*   **样式**：CSS Variables (深色模式主题管理)

---

## 📂 目录结构

```text
nba-analysis/
├── cloudfunctions/             # 云函数 (后端逻辑)
│   ├── fetchMatches/           # 获取赛程数据
│   ├── syncLiveMatches/        # 定时同步实时比分
│   ├── syncDailyStats/         # 每日计算高阶数据
│   └── ...
│
├── miniprogram/                # 小程序前端
│   ├── assets/                 # 静态资源 (图标、图片)
│   ├── components/             # 公共组件
│   ├── ec-canvas/              # ECharts 组件库
│   ├── pages/                  # 页面文件
│   │   ├── match/              # 赛程首页
│   │   ├── dashboard/          # 数据看板
│   │   ├── rank/               # 榜单
│   │   ├── prediction/         # 预测
│   │   ├── player-detail/      # 球员详情
│   │   └── team-detail/        # 球队详情
│   │
│   ├── app.js                  # 全局逻辑
│   ├── app.json                # 全局配置
│   └── app.wxss                # 全局样式 (深色主题变量)
│
└── project.config.json         # 项目配置文件
```

---

## 🚀 快速开始

### 1. 环境准备
*   下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
*   注册一个小程序账号（或使用测试号）。

### 2. 克隆项目
```bash
git clone https://github.com/your-username/nba-analysis.git
```

### 3. 安装依赖
由于使用了 ECharts，你需要确保 `miniprogram/ec-canvas` 目录存在。
如果使用了云函数依赖（如 `axios`）：
1.  在微信开发者工具中右键点击 `cloudfunctions/syncLiveMatches`。
2.  选择「在终端打开」，运行 `npm install`。
3.  右键选择「上传并部署：云端安装依赖」。

### 4. 运行
*   将项目导入微信开发者工具。
*   AppID 选择你的 ID 或点击「测试号」。
*   点击「编译」即可预览。

---

## 🎨 截图预览

| 赛程首页 | 数据看板 | 球员详情 |
|:---:|:---:|:---:|
| *(image.png)* | *(在此处插入 dashboard.png)* | *(在此处插入 player.png)* |

| 高阶榜单 | 比赛预测 |
|:---:|:---:|
| *(在此处插入 rank.png)* | *(在此处插入 predict.png)* |

---

## 📝 数据来源
本项目演示数据基于 2023-24 NBA 赛季真实统计，接口逻辑参考：
*   NBA Official Stats API
*   腾讯体育 API

---

## 📄 License
[MIT](LICENSE) © 2026 AI-Vibe
