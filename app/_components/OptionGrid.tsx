'use client';

import Image from 'next/image';
import type { LayerOption } from '@/app/_utils/types';

interface OptionGridProps {
  options: LayerOption[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function OptionGrid({
  options,
  selected,
  onSelect,
}: Readonly<OptionGridProps>) {
  return (
    <div className="grid grid-cols-3 gap-2 p-3 overflow-y-auto" style={{ maxHeight: 460 }}>
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          title={opt.label}
          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all"
          style={{
            background: selected === opt.id ? '#5a6080' : '#ffffff',
            border: selected === opt.id ? '2px solid #a0a8d0' : '2px solid #3d4260',
            outline: 'none',
          }}
        >
          {opt.src ? (
            <Image
              src={opt.src}
              alt={opt.label}
              fill
              sizes="80px"
              style={{ objectFit: 'contain' }}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: '#2e3245' }}>
              <span
                className="text-2xl font-medium select-none"
                style={{ color: selected === opt.id ? '#c8cce8' : '#6670a0' }}
              >
                ✕
              </span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
