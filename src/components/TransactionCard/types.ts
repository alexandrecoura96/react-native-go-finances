export interface CategoryType {
  name: string;
  icon: string;
}

export interface ITransactionCard {
  type: "positive" | "negative";
  name: string;
  ammount: string;
  category: CategoryType;
  date: string;
}

export interface ITransactionProps {
  data: ITransactionCard;
}
