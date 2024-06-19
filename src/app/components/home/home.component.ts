import {Component, inject, OnDestroy} from '@angular/core';
import {ChartComponent} from "../chart/chart.component";
import {MatCardModule} from "@angular/material/card";
import {HeaderComponent} from "../header/header.component";
import {CoinRealTimeService} from "../../services/coin-real-time.service";
import {RealTimeCurrencyInterface} from "../../interfaces/real-time-currency.interface";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, HeaderComponent, ChartComponent, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  mainCurrency!: string;
  secondaryCurrency!: string;
  currencyValue!: number;
  currencyTimeExchange!: string;

  private cryptoSocketService = inject(CoinRealTimeService);

  onSocketConnect(cc1: string, cc2: string) {
      let chain = `${cc1}/${cc2}`
      this.cryptoSocketService.connect(chain);
      this.cryptoSocketService.getMessages().subscribe((message: RealTimeCurrencyInterface) => {
        if (message && message.type === 'trade') {
          this.currencyValue = message.price;
          this.currencyTimeExchange = message.time_exchange;
        }
      });
  }

  handleSymbolChange(event: {crypto1: string, crypto2: string}): void {
    this.mainCurrency = event.crypto1;
    this.secondaryCurrency = event.crypto2;
    this.onSocketConnect(this.mainCurrency, this.secondaryCurrency);
  }

  ngOnDestroy() {
    this.cryptoSocketService.disconnect();
  }
}
