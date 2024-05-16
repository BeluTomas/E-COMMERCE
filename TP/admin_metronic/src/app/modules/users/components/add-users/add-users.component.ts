import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../_services/users.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  @Output() UserC:EventEmitter<any> = new EventEmitter();
  name:any = null;
  surname: any = null;
  email:any = null;
  password:any = null;
  repeat_password:any = null;

  constructor(
    public modal: NgbActiveModal,
    public userService: UsersService,
    public toaster: Toaster,
  ) { }

  ngOnInit(): void {
  }
  save(){
    if(!this.name || this.surname || this.email || this.password || this.repeat_password){
      //TODOS LOS CAMPOS SON OBLIGATORIOS
      this.toaster.open(NoticyAlertComponent,{text:`danger- 'Ups! necesitas agregar todos los campos.'`});
      return;
    }
    if (this.password != this.repeat_password){
      this.toaster.open(NoticyAlertComponent,{text: `danger- 'Ups! necesitas ingresar contraseñas iguales.'`});
      return;
    }
    let data = {
      name: this.name,
      surname: this.surname,
      email:this.email,
      password:this.password,
      repeat_password: this.repeat_password,
    }
    this.userService.createUser(data).subscribe((resp:any)=> {
      console.log(resp);
      this.UserC.emit(resp.user);
      this.toaster.open(NoticyAlertComponent,{text:`success- 'El usuario se registro correctamente'`});
      this.modal.close;
    }), (error) => { 
      if(error.error){
        this.toaster.open(NoticyAlertComponent,{text:`danger-'${error.error.message} '`});
      }
    }
  }
}
