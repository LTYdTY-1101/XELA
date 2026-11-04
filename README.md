# XELA 产品介绍视频

完整可播放预览： http://localhost:3105/XELA-Opening

1920 × 1080，30 fps，660 帧（22 秒）。主入口名称为 XELA-Opening，沿用之前的预览地址。Scenes 文件夹内可单独播放八个镜头；Ending-Loop 为独立的 2 秒片尾循环。

启动：

```sh
npm install
npm run studio -- --port=3105
```

导出 1080p MP4（含配乐）：

```sh
npm run render
```

成片生成到 `out/XELA-product-intro-1080p.mp4`。源码、原始画面、片尾素材和配乐均包含在仓库中；依赖目录、生成视频和本地检查图通过 `.gitignore` 排除。

## 时间轴

| 帧 | 时间 | 镜头 |
|---|---|---|
| 0–74 | 0–2.5s | 已确认的多层悬浮开场 |
| 75–188 | 2.5–6.3s | 逐行聚焦与选择；帧 152 起选中行放大，同一个容器逐帧展开为日程画板，尺寸、圆角、位置和倾角线性演变 |
| 165–239 | 5.5–8s | 日程内容在变形容器内部线性融合；帧 188 完全展开，189 帧接续后启动日程卡片飞入与回弹，再收窄为手机 |
| 240–314 | 8–10.5s | 固定顶部的手机日程内部滚动 |
| 300–389 | 10–13s | 项目页从底部弹出，向右下放大；点击左上圆环，页面像水面一样随同心波纹折射扭曲并淡出 |
| 375–494 | 12.5–16.5s | 波纹后平滑淡入、轻微上移并收清；停稳后图表浮出播放，停 1 秒后落回，再播数字和折线 |
| 495–554 | 16.5–18.5s | #003CFF switch 点击切暗黑，完成后停 1 秒 |
| 555–599 | 18.5–20s | 看板居中缩小消失，背景交接后出现最新素材圆环，文字下落回弹后轻浮 |
| 600–659 | 20–22s | 保持品牌画面，圆环上下浮动并轻转，2 秒首尾连续循环 |

转场包含在以上帧数中。所有动画只由帧数驱动，重复播放确定一致。沿用已确认的无底部字幕版本；结尾显示品牌主张。

配乐：Lily J《Pop Track 03》，Mixkit 电子轻快风格。主视频使用前 22 秒，音量 50%，开头 0.3 秒淡入、片尾 2 秒淡出。来源和授权链接保存在 public/audio/MUSIC.md。

## 背景替换

Studio 右侧 Composition / Default Props：

- `backgroundImage`：public 内的相对文件名，或图片 URL。默认 background.png，内容为用户选定背景。
- `backgroundFit`：cover / contain。
- `backgroundColor`：背景底色。

`src/OpeningScene.tsx` 保留已确认的约三分之二画面构图，`src/OrdersScene.tsx` 保留已确认的鼠标和逐行交互。后续镜头各自独立文件。原稿像素裁片在独立 DOM 层上运动，手机内容为 Figma 14:5515 的完整 360×1492 导出，图表折线为原稿 SVG。

## 验证

```sh
npm run check
node validation/check-film.cjs
```

check-film 将关键帧和所有镜头交界渲染为静态检查图，收集浏览器错误到 validation/report.json。需要已安装 Google Chrome。

玻璃环参考：保留用户加入的 src/cylinder-text.element.tsx，在 Reference / Cylinder-Reference 可单独查看。成片的 src/GlassRing.tsx 使用用户素材的清理版本 ring-clean-v2.png 与 shadow-clean-v2.png，按帧控制三维轻旋转；原始 PNG 和 cylinder 代码均保留。清理素材由内置 imagegen 编辑生成，尺寸仍为 1672×941，显示层使用平滑轮廓遮罩与投影柔化来消除透明边缘噪点；未声称恢复原稿不存在的 4K 细节。编辑提示词见 public/ending-assets/enhancement-prompts.md。
