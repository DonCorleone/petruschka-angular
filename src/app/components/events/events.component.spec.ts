import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGroupsComponent } from './events.component';

describe('EventGroupsComponent', () => {
  let component: EventGroupsComponent;
  let fixture: ComponentFixture<EventGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
