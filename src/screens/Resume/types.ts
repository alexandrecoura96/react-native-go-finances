export interface IResumeData {
  type: "positive" | "negative";
  name: string;
  ammount: string;
  category: string;
  date: string;
}

export interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}
