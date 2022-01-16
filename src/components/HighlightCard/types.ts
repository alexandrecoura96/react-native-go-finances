export interface HighlightCard {
  type: "up" | "down" | "total";
  title: string;
  ammount: string;
  lastTransaction: string;
}
