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
      className="flex flex-col gap-1 py-3 px-2 overflow-y-auto"
      style={{ maxHeight: 480 }}
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className="w-full text-sm font-semibold py-2 px-3 rounded-lg cursor-pointer transition-all text-left"
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
