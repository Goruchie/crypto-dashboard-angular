import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrentValue } from '../../models/current-value';

@Component({
  selector: 'app-current-values',
  imports: [ MatCardModule, MatButtonModule, CommonModule, RouterModule],
  templateUrl: './current-values.component.html',
  styleUrl: './current-values.component.css'
})
export class CurrentValuesComponent {

  @Input({ required: true }) currentValues!: CurrentValue;
  @Output() cryptoSelected = new EventEmitter<CurrentValue>(); 

  selectCrypto() {
    this.cryptoSelected.emit(this.currentValues);
  }


}
