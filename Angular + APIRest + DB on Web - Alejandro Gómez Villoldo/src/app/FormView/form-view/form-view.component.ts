import { Component } from '@angular/core';
import { userService } from '../../servicios/userServices';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})

export class FormViewComponent {
  user: User[] = [];
  userId: any = "";
  userNombre: any = "";
  userEmail: any = "";
  userSubject: any = "";
  userDescription: any = "";
  userNumorder: any = "";

  nombre: FormControl = new FormControl('', Validators.required);
  email:FormControl = new FormControl('', [Validators.email, Validators.required]);

  FormTwo: FormGroup = new FormGroup ({
    nombre: this.nombre,
    email: this.email,
  });

  value = 0;

  visibility = true;

  constructor(private usersService: userService){}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((user: User[]) => { this.user = user; this.usersService.getUsers() });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (filterValue != "") {
      this.user = this.user.filter(user => user.nombre.toLowerCase().includes(filterValue));
    } else {
      this.usersService.getUsers().subscribe((user: User[]) => { this.user = user; this.usersService.getUsers() });
    }
  }

  recharge() {
    this.usersService.getUsers().subscribe((user: User[]) => { this.user = user; this.usersService.getUsers() });
  }

  deleteUser(id:BigInteger) {
    this.usersService.deleteUser(id).subscribe(id => console.log("USER " + id + "DELETED CORRECTLY"));
    this.recharge();
  }

  updateUser(id:BigInteger, data:User) { 
    this.usersService.updateUser(id, data).subscribe(id => console.log("USER MODIFY CORRECT"));
    this.recharge();
  }

  showDelete() {
    if (this.visibility != true) {
      this.visibility = true;
    } else {
      this.visibility = false;
    }
  }
}

export interface User {
  id: BigInteger;
  nombre: string;
  email: string;
  subject: string;
  description: string;
  numorder: string;
}