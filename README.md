# dsh-whale · 来解锁你的工作搭子吧
<img width="250" height="240" alt="a61f1910e846208baae9db372cf51b0f" src="https://github.com/user-attachments/assets/68628975-d34a-4198-8c0b-b073a0ef531e" />




一个可通过 DSH Plugin Manager 安装到 DeepSeek Harness Web 界面的透明蓝色小鲸鱼桌宠。它运行在 Harness Web 页面内，不是跨所有 Windows 窗口的系统桌宠。

## 安装

在已初始化的 DSH profile 中运行：

```powershell
dsh plugin --profile web add https://github.com/vvvv9191/dsh-whale.git
```

如果使用其他 profile，把 `web` 替换为对应 profile 名称。安装后重启或等待该 profile 的 HMR 应用变更。

卸载：

```powershell
dsh plugin --profile web remove dsh-whale
```

## 功能

- 小鲸鱼自动缓慢游动；悬停时暂停，便于点击。
- 点击随机触发三种互动：星星爱心、喷水、翻滚。
- 平时只冒小气泡，不显示水珠、星星、爱心或文字气泡。
- 支持拖动搬家、右键/齿轮设置、键盘方向键移动。
- 支持隐藏/唤醒、大小调整（56–160px，默认 96px）和自由游动开关。
- 支持减少动态效果设置。
- 使用 Shadow DOM，避免覆盖 Harness 页面结构。

## 艺术来源

小鲸鱼形象基于用户提供的参考图绘制。

**图片来源：小红书号95645761894，画画的阿慢**

本仓库中的 DSH 插件代码和页面集成部分，与原始图像作品来源分开标注。

## 主要文件

- `package.json`：DSH bundle 与 Client 插件清单
- `cordis.patch.yml`：安装时插入 `dsh-whale` Host 行
- `index.js`：Host 半部
- `client.js`：构建后的 DSH Client Loader 入口
- `src/client-entry.mjs`：Client Loader 源入口
- `src/artwork.mjs`：鲸鱼 SVG、本体、喷水、星星和爱心
- `src/whale.mjs`：Shadow DOM overlay、游动、互动、拖动和设置
- `src/whale.css`：鲸鱼外观和动画
- `src/core.mjs`：设置、边界和运动计算
- `NOTICE.md`：艺术来源署名

## 开发与测试

```powershell
npm install
npm run build
npm test
npm run test:plugin
```

`npm run build` 会生成可安装的 `client.js`，同时生成 `dist/whale-pet.js` 供本地预览或兼容旧安装脚本使用。
