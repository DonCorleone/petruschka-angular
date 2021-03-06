import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailCardComponent } from './event-detail-card.component';

describe('EventGroupCardComponent', () => {
  let component: EventDetailCardComponent;
  let fixture: ComponentFixture<EventDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
