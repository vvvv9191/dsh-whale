# 小蓝鲸 · Harness 界面桌宠

一个安装在 DeepSeek Harness `http://127.0.0.1:3080/` 页面内的透明小鲸鱼桌宠。它使用 Shadow DOM，不是跨所有 Windows 窗口的系统桌宠。

## 功能

- 点击页面：小鲸鱼游到指定位置。
- 双击小鲸鱼：掉头。
- 拖动小鲸鱼：搬到新位置。
- 点击小鲸鱼：触发轻量互动。
- 右键或齿轮：打开设置，可调整大小和自由游动。
- 背景：花朵水彩图片位于独立固定图层，页面滚动时背景不随内容移动。
- 左侧栏：冷白色；右侧：浅蓝色花朵背景。

## 主要文件

- `assets/harness-background.png`：右侧花朵水彩背景。
- `src/artwork.mjs`：小鲸鱼 SVG 矢量绘制。
- `src/whale.mjs`：Shadow DOM overlay、移动、互动与背景表面检测。
- `src/whale.css`：小鲸鱼外观和动画。
- `src/core.mjs`：设置、边界和运动计算。
- `dist/whale-pet.js`：可部署构建产物。
- `install.mjs`：安装鲸鱼 overlay、背景图片和主题样式。

## 构建、测试和安装

```powershell
npm run build
npm test
npm run install:gui
# 刷新原来的 http://127.0.0.1:3080/

# 移除本地 overlay
npm run uninstall:gui
```

安装脚本只替换自己拥有的入口标记，并保留 Harness 原有应用脚本。升级或重装 Harness 可能覆盖本地前端定制，届时重新执行 `npm run install:gui` 即可。
