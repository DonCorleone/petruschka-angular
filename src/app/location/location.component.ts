import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventLocation, GetEventLocationByName } from '../locations.service';

const GET_LOCATION_BY_NAME = gql`
  query GetLocationByName($name: String!) {
    eventLocation:location(query:{name:$name}){
      name
      street
      postalCode
      city
      directions
      info
    }
  }
`;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  eventLocation$: Observable<EventLocation>;
  constructor(private route: ActivatedRoute, private  apollo : Apollo, private sanitizer: DomSanitizer ) { }

  @Input() eventLocationName:String;

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

