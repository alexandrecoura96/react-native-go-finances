export interface CategoryProps {
  key: string;
  name: string;
}

export interface ICategorySelect {
  category: CategoryProps;
  setCategory: (category: CategoryProps) => void;
  closeSelectCategory: () => void;
}
