import { Component, OnInit } from '@angular/core';
import localeDeCH from '@angular/common/locales/de-CH';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    registerLocaleData(localeDeCH, 'de-CH');
  }
  title = 'petruschka-scully';
}
