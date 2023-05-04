import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class userService {
    constructor(private http: HttpClient) { }
    users: User[] = [];
    //private urlService = 'http://172.16.22.99:8080/user';
    //private urlService = 'http://192.168.1.91:8080/user';
    private urlService = 'http://172.16.22.46:8080/user';

    /*public sendInformation(nombre:string, email:string, subject:string, description:string, order:string):Observable<User[]>{
        if(nombre != "" && email != "" && subject != "" && order != ""){
            this.users.push({nombre:nombre, email:email, subject:subject, description:description, order:order});
        }
        return of(this.users);
    }
    */

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.urlService);
    }

    addUser(user: User): Observable<User> {
        console.log(user);
        return this.http.post<User>(this.urlService, user);
    }

    updateUser(id: BigInteger, user: User): Observable<User> {
        return this.http.put<User>(`${this.urlService}/${id}`, user);
    }

    deleteUser(id: BigInteger): Observable<any> {
        return this.http.delete(`${this.urlService}/${id}`);
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