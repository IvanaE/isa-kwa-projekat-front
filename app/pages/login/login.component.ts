import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from "../../service/login.service";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup;
  public hide = true;

  constructor(public fb: UntypedFormBuilder, public router: Router, public loginService: LoginService, public appService: AppService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public onLoginFormSubmit(values: Object): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(r => {
        this.router.navigate(['/']);
      }, error => {
        this.appService.openAlertDialog('Neuspesan login');
      });
    }
  }

}
