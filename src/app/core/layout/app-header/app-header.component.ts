import { Component, OnInit } from '@angular/core';
import { environment } from "@env/environment";

interface NavMenuItem {
  label: string;
  path: string;
}

@Component({
  selector: 'fed-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  navMenu: NavMenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this._createNavMenu();
  }

  private _createNavMenu() {
    this.navMenu.push(
      {
        label: environment.routes.signup.title,
        path: `/${environment.routes.signup.path}`
      }
    )
  }
}
