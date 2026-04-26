'use client';

import { useRef, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';
import type { AvatarState } from '@/app/_utils/types';
import { drawAvatar, preloadImages, CANVAS_W, CANVAS_H } from '@/app/_utils/drawAvatar';

interface AvatarCanvasProps {
  state: AvatarState;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function AvatarCanvas({ state, canvasRef }: Readonly<AvatarCanvasProps>) {
  const imageCache = useRef(new Map<string, HTMLImageElement>());

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawAvatar(ctx, state, imageCache.current);
  }, [state, canvasRef]);

  useEffect(() => {
    preloadImages(state, imageCache.current).then(redraw);
  }, [state, redraw]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      style={{ display: 'block', width: 280, height: 'auto' }}
    />
  );
}
