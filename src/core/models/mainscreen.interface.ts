//
//app/mainscree
//

export interface IMainScreen {
  balance: BalanceInterface;
  carousel: CarouselItemInterface[];
  expenses: ExpensesInterface;
  msisdn: MsisdnInterface;
  services: ServiceInterface[];
  tariff: TariffInterface;
  updated_at: string;
}

export interface BalanceInterface {
  balance: number;
  fillable: boolean;
}

export interface CarouselItemInterface {
  image_url: string;
  title: string;
  url: string;
}

export interface ExpenseCategoryInterface {
  name: string;
  total: number;
  color: string;
  percentile: number;
}

export interface ExpensesInterface extends PeriodInterface {
  categories: ExpenseCategoryInterface[];
}

export interface PeriodInterface {
  period: string;
  total: number;
}

export interface MsisdnInterface {
  msisdn: string;
}

export interface ServiceInterface {
  color: string;
  name: string;
  percentile: number;
  renewal_information: string;
  renewal_price: string;
  service_id: string;
  value: {
    initial: string;
    live: string;
    separator: string;
    unit: string;
  };
}

export interface TariffCounterInterface {
  color: string;
  name: string;
  percentile: number;
  type: string;
  unlimited: boolean;
  value: {
    initial: string;
    live: string;
    separator: string;
    unit: string;
  };
}

export interface TariffInterface {
  counters: TariffCounterInterface[];
  name: string;
  price: {
    pag: boolean;
    renewal_date: {
      header: string;
      text: string;
    };

    renewal_price: {
      header: string;
      text: string;
    };
  };

  // price: {
  //   pag: boolean;
  //   renewal_price: {
  //     value: number;
  //     unit: string;
  //     next_payment_date: string;
  //     renewal_period?: string;
  //   };
  // };
}
