import { ElementType } from "react";

export interface AnalyticsResponse {
  revenue?: number;
  netIncome?: number;
  data?: {
    revenue?: number;
    netIncome?: number;
  };
}

export type AllRevenueResponse = Record<string, number>;

export interface StatCardProps {
  title: string;
  value: string;
  icon: ElementType;
  color: string;
  bg: string;
}
