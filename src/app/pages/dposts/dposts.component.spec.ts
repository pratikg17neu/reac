import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpostsComponent } from './dposts.component';

describe('DpostsComponent', () => {
  let component: DpostsComponent;
  let fixture: ComponentFixture<DpostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DpostsComponent]
    });
    fixture = TestBed.createComponent(DpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
