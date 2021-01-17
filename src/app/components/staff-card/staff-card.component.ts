import { Component, Input, OnInit } from '@angular/core';
import { Staff } from 'src/app/models/staff.models';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.scss']
})
export class StaffCardComponent implements OnInit {

  @Input() staff:Staff;

  constructor() { }

  ngOnInit(): void {
  }

  GetImageUrl(name: string): string {
    return '../assets/images/' + encodeURIComponent(name) + '.jpg'
  }
}
