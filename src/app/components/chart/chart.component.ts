import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CoinApiService} from "../../services/coin-api.service";
import {Color, NgxChartsModule, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnChanges {
  @Input() mainCurrencyCode!: string;
  @Input() secondaryCurrencyCode!: string;

  // query parameters
  period: string = '1DAY'; // period between values
  limit: number = 7; // chart period
  data: any; // data for chart

  // options for the chart
  view: [number, number] = [1000, 400];
  colorScheme: Color = {
    name: 'myChart',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3cd3d3']
  };
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient = false;
  animations: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price';

  private cryptoRestService = inject(CoinApiService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mainCurrencyCode'] || changes['secondaryCurrencyCode']) {
      this.getDataForPairCurrencies();
    }
  }

  getDataForPairCurrencies(): void {
    if (this.mainCurrencyCode && this.secondaryCurrencyCode) {
      const pairCurrencies = `${this.mainCurrencyCode}/${this.secondaryCurrencyCode}`;
      this.cryptoRestService.getHistoricalData(pairCurrencies, this.period, this.limit).subscribe(
        data => {
          this.data = data;
        },
        error => {
          console.error('Error during receiving historical data:', error);
        }
      );
    }
  }
}
