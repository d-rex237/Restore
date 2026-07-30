export interface DietaryInfo {
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  preparationTime?: number;
  ingredients: string[];
  isPopular?: boolean;
  dietaryInfo?: DietaryInfo;
}