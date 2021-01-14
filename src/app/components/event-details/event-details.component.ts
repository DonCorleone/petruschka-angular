import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { EventGroupEventEvent} from '../../models/event-group-event.models';
import { EventDetailEventInfo} from '../../models/event.models';
import { EventGroup } from '../../models/event-group.models';
import { EventGroupsService } from 'src/app/services/event-groups.service';
import { EventEventGroupService } from 'src/app/services/event-event-group.service';

interface job {
  name: string,
  jobsharers: string[]
}

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  eventgroup: EventGroup;
  eventInfos$: Observable<EventGroupEventEvent[]>;
  eventInfoPrototype: EventDetailEventInfo;
  artistsArray: job[];

  get locationName() : string {
    return (this.eventInfoPrototype && this.eventInfoPrototype.location) ? this.eventInfoPrototype.location : null;
  }

  get artists() : job[] {
    return (this.artistsArray && this.artistsArray.length > 0) ? this.artistsArray : null;
  }

  get plot() {
    return (this.eventInfoPrototype && this.eventInfoPrototype.longDescription) ? this.transformHtml(this.eventInfoPrototype.longDescription) : null;
  }

  get flyerImagePath() : string {
    return (this.eventInfoPrototype && this.eventInfoPrototype.bannerImagePath) ? this.eventInfoPrototype.bannerImagePath : null;
  }

  get usage(): string {
    return "Premiere";
  }

  get locationLabel (): string{
    if (this.usage == "Premiere") {
      return "Spielstätte";
    } else {
      return "Das Stück wurde aufgeführt im";
    }
  }

  private querySubscription: Subscription;

  constructor(
    private route: ActivatedRoute, private eventService: EventService,
    private eventGroupsService: EventGroupsService, private eventEventGroupsService: EventEventGroupService,
    private sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(map(p => p.eventgroupId))
      .subscribe(id => {
        this.querySubscription = this.eventGroupsService.GetEventGroup(id)
        .valueChanges.subscribe(({data}) => {
          this.eventgroup = data.eventGroup;
        });

        this.eventInfos$ = this.eventEventGroupsService.GetEventGroupEvents(id);
      });

    this.eventInfos$
      .pipe(map(p => p[0]._id))
      .subscribe(id => {
        this.querySubscription = this.eventService.GetEventInfo(id)
        .valueChanges.subscribe(({data}) => {
          this.eventInfoPrototype = data.eventDetails[0].eventInfos.find(p => p.languageId == 1);
          this.artistsArray = this.GetStaffLinks(this.eventInfoPrototype.artists);
        });
    });
  }

  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }

  GetStaffLinks(staff: string): job [] {

    let jobs = staff.split('|');
    let returnval: job [] = [];

    jobs.forEach(job => {
    let ixOfSplitter = job.indexOf(':');

      let jobsharerArray: string[] = [];

      let jobdesc: string = job.slice(0, ixOfSplitter);
      let jobsharers = job.substring(ixOfSplitter + 1).split('&');

      jobsharers.forEach(jobsharePartner => {

        jobsharerArray.push(jobsharePartner.trim());
      });

      var jobObject: job = {
        name: jobdesc.trim(),
        jobsharers: jobsharerArray
      }

      returnval.push(jobObject)
    });

    return returnval;
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
