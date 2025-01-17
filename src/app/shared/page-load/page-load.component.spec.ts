import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageLoadComponent} from './page-load.component';

describe('PageLoadComponent', () => {
  let component: PageLoadComponent;
  let fixture: ComponentFixture<PageLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageLoadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
