import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, CheckboxControlValueAccessor, ValidationErrors, FormControl, FormGroup, Validators} from '@angular/forms';
import { userService } from 'src/app/servicios/userServices';

function validateCode(control: FormControl): ValidationErrors | null {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  const valid = passwordRegex.test(control.value);
  return valid ? null : { invalidPassword: true };
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit{

  value = 0;

  nombre: FormControl = new FormControl('', Validators.required);
  email:FormControl = new FormControl('', [Validators.email, Validators.required]);
  subject:FormControl = new FormControl('', Validators.required);
  description:FormControl = new FormControl('');
  numorder:FormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5), validateCode]); 

  FormOne: FormGroup = new FormGroup ({
    nombre: this.nombre,
    email: this.email,
    subject: this.subject,
    description: this.description,
    numorder: this.numorder
  });

  constructor(private userServices : userService){}

  ngOnInit(){}

  Click(data:User) {
    this.userServices.addUser(data).subscribe(data => console.log("data: " + data));

    if (this.nombre.value != "" && this.email.value != "" && this.subject.value != "" && this.numorder.value != "") {
      this.value=100;
    }
    if (this.nombre.value == "" || this.email.value == "" || this.subject.value == "" || this.numorder.value == "") {
      this.value=50;
    }
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