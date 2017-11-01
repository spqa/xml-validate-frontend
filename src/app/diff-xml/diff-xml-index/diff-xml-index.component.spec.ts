import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiffXmlIndexComponent} from './diff-xml-index.component';

describe('DiffXmlIndexComponent', () => {
  let component: DiffXmlIndexComponent;
  let fixture: ComponentFixture<DiffXmlIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiffXmlIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffXmlIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
