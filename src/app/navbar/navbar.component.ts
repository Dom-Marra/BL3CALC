import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
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

  public navState = 'closed';            //current state of the navbar when in mobile, used for animations
  public menuIcon = 'menu';

  constructor(private router: Router) { 

    //On router event
    this.router.events.subscribe(e => {

      //If the event is a url change and nav is open, then close it
      if (e instanceof NavigationStart) {
        if (this.navState == 'open') this.toggleMenuIcon();
      }
    });
  }

  ngOnInit() {
  }

  /**
   * Closes nav if its open when window is resized passed 768px
   */
  onResize() {
    if (window.innerWidth > 768) {
      if (this.navState == 'open') this.toggleMenuIcon();
    }
  }

  /**
   * Toggles between open and closed for nav menu
   *  toggles class for menu button for its animation
   */
  toggleMenuIcon() {
    document.body.style.overflow = document.body.style.overflow == 'hidden' ? 'initial' : 'hidden';
    if (this.navState === 'closed') {
      this.navState = 'open';
      this.menuIcon = 'x';
    } else {
      this.navState = 'closed';
      this.menuIcon = 'menu';
    }
  }

}
