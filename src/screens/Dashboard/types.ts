import { ITransactionCard } from "../../components/TransactionCard/types";

export interface DataListProps extends ITransactionCard {
  id: string;
}

interface HighlightProps {
  ammount: string;
  lastTransaction: string;
}

export interface IHighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}
