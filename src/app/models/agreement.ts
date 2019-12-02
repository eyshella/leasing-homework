export interface Agreement {
  id: number;
  content: string;
  clientId: number;
  bidId?: number;
  date: string;
}