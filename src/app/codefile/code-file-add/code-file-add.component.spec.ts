import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CodeFileAddComponent} from './code-file-add.component';

describe('CodeFileAddComponent', () => {
  let component: CodeFileAddComponent;
  let fixture: ComponentFixture<CodeFileAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodeFileAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeFileAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
