import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CodeFileIndexComponent} from './code-file-index.component';

describe('CodeFileIndexComponent', () => {
  let component: CodeFileIndexComponent;
  let fixture: ComponentFixture<CodeFileIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodeFileIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeFileIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
