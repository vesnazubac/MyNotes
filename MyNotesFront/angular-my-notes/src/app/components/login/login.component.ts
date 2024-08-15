import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { Login } from '../../models/login';
import { UserService } from '../../services/users/user.service';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(
    private router: Router,private snackBar: MatSnackBar,private userService:UserService) {}

  hide=true;
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  navigateToHome() {
    const username = this.usernameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    console.log('Username:', username);
    console.log('Password:', password);
    this.router.navigate(['home']);
  }

  login(): void {
    if(this.loginForm.valid) {
      const login: Login = {
        username: this.loginForm.value.username || "",
        password: this.loginForm.value.password || ""
      }


      this.userService.login(login).subscribe(
        response => {
          // Handle successful login (e.g., store token, redirect)
          console.log('Login successful:', response);
          this.navigateToHome();
        },
        error => {
          // Handle login error
          console.error('Login failed:', error);
          this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
            duration: 3000
          });
        }
      );
    }
  }


  register(){
    this.router.navigate(['register'])
  }
}
