import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictAddComponent } from './dict-add.component';

describe('DictAddComponent', () => {
  let component: DictAddComponent;
  let fixture: ComponentFixture<DictAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
