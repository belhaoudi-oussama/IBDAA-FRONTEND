import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class GroupComponent implements OnInit {
  mediaSub : Subscription | undefined;
  activeMediaQuery : string = '';
  constructor() { }

  ngOnInit(): void {

  }

}
