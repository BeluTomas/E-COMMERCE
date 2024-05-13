import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email:string = "";
  password:string = "";

  constructor(
    public authService : AuthService,
    public router: Router,
  ) {}

  ngOnInit(): void{
    console.log(this.authService.user);
  }
  
  login(){
    if(!this.email){
      alert("ES NECESARIO INGRESAR EL EMAIL");
    }
    if (! this.password){
      alert("ES NECESARIO INGRESAR UNA CONTRASEÑA");
    }

    this.authService.login(this.email,this.password).subscribe({
      next: (resp:any) => {
        console.log(resp);
        if (!resp.error && resp){
          //QUE EL USUARIO INGRESO CON EXITO
          this.router.navigate(["/"]);
        }else {
          alert(resp.error.message);
        }
      }
    });
  }
}
