export interface ServicesTypes {
  all: CategoryInterface[] | null;
  enabled: CategoryInterface[] | null;
}

export interface CategoryInterface {
  name: string;
  items: ItemInterface[];
}

export interface ItemInterface {
  active: boolean;
  enabled: boolean;
  external_information: string;
  id: string;
  name: string;
  price_highlight: string;
  properties: PropertiesInterface[];
  renewal_information: string;
  short_description: string;

  color?: string;
  renewal_period?: {
    color: string;
    text: string;
  };

  expires_at?: string;
  initial_amount?: {
    text: string;
    value: number;
  };
  live_amount?: {
    text: string;
    value: number;
  };
}

export interface PropertiesInterface {
  header: {
    text_left: string;
  };
  items: [text_left: string];
}
