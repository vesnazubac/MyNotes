import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  hideNavBar: boolean = true;
}
