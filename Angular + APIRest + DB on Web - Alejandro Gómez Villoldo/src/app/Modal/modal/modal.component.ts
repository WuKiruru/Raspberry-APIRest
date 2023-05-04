import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, CheckboxControlValueAccessor, ValidationErrors, FormControl, FormGroup, Validators} from '@angular/forms';
import { userService } from 'src/app/servicios/userServices';

function validateCode(control: FormControl): ValidationErrors | null {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  const valid = passwordRegex.test(control.value);
  return valid ? null : { invalidPassword: true };
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  user: User[] = [];
  userId: any = "";
  userNombre: any = "";
  userEmail: any = "";
  userSubject: any = "";
  userDescription: any = "";
  userNumorder: any = "";

  value = 0;

  nombre: FormControl = new FormControl('', Validators.required);
  email:FormControl = new FormControl('', [Validators.email, Validators.required]);
  subject:FormControl = new FormControl('', Validators.required);
  description:FormControl = new FormControl('');
  numorder:FormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5), validateCode]); 

  FormTwo: FormGroup = new FormGroup ({
    nombre: this.nombre,
    email: this.email,
    subject: this.userSubject,
    description: this.userDescription,
    numorder: this.userNumorder
  });

  constructor(private userServices : userService){}

  ngOnInit(): void {
    this.userServices.getUsers().subscribe((user: User[]) => { this.user = user; this.userServices.getUsers() });
  }

  Click(data:User) {
    this.userServices.updateUser(data.id, data).subscribe(data => console.log("data: " + data));
    this.userServices.getUsers().subscribe((user: User[]) => { this.user = user; this.userServices.getUsers() });
  }
}

export interface User {
  id: BigInteger;
  nombre:string;
  email:string;
  subject:string;
  description:string;
  numorder:string;
}