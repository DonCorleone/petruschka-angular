import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventGroupEventEvent, EventInfo, GetEventGroupById, GetEventInfoById, GetEventsByGroupId } from '../event.service';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { EventGroup } from '../event-groups.service';
import { Apollo, gql } from 'apollo-angular';
import { DomSanitizer } from '@angular/platform-browser';

const GET_EVENTGROUP_BYID = gql`
  query GetEventGroupById($id: Int!) {
    eventGroup (query:{_id:$id}){
      name,
      _id,
      bannerImagePath
    }
  }
`;

const GET_EVENTS_BYGROUPID = gql`
  query GetEventsByGroupId($eventGroupId: Int!){
    eventGroupEvents(query:{eventGroupId:$eventGroupId}){
      eventGroupId
      events{
        _id
        name
        start
      }
    }
  }
`;

const GET_EVENTINFO_BYID = gql`
  query GetEventByGroupId($eventId: Int!){
    eventDetails(query:{_id:$eventId}){
      eventInfos{
        languageId
        shortDescription
        longDescription
        address
        location
        bannerImagePath
        artists
      }
    }
  }
`;

interface job {
  name: string,
  jobsharers: string[]
}

@Component({
  selector: 'app-eventgroup-details',
  templateUrl: './eventgroup-details.component.html',
  styleUrls: ['./eventgroup-details.component.scss']
})
export class EventgroupDetailsComponent implements OnInit {

  eventgroup: EventGroup;
  eventInfos$: Observable<EventGroupEventEvent[]>;
  eventInfoPrototype: EventInfo;
  artistsArray: job[];

  get locationName() {
    return (this.eventInfoPrototype && this.eventInfoPrototype.location) ? this.eventInfoPrototype.location : null;
  }

  get artists() {
    return (this.artistsArray && this.artistsArray.length > 0) ? this.artistsArray : null;
  }

  get plot() {
    return (this.eventInfoPrototype && this.eventInfoPrototype.longDescription) ? this.transformHtml(this.eventInfoPrototype.longDescription) : null;
  }

  get flyerImagePath() {
    return (this.eventInfoPrototype && this.eventInfoPrototype.bannerImagePath) ? this.eventInfoPrototype.bannerImagePath : null;
  }

  private querySubscription: Subscription;

  constructor(
    private route: ActivatedRoute, private  apollo : Apollo, private sanitizer: DomSanitizer ) { }

  // tslint:disable-next-line:no-inferrable-types
  @Input() showBuyButton: boolean = true;

  ngOnInit(): void {
    this.route.params
      .pipe(map(p => p.eventgroupId))
      .subscribe(id => {
        this.querySubscription = this.apollo
        .watchQuery<GetEventGroupById>({
          query: GET_EVENTGROUP_BYID,
          variables: {
            id: id,
          },
        })
        .valueChanges.subscribe(({data}) => {
          this.eventgroup = data.eventGroup;
        });

        this.eventInfos$ = this.apollo
        .watchQuery<GetEventsByGroupId>({
          query: GET_EVENTS_BYGROUPID,
          variables: {
            eventGroupId: id,
          },
        })
        .valueChanges
          .pipe(map((result) => result.data.eventGroupEvents))
          .pipe(map(p => p[0].events))
      });

    this.eventInfos$
      .pipe(map(p => p[0]._id))
      .subscribe(id => {
        this.querySubscription = this.apollo
        .watchQuery<GetEventInfoById>({
          query: GET_EVENTINFO_BYID,
          variables: {
            eventId: id,
          },
        })
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
}
