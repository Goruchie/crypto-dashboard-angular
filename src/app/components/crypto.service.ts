import { Injectable } from '@angular/core';
import { CurrentValue } from '../models/current-value';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) {}

  urlGetCurrentValues = 'https://cryptodashboard-production-3cd8.up.railway.app/api';

  async getAllCryptoPrices(): Promise<CurrentValue[]> {
    const data = await fetch(this.urlGetCurrentValues + '/CryptoCurrencies/prices-volumes');
    return (await data.json()) ?? [];
  }

  getHistoricalPrices(id: number, startDate: string, endDate: string): Observable<CurrentValue[]> {
    return this.http.get<CurrentValue[]>(`${this.urlGetCurrentValues}/CryptoCurrencies/historical-prices/${id}?startDate=${startDate}&endDate=${endDate}`);
  }

}
