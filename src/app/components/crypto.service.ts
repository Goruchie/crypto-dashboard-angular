import { Injectable } from '@angular/core';
import { CurrentValue } from '../models/current-value';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  urlGetCurrentValues = 'https://cryptodashboard-production-3cd8.up.railway.app/api/CryptoCurrencies/prices-volumes';

  async getAllCryptoPrices(): Promise<CurrentValue[]> {
    const data = await fetch(this.urlGetCurrentValues);
    return (await data.json()) ?? [];
  }

}
