export interface Bid {
  id: number;
  clientId: number;
  product: string;
  totalCost: number;
  firstPaymentCost: number;
  termInMonths: number;
  date: string;
}