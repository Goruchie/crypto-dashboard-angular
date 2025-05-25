import { Component, inject, Input, OnChanges, signal, SimpleChanges, ViewChild } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardTitle } from '@angular/material/card';
import { MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../crypto.service';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CurrentValue } from '../../models/current-value';
import { CryptoPrice } from '../../models/crypto-price';
import { ActivatedRoute } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-crypto-price-table',
  imports: [
    MatCard,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardTitle,
    MatTableModule,
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './crypto-price-table.component.html',
  styleUrl: './crypto-price-table.component.css'
})
export class CryptoPriceTableComponent {
  @ViewChild('tableContainer') tableContainer!: { nativeElement: HTMLDivElement };
  @Input() startDate: Date = new Date(new Date().setDate(new Date().getDate() - 7));
  @Input() endDate: Date = new Date(new Date().setDate(new Date().getDate()));
  @Input() priceData!: CryptoPrice | null;
  route: ActivatedRoute = inject(ActivatedRoute);



  cryptoService = inject(CryptoService);  
  displayedColumns: string[] = ['symbol', 'averagePrice', 'minPrice', 'maxPrice'];
  dataSource = new MatTableDataSource<CryptoPrice>([]);

  constructor() {
  const cryptoIds = [1, 2];

  const priceDataArray: CryptoPrice[] = [];

  Promise.all(
    cryptoIds.map(id =>
      Promise.all([
        this.cryptoService.getAveragePrices(id, this.startDate.toDateString(), this.endDate.toDateString()),
        this.cryptoService.getMaxPrices(id, this.startDate.toDateString(), this.endDate.toDateString()),
        this.cryptoService.getMinPrices(id, this.startDate.toDateString(), this.endDate.toDateString())
      ]).then(([avgPriceData, maxPriceData, minPriceData]) => {

        if (avgPriceData && maxPriceData && minPriceData) {
          priceDataArray.push({
            symbol: avgPriceData.symbol,
            averagePrice: avgPriceData.averagePrice,
            maxPrice: maxPriceData.maxPrice,
            minPrice: minPriceData.minPrice
          });
        }
      }).catch(error => console.error(`Error trying to get data for ID ${id}:`, error))
      
    )
  ).then(() => {
    this.dataSource.data = priceDataArray;
  });
}
 
updateTable() {
  const cryptoIds = [1, 2];

  const priceDataArray: CryptoPrice[] = [];

  Promise.all(
    cryptoIds.map(id =>
      Promise.all([
        this.cryptoService.getAveragePrices(id, this.startDate.toDateString(), this.endDate.toDateString()),
        this.cryptoService.getMaxPrices(id, this.startDate.toDateString(), this.endDate.toDateString()),
        this.cryptoService.getMinPrices(id, this.startDate.toDateString(), this.endDate.toDateString())
      ]).then(([avgPriceData, maxPriceData, minPriceData]) => {
        if (avgPriceData && maxPriceData && minPriceData) {
          priceDataArray.push({
            symbol: avgPriceData.symbol,
            averagePrice: avgPriceData.averagePrice,
            maxPrice: maxPriceData.maxPrice,
            minPrice: minPriceData.minPrice
          });
        }
      }).catch(error => console.error(`Error trying to get data for ID ${id}:`, error))
    )
  ).then(() => {
    this.dataSource.data = priceDataArray;
  });
}

}
