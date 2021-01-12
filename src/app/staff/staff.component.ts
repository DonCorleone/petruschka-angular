import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Staff } from '../models/staff.models';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  staff$: Observable<Staff>;

  constructor(private route: ActivatedRoute, private staffService: StaffService, private sanitizer: DomSanitizer ) { }

  @Input() staffName:string;

  ngOnInit(): void {

    this.route.params
      .pipe(map(p => p.staffName))
      .subscribe(nameIn => {
        this.staff$ = this.staffService.GetStaff(nameIn);
      })
  }

  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }

  GetImageUrl(name: string): string {
    return '../assets/images/' + encodeURIComponent(name) + '.jpg'
  }
}
