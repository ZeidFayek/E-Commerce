import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {

  constructor( private _ForgetPasswordService:ForgetPasswordService , private _Router:Router ){}

  phase1:boolean = true
  phase2:boolean = false
  phase3:boolean = false
  email:string = ''
  msg:any = null

  forgetForm:FormGroup = new FormGroup({
    email:new FormControl('' , [Validators.required , Validators.email])
  })

  forgotPassword():void{
    let userEmail = this.forgetForm.value
    this.email = userEmail.email
    
    this._ForgetPasswordService.forgetPassword(userEmail).subscribe({
      next:(response)=>{
        this.msg = response.message
        this.phase1 = false
        this.phase2 = true
      },
      error:(err)=>{
        this.msg = err.error.message
      }
    })
  }

  
  resetCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl('' , [Validators.required])
  })
  
  resetCode():void{
    let resetCode = this.resetPasswordForm.value
    
    this._ForgetPasswordService.resetCode(resetCode).subscribe({
      next:(response)=>{
        this.msg = response.message
        this.phase2 = false
        this.phase3 = true
        console.log(response);
        
      },
      error:(err)=>{
        this.msg = err.error.message
        console.log(err);
        
      }
    })
  }

  
  resetPasswordForm:FormGroup = new FormGroup({
    newPassword:new FormControl('' , [Validators.required , Validators.pattern(/^\w{6,}$/)])
  })

  resetPassword():void{
    let resetForm = this.resetPasswordForm.value
    resetForm.email = this.email

    this._ForgetPasswordService.resetPassword(resetForm).subscribe({
      next:(response)=>{
        if (response.token) {
          localStorage.setItem('_token' , response.token)
          this._Router.navigate(['/home'])
        }
      },
      error:(err)=>{
        this.msg = err.error.message
      }
    })
  }
}
