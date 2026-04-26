import type { AvatarState, CategoryId } from './types';
import { CATEGORY_MAP, getLayerDrawOrder  } from './layers';

export const CANVAS_W = 350;
export const CANVAS_H = 390;

type ImageCache = Map<string, HTMLImageElement>;
function drawBackground(ctx: CanvasRenderingContext2D) {
  const size = 20;
  for (let row = 0; row < CANVAS_H / size + 1; row++) {
    for (let col = 0; col < CANVAS_W / size + 1; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? '#e8e8e8' : '#d4d4d4';
      ctx.fillRect(col * size, row * size, size, size);
    }
  }
}

async function loadImage(src: string, cache: ImageCache): Promise<HTMLImageElement | null> {
  if (cache.has(src)) return cache.get(src)!;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      cache.set(src, img);
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}



export async function preloadImages(state: AvatarState, cache: ImageCache): Promise<void> {
  const srcs: string[] = [];
  for (const catId of getLayerDrawOrder(state)) {
    const selectedId = state.selections[catId];
    if (!selectedId || selectedId === 'none') continue;
    const cat = CATEGORY_MAP.get(catId);
    const opt = cat?.options.find((o) => o.id === selectedId);
    if (opt?.src) srcs.push(opt.src);
  }
  await Promise.all(srcs.map((src) => loadImage(src, cache)));
}

function getDrawableForLayer(
  catId: CategoryId,
  state: AvatarState,
  imgCache: ImageCache,
): CanvasImageSource | null {
  const selectedId = state.selections[catId];
  if (!selectedId || selectedId === 'none') return null;
  const cat = CATEGORY_MAP.get(catId);
  const opt = cat?.options.find((o) => o.id === selectedId);
  if (!opt?.src) return null;
  const img = imgCache.get(opt.src);
  if (!img) return null;

  return img;
}

export function drawAvatar(
  ctx: CanvasRenderingContext2D,
  state: AvatarState,
  imgCache: ImageCache,
): void {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.imageSmoothingEnabled = true;

  if (state.showBackground) {
    drawBackground(ctx);
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }

  for (const catId of getLayerDrawOrder(state)) {
    const drawable = getDrawableForLayer(catId, state, imgCache);
    if (drawable) ctx.drawImage(drawable, 0, 0);
  }
}
