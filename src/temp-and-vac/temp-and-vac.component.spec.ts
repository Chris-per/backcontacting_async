import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempAndVacComponent } from './temp-and-vac.component';
import { CommonModule } from '@angular/common';

describe('TempAndVacComponent', () => {
  let component: TempAndVacComponent;
  let fixture: ComponentFixture<TempAndVacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TempAndVacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempAndVacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
