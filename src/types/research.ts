export interface ElementType {
  id: string;
  title: string;
  description: string;
}

export interface CategoryData {
  id: string;
  title: string;
  description: string;
  elements: ElementType[];
} 