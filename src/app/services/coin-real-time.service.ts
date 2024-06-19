import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/webSocket";
import {environment} from "../../env/environment";


@Injectable({
  providedIn: 'root'
})
export class CoinRealTimeService {
  private socket: WebSocketSubject<any>;

  constructor() {
    this.socket = new WebSocketSubject({
      url: `${environment.coinApiWebSocketUrl}?apikey=${environment.coinApiKey}`,
      deserializer: e => JSON.parse(e.data)
    });
  }

  connect(symbol: string) {
    this.socket.next({
      type: 'hello',
      apikey: environment.coinApiKey,
      heartbeat: false,
      subscribe_data_type: ['trade'],
      subscribe_filter_asset_id: [symbol]
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.complete();
    }
  }

  getMessages() {
    return this.socket.asObservable();
  }
}
