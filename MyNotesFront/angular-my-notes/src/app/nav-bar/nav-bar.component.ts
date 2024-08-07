import { ChangeDetectorRef, Component, Injectable, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';



@Injectable()
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports:[MatToolbarModule,MatIconModule,MatButtonModule,RouterModule],
  standalone:true
})
export class NavBarComponent {
//   constructor(private authService: AuthService) {}
//   user:UserGetDTO;
//   role: RoleEnum ;
//  // private cdr: ChangeDetectorRef;


//   ngOnInit(): void {


//     this.authService.userState.subscribe((result) => {
//       if(result != null){
//         this.role = result.role;
//       }else{
//        this.role=RoleEnum.UNAUTHENTICATED;
//       }
//      // this.cdr.detectChanges();
//     })
//   }

//   logout(): void {
//     console.log("LOG OUT ")
//     this.authService.logout();
//   }

//   isLoggedIn(): boolean {
//     return this.authService.isLoggedIn();
//   }

//   isAdmin(): boolean {
//     console.log("USAO U IS ADM")
//     console.log('ROLA JE ', this.role)

//     return this.authService.getRole() == RoleEnum.ADMIN;
//   }

//   isGuest(): boolean {
//     return this.authService.getRole() == RoleEnum.GUEST;
//   }

//   isOwner(): boolean {
//     return this.authService.getRole() == RoleEnum.OWNER;
//   }


 }




