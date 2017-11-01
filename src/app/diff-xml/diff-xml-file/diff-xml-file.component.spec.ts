import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiffXmlFileComponent} from './diff-xml-file.component';

describe('DiffXmlFileComponent', () => {
  let component: DiffXmlFileComponent;
  let fixture: ComponentFixture<DiffXmlFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiffXmlFileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffXmlFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
