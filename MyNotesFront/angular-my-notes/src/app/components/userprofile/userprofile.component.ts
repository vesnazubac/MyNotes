import { Component } from '@angular/core';
import { UserGetDTO } from '../../DTOs/users/userGetDTO copy';
import { ThemePalette } from '@angular/material/core';
import { SharedModule } from '../../common/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';
import { UserPutDTO } from '../../DTOs/users/userPutDTO';
import { User } from '../../models/user';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  user:UserGetDTO | undefined;
  color: ThemePalette = 'primary';
  loggedInUserId:any=''

  editAccountDataForm=new FormGroup({
    name: new FormControl('', Validators.required),
    surname:new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', Validators.required),
    username:new FormControl('', Validators.required),
  })
  hide=true;

  constructor(
    private userService:UserService,private authService:AuthService,private router: Router, private snackBar:MatSnackBar) {}

  ngOnInit() {
    this.loggedInUserId=this.authService.getUserIdFromToken()
    if (this.loggedInUserId) {
      this.userService.getById(this.loggedInUserId).subscribe(
        (user: UserGetDTO) => {
          if (user) {
            console.log('User:', user);
            this.editAccountDataForm.get('name')?.setValue(user.FirstName);
            this.editAccountDataForm.get('surname')?.setValue(user.LastName);
            this.editAccountDataForm.get('phoneNumber')?.setValue(user.phoneNumber);
            this.editAccountDataForm.get('address')?.setValue(user.Address);
            this.editAccountDataForm.get('username')?.setValue(user.UserName);
            this.editAccountDataForm.get('password')?.setValue(user.Password);
            this.editAccountDataForm.get('email')?.setValue(user.Email);
          } else {
            console.error('User not found');
          }
        },
        error => {
          console.error('Error fetching user:', error);
        }
      );
    } else {
      console.error('Error decoding JWT token');
    }

    }



  saveChanges(){
      const changedUser: UserPutDTO = {
        FirstName: this.editAccountDataForm.value.name ?? '',
        LastName:this.editAccountDataForm.value.surname ?? '',
        PhoneNumber: this.editAccountDataForm.value.phoneNumber ?? '',
        Address: this.editAccountDataForm.value.address ?? '',
        Password:this.editAccountDataForm.value.password ?? '',
        UserName:this.editAccountDataForm.value.username ?? '',
        Email:this.editAccountDataForm.value.email??'',
        ProfilePicture:''
      }


      this.userService.update(changedUser,this.loggedInUserId).subscribe(
        {
          next: (data: User) => {
            this.openSnackBar("User sucessfully updated!");
            this.router.navigate(['home'])
          },
        }
      );

    }

    openSnackBar(message: string) {
      this.snackBar.open(message, 'OK', {
        duration: 3000,
      });
    }



    get isFormValid(): boolean {
      return this.editAccountDataForm.valid;
  }

}
