import { IMainScreen } from "src/core/models/mainscreen.interface";

export interface ExpensesscreenState {
  status: string;
  expensive: [];
  getExpRep: ExpensesReport[] | null;
}

export interface ExpensesReport {
  title: string;
  url: string;
}
