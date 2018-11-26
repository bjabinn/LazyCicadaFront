import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/User/user';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private messageUser: Subject<User>;
  private messengerUser$: Observable<User>;

  constructor() {
    this.messageUser = new Subject<User>();
    this.messengerUser$ = this.messageUser.asObservable();
  }

  public getUserMessage(): Observable<User> {
    return this.messengerUser$;
  }

  public setUserMessage(message: User): void {
    this.messageUser.next(message);
  }
}
