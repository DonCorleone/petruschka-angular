import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { } from '../locations.service';
import { EventLocation, GetEventLocationByName, GET_LOCATION_BY_NAME } from '../models/location.models';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  eventLocation$: Observable<EventLocation>;
  constructor(private route: ActivatedRoute, private  apollo : Apollo, private sanitizer: DomSanitizer ) { }

  @Input() eventLocationName:string;

  GetImageUrl(name: string): string{
    return '../assets/images/' + encodeURIComponent(name) + '.jpg'
  }
  ngOnInit(): void {

    this.route.params
      .pipe(map(p => p.eventLocationName))
      .subscribe(id => {
        this.eventLocation$ = this.apollo
        .watchQuery<GetEventLocationByName>({
          query: GET_LOCATION_BY_NAME,
          variables: {
            name: id
          },})
        .valueChanges.pipe(map((result) => result.data.eventLocation));
      })
  }
  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }
}

