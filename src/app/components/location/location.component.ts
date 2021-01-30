import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationsService } from '../../services/locations.service';
import { EventLocation } from '../../models/location.models';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  eventLocation$: Observable<EventLocation>;

  constructor(private route: ActivatedRoute, private locationsService: LocationsService, private sanitizer: DomSanitizer ) { }

  @Input() eventLocationName:string;

  GetImageUrl(name: string): string{
    return '../assets/images/' + encodeURIComponent(name) + '.jpg'
  }
  ngOnInit(): void {

    this.route.params
      .pipe(map(p => p.eventLocationName))
      .subscribe(id => {
        this.eventLocation$ = this.locationsService.GetEventLocation(id);
      })
  }
  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }
}

