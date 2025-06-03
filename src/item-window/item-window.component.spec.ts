import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWindowComponent } from './item-window.component';

describe('ItemWindowComponent', () => {
  let component: ItemWindowComponent;
  let fixture: ComponentFixture<ItemWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
