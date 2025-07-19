import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { BehaviorSubject, Observable } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

// Local storage key for storing authentication data(saved user profile)
const Auth_Data= 'auth_data';

@Injectable({
    providedIn: 'root'
})
export class AuthStore {
    private subject = new BehaviorSubject<User>(null);
    user$: Observable<User>=this.subject.asObservable();
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private http: HttpClient) {
        // Initialize isLoggedIn$ and isLoggedOut$ based on user$
        this.isLoggedIn$ = this.user$.pipe(map(user => !!user));//true if user is not null
        this.isLoggedOut$ = this.user$.pipe(map(loggedIn => !loggedIn));

        const user=localStorage.getItem(Auth_Data); // Retrieve user profile from local storage
        if (user) {
            this.subject.next(JSON.parse(user)); // Load user from local storage
        } 
    }



    //store user profile to survive page reloads
    //emit a new user object when the user logs in
    //emit a new boolean value when the user logs in or out
    login(email: string, password: string): Observable<User> {
        // Implementation for login
       return this.http.post<User>('/api/login', { email, password })
        .pipe(
            tap(user => {
                this.subject.next(user),
                localStorage.setItem(Auth_Data, JSON.stringify(user)); // Save user profile to local storage
            }),
            shareReplay(), //avoid multiple HTTP requests for multiple subscribers
        )
    }

    logout() {

        // Implementation for logout
        this.subject.next(null); // Clear the user profile
        localStorage.removeItem(Auth_Data); // Remove user profile from local storage
    }
}
