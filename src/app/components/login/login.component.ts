import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators,} from '@angular/forms';
import {UserService} from '../../Services/UserService/user.service';
import { Router } from '@angular/router';
import {MatSnackBar,
  MatSnackBarConfig,
MatSnackBarHorizontalPosition,
MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public isActive: boolean;
  loginForm:FormGroup
  public EmailTld: string = '@gmail.com';
  action: boolean = false;
  setAutoHide: boolean = false;
  autoHide: number = 10000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private formBuilder:FormBuilder, private userSevice:UserService,
    public snackBar: MatSnackBar, private route: Router) { 
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required
        ]),
        password:  new FormControl('', [Validators.required
        ]),}
    );   
    this.isActive = true;
  } 
  ngOnInit(): void {
  }
  TogglePassword(){
    this.isActive = this.isActive ? false : true 
  }
  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }

  login(){
    if(this.loginForm.valid){
      this.openSnackBar('Login in...', 0);
      let reqData ={
        Email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.userSevice.login(reqData).subscribe(
        (response: any) => {
          localStorage.setItem('BookStore', response['customer']['token']);
          this.openSnackBar('Login success', 2000);
          this.route.navigate(['dashboard']);
        },
        error => {
          try {
            if(error['status'] == 0){
              this.openSnackBar('Login failed: server offline', 2000,);
            }
            else{
              this.openSnackBar('Login failed: '+error['error']['message'], 2000);
            }
            } 
            catch (error) {
          }
        });
    } 
  }
}
