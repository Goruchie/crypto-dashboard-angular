import { Component, ViewChild, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CryptoService } from '../crypto.service';
import { CurrentValue } from '../../models/current-value';
import { MatIcon } from '@angular/material/icon';



@Component({
  selector: 'app-trading-volume-trends',
  imports: [ 
    CommonModule,
    FormsModule, 
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule, 
    MatCard,
    MatIcon
  ],
  templateUrl: './trading-volume-trends.component.html',
  styleUrl: './trading-volume-trends.component.css'
})
export class TradingVolumeTrendsComponent implements OnChanges {
  
  @ViewChild('chartCanvas') chartCanvas!: { nativeElement: HTMLCanvasElement };
  @Input() selectedCrypto!: CurrentValue | null;



  startDate: Date = new Date(new Date().setDate(new Date().getDate() - 7));
  endDate: Date = new Date();

  chart!: Chart;
  cryptoService = inject(CryptoService);

  constructor() {
    Chart.register(...registerables);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['selectedCrypto']) {
        this.updateChart();
    }
}

updateChart() {
  const formattedStartDate = this.startDate.toISOString().split('T')[0];
  const formattedEndDate = this.endDate.toISOString().split('T')[0];

  if (this.chart) {
      this.chart?.destroy();
  }

  if (!this.selectedCrypto) {
      Promise.all([
          this.cryptoService.getHistoricalPrices(1, formattedStartDate, formattedEndDate).toPromise(),
          this.cryptoService.getHistoricalPrices(2, formattedStartDate, formattedEndDate).toPromise()
      ]).then(([btcPrices, ethPrices]) => {
          if (!btcPrices?.length || !ethPrices?.length) {
              return;
          }

          const labels = btcPrices.map(p => new Date(p.date).toLocaleDateString());
          const btcData = btcPrices.map(p => p.volume);
          const ethData = ethPrices.map(p => p.volume);

          this.chart = new Chart(this.chartCanvas.nativeElement.getContext('2d')!, {
              type: 'line',
              data: {
                  labels,
                  datasets: [
                      {
                          label: "Bitcoin Volume",
                          data: btcData,
                          borderColor: '#FF9900',
                          backgroundColor: 'rgba(255, 153, 0, 0.2)',
                          borderWidth: 2
                      },
                      {
                          label: "Ethereum Volume",
                          data: ethData,
                          borderColor: '#3C3C3C',
                          backgroundColor: 'rgba(60, 60, 60, 0.2)',
                          borderWidth: 2
                      }
                  ]
              },
              options: { responsive: true, maintainAspectRatio: false }
          });
      });
  } else {
      this.cryptoService.getHistoricalPrices(this.selectedCrypto.symbol === 'BTC' ? 1 : 2, formattedStartDate, formattedEndDate)
          .subscribe(prices => {
              if (!prices?.length) {
                  return;
              }

              const labels = prices.map(p => new Date(p.date).toLocaleDateString());
              const dataPoints = prices.map(p => p.volume);

              this.chart = new Chart(this.chartCanvas.nativeElement.getContext('2d')!, {
                  type: 'line',
                  data: {
                      labels,
                      datasets: [{
                          label: `${this.selectedCrypto?.name} Trading Volume (USD)`,
                          data: dataPoints,
                          borderColor: this.selectedCrypto?.symbol === 'BTC' ? '#FF9900' : '#3C3C3C',
                          backgroundColor: this.selectedCrypto?.symbol === 'BTC' ? 'rgba(255, 153, 0, 2)' : 'rgba(60, 60, 60, 0.2)',
                          borderWidth: 2
                      }]
                  },
                  options: { responsive: true, maintainAspectRatio: false }
              });
          });
  }
}

  showBothCryptos() {
    this.selectedCrypto = null;
    this.updateChart();
  }
 
}
