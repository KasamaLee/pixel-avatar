"use client";

import { useState, useRef, useCallback } from "react";
import type { AvatarState, CategoryId } from "@/app/_utils/types";
import { DEFAULT_AVATAR_STATE } from "@/app/_utils/defaultState";
import { CATEGORY_MAP } from "@/app/_utils/layers";
import AvatarCanvas from "./AvatarCanvas";
import OptionGrid from "./OptionGrid";
import CategoryButtons from "./CategoryButtons";

export default function AvatarCreator() {
  const [state, setState] = useState<AvatarState>(DEFAULT_AVATAR_STATE);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setCategory = useCallback((id: CategoryId) => {
    setState((prev) => ({
      ...prev,
      activeCategory: id,
    }));
  }, []);

  const setSelection = useCallback((optionId: string) => {
    setState((prev) => {
      const cat = prev.activeCategory;
      const next = { ...prev.selections, [cat]: optionId };
      // Head ↔ Hijab are mutually exclusive
      if (cat === "head" && optionId !== "none") next.hijab = "none";
      if (cat === "hijab" && optionId !== "none") next.head = "none";
      return { ...prev, selections: next };
    });
  }, []);

  const toggleBackground = useCallback(() => {
    setState((prev) => ({ ...prev, showBackground: !prev.showBackground }));
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_AVATAR_STATE);
  }, []);

  const saveCanvas = useCallback((scale: number) => {
    const src = canvasRef.current;
    if (!src) return;
    const w = Math.round(src.width * scale);
    const h = Math.round(src.height * scale);
    const out = document.createElement("canvas");
    out.width = w;
    out.height = h;
    const ctx = out.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(src, 0, 0, w, h);
    const a = document.createElement("a");
    a.href = out.toDataURL("image/png");
    a.download = `avatar-${w}x${h}.png`;
    a.click();
  }, []);

  const activeCategory = CATEGORY_MAP.get(state.activeCategory);

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden shadow-2xl w-full max-w-4xl"
      style={{ background: "#4a5065" }}
    >
      {/* Top section: option grid | category buttons | preview */}
      <div className="flex flex-col-reverse md:flex-row w-full">
        {/* Left: option grid */}
        <div
          className="flex flex-col w-full md:w-[240px] md:flex-shrink-0 border-t-2 md:border-t-0 md:border-r-2"
          style={{
            background: "#3d4260",
            borderColor: "#2e3245",
          }}
        >
          <div
            className="px-3 py-2 text-xs font-bold uppercase tracking-wider"
            style={{ color: "#8890b8", borderBottom: "1px solid #2e3245" }}
          >
            {activeCategory?.label ?? ""}
          </div>
          <OptionGrid
            options={activeCategory?.options ?? []}
            selected={state.selections[state.activeCategory] ?? "none"}
            onSelect={setSelection}
          />
        </div>

        {/* Middle: category buttons */}
        <div
          className="flex flex-col w-full md:w-[100px] md:flex-shrink-0 border-t-2 md:border-t-0 md:border-r-2"
          style={{
            background: "#363952",
            borderColor: "#2e3245",
          }}
        >
          <CategoryButtons
            active={state.activeCategory}
            onSelect={setCategory}
          />
        </div>

        {/* Right: preview + actions */}
        <div
          className="flex flex-col items-center gap-3 p-4 flex-1 w-full md:w-auto"
          style={{ background: "#4a5065", minWidth: 220 }}
        >
          {/* Canvas preview */}
          <div
            className="rounded-lg overflow-hidden"
            style={{
              background: state.showBackground ? undefined : "#ffffff",
              border: "2px solid #2e3245",
              lineHeight: 0,
            }}
          >
            <AvatarCanvas state={state} canvasRef={canvasRef} />
          </div>

          {/* Save buttons */}
          <div className="flex gap-2 w-full">
            <button
              onClick={() => saveCanvas(2)}
              className="flex-1 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors"
              style={{
                background: "#363952",
                color: "#c0c8e8",
                border: "1px solid #5a6080",
              }}
            >
              Save 2×
            </button>
            <button
              onClick={() => saveCanvas(1)}
              className="flex-1 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors"
              style={{
                background: "#363952",
                color: "#c0c8e8",
                border: "1px solid #5a6080",
              }}
            >
              Save 1×
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 w-full flex-wrap">
            <button
              onClick={toggleBackground}
              className="flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              style={{
                background: state.showBackground ? "#5a6080" : "#363952",
                color: "#c0c8e8",
                border: "1px solid #5a6080",
                minWidth: 80,
              }}
            >
              Toggle BG
            </button>
            <button
              onClick={reset}
              className="flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              style={{
                background: "#363952",
                color: "#c0c8e8",
                border: "1px solid #5a6080",
                minWidth: 60,
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
