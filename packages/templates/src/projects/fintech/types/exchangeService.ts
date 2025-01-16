export type InstrumentSingle = {
  platform: string;
  instrument: string;
  price: string;
  isIncreasing: null | boolean;
};

export type InstrumentsList = Array<InstrumentSingle>;
