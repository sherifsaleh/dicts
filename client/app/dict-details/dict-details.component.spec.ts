import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictDetailsComponent } from './dict-details.component';

describe('DictDetailsComponent', () => {
  let component: DictDetailsComponent;
  let fixture: ComponentFixture<DictDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
