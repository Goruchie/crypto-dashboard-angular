import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingVolumeTrendsComponent } from './trading-volume-trends.component';

describe('TradingVolumeTrendsComponent', () => {
  let component: TradingVolumeTrendsComponent;
  let fixture: ComponentFixture<TradingVolumeTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradingVolumeTrendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradingVolumeTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
