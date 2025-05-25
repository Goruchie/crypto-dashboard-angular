import { Component, inject, Input, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrentValue } from '../../models/current-value';
import { CryptoService } from '../../components/crypto.service';
import { CommonModule } from '@angular/common';
import { CurrentValuesComponent } from "../../components/current-values/current-values.component";
import { TradingVolumeTrendsComponent } from "../../components/trading-volume-trends/trading-volume-trends.component";
import { CryptoPriceTableComponent } from "../../components/crypto-price-table/crypto-price-table.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
     MatButtonModule, 
     CommonModule, 
     CurrentValuesComponent, 
     TradingVolumeTrendsComponent, 
     CryptoPriceTableComponent,
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  @ViewChild(TradingVolumeTrendsComponent) tradingVolumeTrendsComponent!: TradingVolumeTrendsComponent;  

  cryptoService = inject(CryptoService);
  cryptoCurrentValues = signal<CurrentValue[]>([]);

  constructor() {
    this.cryptoService.getAllCryptoPrices().then((data) => {
      this.cryptoCurrentValues.set(data);
    });
  }

  selectedCrypto = signal<CurrentValue | null>(null);

  selectCrypto(crypto: CurrentValue | null) {
    this.selectedCrypto.set(crypto);
  
    setTimeout(() => {
      if (this.tradingVolumeTrendsComponent) {
        this.tradingVolumeTrendsComponent.selectedCrypto = this.selectedCrypto();
        this.tradingVolumeTrendsComponent.updateChart();
      } else {
        console.error("❌ Could not access tradingVolumeTrendsComponent");
      }
    }, 0);
  }
}