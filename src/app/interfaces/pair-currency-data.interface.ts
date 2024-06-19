import {CurrencyQuotationInterface} from "./currency-quatation.interface";

export interface PairCurrencyDataInterface {
  name: string
  series: CurrencyQuotationInterface[]
}
