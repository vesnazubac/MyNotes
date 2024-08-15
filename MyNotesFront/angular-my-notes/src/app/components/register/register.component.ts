import { ChangeDetectorRef, Component } from '@angular/core';
import {FormControl, Validators, FormGroup, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import {ThemePalette } from '@angular/material/core';
import { UserPostDTO } from '../../DTOs/users/userPostDTO';
import { SharedModule } from '../../common/shared.module';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  color: ThemePalette = 'primary';
  button_enabled=false;


  createRegisterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    address: new FormControl('', Validators.required),
    email:  new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  }, { validators: this.passwordMatchValidator });

  hide = true;

  constructor(private cdr: ChangeDetectorRef,private userService: UserService, private router: Router) {

  }

  ngOnInit(){

  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  register() {
    this.button_enabled=true;
      const user: UserPostDTO = {
        firstName: this.createRegisterForm.value.name,
        lastName:this.createRegisterForm.value.surname,
        phoneNumber: this.createRegisterForm.value.phoneNumber,
        address: this.createRegisterForm.value.address,
        username:this.createRegisterForm.value.username,
        email:this.createRegisterForm.value.email,
        password:this.createRegisterForm.value.password,
        passwordConfirmation:this.createRegisterForm.value.confirmPassword,
      }
      this.userService.register(user).subscribe(
        {
          next: (data: UserPostDTO) => {
            console.log("Uspesno registrovan :" , user)
            this.router.navigate(['home'])
          },
        }
      );

    this.cdr.markForCheck();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get isFormValid(): boolean {
    return this.createRegisterForm.valid;
}
}
