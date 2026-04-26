'use client';

import type { CategoryId } from '@/app/_utils/types';
import { CATEGORIES } from '@/app/_utils/layers';

interface CategoryButtonsProps {
  active: CategoryId;
  onSelect: (id: CategoryId) => void;
}

export default function CategoryButtons({ active, onSelect }: Readonly<CategoryButtonsProps>) {
  return (
    <div
      className="flex flex-row md:flex-col gap-2 md:gap-1 py-2 md:py-3 px-2 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto scrollbar-hide"
      style={{ maxHeight: 480 }}
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className="whitespace-nowrap md:whitespace-normal shrink-0 md:shrink md:w-full text-sm font-semibold py-2 px-3 rounded-lg cursor-pointer transition-all md:text-left text-center"
          style={{
            background: active === cat.id ? '#5a6080' : 'transparent',
            color: active === cat.id ? '#e0e4ff' : '#8890b8',
            border: active === cat.id ? '1px solid #7880b0' : '1px solid transparent',
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
