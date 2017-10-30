import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResourceFileIndexComponent} from './resource-file-index.component';

describe('ResourceFileIndexComponent', () => {
  let component: ResourceFileIndexComponent;
  let fixture: ComponentFixture<ResourceFileIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceFileIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceFileIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
