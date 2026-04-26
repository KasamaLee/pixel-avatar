import type { AvatarState, Category, CategoryId } from './types';

const HEAD_FILES: Array<[string, string, string]> = [
  ['longstraight', 'Long Straight', 'Long straight hair'],
  ['longhair', 'Long Hair', 'Long hair'],
  ['shoulderlength', 'Shoulder Length', 'Shoulder length'],
  ['shortbangs', 'Short w/ Bangs', 'Short hair with bangs'],
  ['shortstraight', 'Short Straight', 'Short straignt hair'],
  ['shortundercut', 'Short Undercut', 'Short under cut'],
  ['puff', 'Puff w/ Bow', 'Female puff hair with bow tie hair clip'],
  ['malepuff', 'Male Puff', 'Male puff hair'],
  ['bun', 'Hair Bun', 'Hair bun'],
  ['braids', '2 Braids', '2 braids'],
  ['shortbeard', 'Short + Beard', 'Short hair and beard'],
  ['shortcap', 'Short + Cap', 'Short hair and cap'],
  ['shorthat', 'Short + Hat', 'Short hair and hat'],
  ['shortglasses', 'Short + Glasses', 'Short hair and glasses'],
];

const HIJAB_FILES: Array<[string, string, string]> = [
  ['female', 'Female Hijab', 'Female Hijab'],
  ['male1', 'Male Hijab 1', 'Male hijab 1'],
  ['male2', 'Male Hijab 2', 'Male hijab 2'],
];

const HEAD_OPTIONS = HEAD_FILES.map(([id, label, file]) => ({
  id,
  label,
  src: `/head/Property 1=${file}.png`,
}));

const HIJAB_OPTIONS = HIJAB_FILES.map(([id, label, file]) => ({
  id,
  label,
  src: `/hijab/Property 1=${file}.png`,
}));

const BODY_OPTIONS = Array.from({ length: 16 }, (_, i) => {
  const n = i + 2;
  return {
    id: `f${n}`,
    label: `Style ${n}`,
    src: `/body/Frame ${n}.png`,
  };
});

const PROP_OPTIONS = [
  { id: 'none', label: 'None', src: null },
  { id: 'scientist', label: 'Scientist', src: '/prop/prop1.png' },
  { id: 'mechanic', label: 'Mechanic', src: '/prop/prop2.png' },
];

export const CATEGORIES: Category[] = [
  { id: 'head', label: 'Head', options: HEAD_OPTIONS },
  { id: 'hijab', label: 'Hijab', options: HIJAB_OPTIONS },
  { id: 'body', label: 'Body', options: BODY_OPTIONS },
  { id: 'prop', label: 'Prop', options: PROP_OPTIONS },
];

export const CATEGORY_MAP = new Map<CategoryId, Category>(
  CATEGORIES.map((c) => [c.id, c])
);

// Bottom-to-top draw order is dynamic:
// - Head selected → head, then body on top (body covers head's body silhouette)
// - Hijab selected → body first, then hijab on top (hijab drapes over shoulders)
// - Male Hijab 2 sits under the body so the shirt collar covers it.
// Props always sit on top regardless.
export function getLayerDrawOrder(state: AvatarState): CategoryId[] {
  const hijab = state.selections.hijab;
  if (hijab && hijab !== 'none') {
    if (hijab === 'male2') return ['hijab', 'body', 'prop'];
    return ['body', 'hijab', 'prop'];
  }
  return ['head', 'body', 'prop'];
}
