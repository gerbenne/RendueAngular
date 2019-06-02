import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TapPageComponent } from './tap-page.component';

describe('TapPageComponent', () => {
  let component: TapPageComponent;
  let fixture: ComponentFixture<TapPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
