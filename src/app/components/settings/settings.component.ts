import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';

class Hour {
  constructor(public value: number = 0, public viewValue: string = '0:00') { }
}

@Component({
  selector: 'mh-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  hoursFrom: Hour[] = [];
  hoursTo: Hour[] = [];
  from: number;
  to: number;
  constructor() { }

  ngOnInit() {
    range(0, 23).subscribe(x => {
      this.hoursFrom.push(new Hour(x, x + ':00'));
      this.hoursTo.push(new Hour(x, x + ':00'));
    });
  }
  onChange() {
    if (this.from) {
      range(this.from, 23).subscribe(x => {
        this.hoursTo.push(new Hour(x, x + ':00'));
      });
    }
    if (this.to) {
      range(0, this.to).subscribe(x => {
        this.hoursTo.push(new Hour(x, x + ':00'));
      });
    }
  }

}
