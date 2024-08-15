import { AuthService } from './../services/auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Injectable, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../services/sidebar/sidebar.service';
import { CommonModule } from '@angular/common';

// @Injectable()
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatNavList,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class NavBarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidebarVisible = false;
  isSubmenuOpen = false;
  isDashboardSelected = false;

  constructor(private router: Router, private sidebarService: SidebarService,private authService:AuthService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar(); // Toggle sidebar state
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  selectDashboard() {
    this.isDashboardSelected = true;
  }


  toggleSidenav() {
    this.sidenav.toggle();
  }

   logout(): void {
    this.authService.logout()
  }
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
