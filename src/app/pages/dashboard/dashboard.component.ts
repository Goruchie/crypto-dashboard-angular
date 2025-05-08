import { Component, inject, Input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrentValue } from '../../models/current-value';
import { CryptoService } from '../../components/crypto.service';
import { CommonModule } from '@angular/common';
import { CurrentValuesComponent } from "../../components/current-values/current-values.component";

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatButtonModule, CommonModule, CurrentValuesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  cryptoService = inject(CryptoService);
  cryptoCurrentValues = signal<CurrentValue[]>([]);


  constructor() {
    this.cryptoService.getAllCryptoPrices().then((data) => {
      this.cryptoCurrentValues.set(data);
    });
  }


}
