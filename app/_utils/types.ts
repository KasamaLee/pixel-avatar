export type CategoryId = 'head' | 'hijab' | 'body' | 'prop';


export interface LayerOption {
  id: string;
  label: string;
  src: string | null;
}

export interface Category {
  id: CategoryId;
  label: string;
  options: LayerOption[];
}

export interface AvatarState {
  activeCategory: CategoryId;
  selections: Record<CategoryId, string>;
  showBackground: boolean;
}
