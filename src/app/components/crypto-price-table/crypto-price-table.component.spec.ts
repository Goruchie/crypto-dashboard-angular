import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoPriceTableComponent } from './crypto-price-table.component';

describe('CryptoPriceTableComponent', () => {
  let component: CryptoPriceTableComponent;
  let fixture: ComponentFixture<CryptoPriceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoPriceTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoPriceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
