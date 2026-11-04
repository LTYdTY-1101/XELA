# 片尾素材清理

方式：内置 imagegen 编辑；原始素材保留不覆盖。输出尺寸：1672×941。运行时使用平滑轮廓与投影柔化。

输出：`ring-clean-v2.png`、`shadow-clean-v2.png`。

## 圆环最终提示词

Use case: precise-object-edit / background-extraction. Asset type: high-definition transparent ring layer for the existing XELA video. Input image is the edit target, not inspiration. Repair ONLY raster quality: faithfully restore the SAME smooth iridescent glass elliptical ring at the exact same position, size, camera angle, tilt, thickness, opening and silhouette. Preserve the existing blue/cyan/purple/pink highlight placement, translucent material, perspective and all empty upper space. Remove the ground shadow/reflection entirely (it will be composited as a separate layer), and remove all stray dithered/noisy pixels outside the actual ring. True transparent alpha everywhere else, including the ring opening. Smooth antialiased contours, clean continuous polished glass gradients, high-resolution sharp rendering, no pixelated fringes, no grain. Keep original 16:9 full-canvas framing, ring centered around x51%, y66% and spanning x13% to89%, y49% to84%. Output 3840x2160 if possible. No new objects, no text, no watermark, no background, no redesign, do not center or enlarge the ring.

## 投影最终提示词

Use case: precise-object-edit / background-extraction. Edit target: the supplied XELA ground shadow/reflection layer. Restore the SAME very soft elongated oval light reflection at the same exact canvas position and size; preserve lavender/pink on the left, blue/cyan at center/right. QUALITY REPAIR only. Completely remove stippled speckles, jagged alpha noise, white flecks and grain around the outer edges. Replace those broken edges with smooth continuous soft transparent falloff, like a clean high quality Gaussian optical glow. Do NOT add any ring or object. True transparent background and alpha. Keep 16:9 full-canvas framing and all empty space above; reflection remains confined to the bottom quarter, approximately x7%-85%, y75%-98%. Output high-resolution 3840x2160 if possible. No background color, no text, no watermark, no layout changes.
