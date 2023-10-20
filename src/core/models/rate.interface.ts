//
//api/v1.5/rate_plans
//

export interface RateInterface {
  active: boolean;
  advantages: {
    advantage_items: [
      {
        text: string;
        icon: string;
      }
    ];
    header: string;
    promo_image: string;
  };
  current: boolean;
  external_information: string;
  id: string;
  included_traffic: IncludedTrafficInterface[];
  name: string;
  properties: PropertyInterface[];

  renewal_price: {
    renewal_period: string;
    unit: string;
    value: number;
    header?: string;
    text?: string;
  };
}

export interface IncludedTrafficInterface {
  amount: { text: string; value: number };
  icon: string;
  type: string;
  item_name: string;
}

export interface PropertyInterface {
  header: {
    text_left: string;
  };
  items: PropertyItemInterface[];
}

export interface PropertyItemInterface {
  text_left: string;
  text_right?: string;
}

//
///api/v1.5/rate_plans/current
//

export interface MyRateInterface {
  counters: TariffCounterInterface[];
  header: string;
  menu: string[];

  rate_plan: {
    advantages: {
      advantage_items: [
        {
          text: string;
          icon: string;
        }
      ];
      header: string;
      promo_image: string;
    };
    renewal_period: {
      header: string;
      text: string;
    };
    renewal_price: {
      header: string;
      text: string;
    };
    properties: [
      { header: { text_left: string } }, // An array of objects with 'header' property containing an object with 'text_left' property
      { items: [{ text_left: string; text_right: string }] } // An array of objects with 'items' property containing an array of objects with 'text_left' and 'text_right' properties
    ];

    active: boolean;
    current: boolean;
    external_information: string;
    id: string;
    name: string;
  };
  restartable: boolean;
}

export interface TariffCounterInterface {
  color: string;
  name: string;
  percentile: number;
  unlimited: boolean;
  type: string;
  value: {
    initial: string;
    live: string;
    separator: string;
    unit: string;
  };
}

export interface RatePlanInterface {
  activation_price: {
    unit: string;
    value: number;
  };
  active: boolean;
  current: boolean;
  external_information: string;
  id: string;
  included_traffic: [
    {
      amount: {
        text: string;
        value: number;
      };
      item_name: string;
      type: string;
      icon?: string;
    }
  ];
  advantages: {
    advantage_items: [
      {
        text: string;
        icon: string;
      }
    ];
    header: string;
    promo_image: string;
  };
  name: string;
  properties: [
    {
      headers: {
        text_left: string;
      };
      items: [
        {
          text_left: string;
          text_right: string;
        }
      ];
    }
  ];
  renewal_price: {
    next_payment_date: string;
    renewal_price: string;
    unit: string;
    value: number;
    header?: string;
    text?: string;
  };
}

//rate_plans/change/initialize

export interface DetailRateInterface {
  activation_price: {
    unit: string;
    value: number;
  };
  rate_plan: {
    active: boolean;
    current: boolean;
    external_information: string;
    id: string;
    name: string;

    renewal_price: {
      header: string;
      text: string;
    };
    properties: {
      highlighted: boolean;
      header: { text_left: string };
      items: { text_left: string; text_right: string }[];
    };
  };

  renewal_price: {
    renewal_period: string;
    header: string;
    text: string;
  };
}
