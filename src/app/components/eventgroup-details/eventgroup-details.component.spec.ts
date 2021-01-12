import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventgroupDetailsComponent } from './eventgroup-details.component';

describe('EventgroupDetailsComponent', () => {
  let component: EventgroupDetailsComponent;
  let fixture: ComponentFixture<EventgroupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventgroupDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventgroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
