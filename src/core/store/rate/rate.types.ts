import {
  DetailRateInterface,
  MyRateInterface,
  RateInterface,
} from "src/core/models/rate.interface";

export interface RateState {
  rate: RateInterface[] | null;
  status: string;
  myRate: MyRateInterface | null;
  specificRate: RateInterface | null;
  detailRate: DetailRateInterface | null;
}
