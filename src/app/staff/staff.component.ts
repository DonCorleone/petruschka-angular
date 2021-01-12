import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetStaffByName, GET_STAFF_BY_NAME, Staff } from '../models/staff.models';
import { } from '../staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  staff$: Observable<Staff>;

  constructor(private route: ActivatedRoute, private  apollo : Apollo, private sanitizer: DomSanitizer ) { }

  @Input() staffName:string;

  ngOnInit(): void {

    this.route.params
      .pipe(map(p => p.staffName))
      .subscribe(id => {
        this.staff$ = this.apollo
        .watchQuery<GetStaffByName>({
          query: GET_STAFF_BY_NAME,
          variables: {
            name: id
          },})
        .valueChanges.pipe(map((result) => result.data.staff));
      })
  }

  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }

  GetImageUrl(name: string): string {
    return '../assets/images/' + encodeURIComponent(name) + '.jpg'
  }
}
