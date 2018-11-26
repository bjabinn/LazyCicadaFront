import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { User } from '../../models/User/user';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    private isNotMocked: boolean = false;
    private delayTIme: number = 0;
    // while mocked ==> mocked = true
    private users: User[] = [
        {id: 0, userName: 'pepe', password: '123456', token: 'sfdhsdhfashdviubiu'},
        {id: 1, userName: 'juan', password: '123456', token: 'jjskalllsjkjadncllla'},
        {id: 2, userName: 'yo', password: '123456', token: 'dfasgvfa4awefsadv54ccq'},
        {id: 3, userName: 'jorge', password: '123456', token: 'asdvrfva3rwgfescce5'}
    ];

    constructor(private http: HttpClient) { }

    public getAll(): Observable<User[]> {
        let allObservable: Observable<User[]> = of(this.users).pipe(delay(this.delayTIme));
        if ( this.isNotMocked ) {
            allObservable = this.http.get<User[]>(`${environment.apiUrl}/users`);
        }
        return allObservable;
    }

    public getById(id: number): Observable<User> {
        let userByIdObservable: Observable<User> = Observable.create(this.users.find(user => user.id === id));
        if ( this.isNotMocked) {
            userByIdObservable = this.http.get<User>(`${environment.apiUrl}/users/${id}`);
        }
        return userByIdObservable;
    }

    public register(user: User): Observable<User>  {
        user.id = this.users[this.users.length - 1].id++;
        let registeredUser: Observable<User> = Observable.create(this.users.push(user));
        if ( this.isNotMocked ) {
            registeredUser = this.http.post<User>(`${environment.apiUrl}/users/register`, user);
        }
        return registeredUser;
    }

    public update(user: User): Observable<User>  {
        const index = this.users.findIndex(element => element.id === user.id);
        this.users[index] = user;
        let updatedUser: Observable<User> = Observable.create(this.users[index]);
        if ( this.isNotMocked ) {
            updatedUser = this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, user);
        }
        return updatedUser;
    }

    public delete(id: number): Observable<User>  {
        const user: User =  this.users.splice(this.users.findIndex( element => element.id === id ), 1)[0];
        let deletedUser: Observable<User> = Observable.create(user);
        if ( this.isNotMocked ) {
            deletedUser = this.http.delete<User>(`${environment.apiUrl}/users/${id}`);
        }
        return deletedUser;
    }

    public SignUpMe(user: User): Observable<User> {
        let signUpMeUser: Observable<User> = <Observable<User>> {};
        if ( this.isNotMocked) {
            signUpMeUser = this.http.post<User>(`${environment.apiUrl}Token`, user);
        }
        return signUpMeUser;
      }
}
