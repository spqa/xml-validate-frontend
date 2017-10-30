import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResourceFileAddComponent} from './resource-file-add.component';

describe('ResourceFileAddComponent', () => {
  let component: ResourceFileAddComponent;
  let fixture: ComponentFixture<ResourceFileAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceFileAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceFileAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
