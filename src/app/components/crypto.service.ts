import { Injectable } from '@angular/core';
import { CurrentValue } from '../models/current-value';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CryptoPrice } from '../models/crypto-price';


@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) {}

  urlGetCurrentValues = 'https://cryptodashboard-production-3cd8.up.railway.app/api/CryptoCurrencies';

  async getAllCryptoPrices(): Promise<CurrentValue[]> {
    const data = await fetch(this.urlGetCurrentValues + '/prices-volumes');
    return (await data.json()) ?? [];
  }

  getHistoricalPrices(id: number, startDate: string, endDate: string): Observable<CurrentValue[]> {
    return this.http.get<CurrentValue[]>(`${this.urlGetCurrentValues}/historical-prices/${id}?startDate=${startDate}&endDate=${endDate}`);
  }

  async getAveragePrices(id: number, startDate: string, endDate: string): Promise<CryptoPrice | undefined> {
    const data = await fetch(`${this.urlGetCurrentValues}/average-price/${id}?startDate=${startDate}&endDate=${endDate}`);
    const avgJson = await data.json();
    return avgJson ?? {};
  }

  async getMaxPrices(id: number, startDate: string, endDate: string): Promise<CryptoPrice | undefined> {
    const data = await fetch(`${this.urlGetCurrentValues}/max-price/${id}?startDate=${startDate}&endDate=${endDate}`);
    const avgJson = await data.json();
    return avgJson ?? {};
  }

  async getMinPrices(id: number, startDate: string, endDate: string): Promise<CryptoPrice | undefined> {
  const data = await fetch(`${this.urlGetCurrentValues}/min-price/${id}?startDate=${startDate}&endDate=${endDate}`);
  const avgJson = await data.json();
  return avgJson ?? {};
  }


}
