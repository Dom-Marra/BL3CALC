import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('openClose', [
        state('open', style({
            visibility: 'visible',
            opacity: 1
        })),
        transition('open=>closed', animate('200ms ease-out')),
        transition('closed=>open', animate('200ms ease-in'))
    ])
  ]
})

export class NavbarComponent implements OnInit {

  private navState = 'closed';            //current state of the navbar when in mobile, used for animations

  constructor() { }

  ngOnInit() {
  }

  /**
   * Toggles between open and closed for nav menu
   *  toggles class for menu button for its animation
   */
  toggleMenuIcon() {
    document.getElementById('menu').classList.toggle('activated');
    this.navState === 'closed' ? this.navState = 'open' : this.navState = 'closed';
  }

}
