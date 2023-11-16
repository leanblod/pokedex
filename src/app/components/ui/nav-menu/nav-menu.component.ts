import { Component, Input } from '@angular/core';

export interface Link {
  title: string;
  routerLink: string;
}

@Component({
  selector: 'poke-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  @Input({ required: true }) links: Link[] = [];

}
