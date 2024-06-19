import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/environment";
import {map, Observable} from "rxjs";
import {PairCurrencyDataInterface} from "../interfaces/pair-currency-data.interface";

@Injectable({
  providedIn: 'root'
})
export class CoinApiService {
  private baseUrl = environment.coinApiRestUrl;
  private apiKey = environment.coinApiKey;

  private http = inject(HttpClient);

  getHistoricalData(symbol: string, period: string, limit: number): Observable<PairCurrencyDataInterface[]> {
    const url = `${this.baseUrl}/v1/exchangerate/${symbol}/history?period_id=${period}&limit=${limit}&apikey=${this.apiKey}`;

    return this.http.get<any[]>(url).pipe(
      map(data => {
        data.reverse()
        return [
          {
            name: symbol,
            series: data.map(item => ({
              name: new Date(item.time_period_start).toISOString().slice(5, 10),
              value: item.rate_close
            }))
          }
        ];
      }),
    );
  }

}
