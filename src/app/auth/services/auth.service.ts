import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthResponse, IUser } from 'src/app/shared/interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = null;

  constructor(private http: HttpClient) {}

  register(user: IUser): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>('/register', user);
  }

  login(user: IUser): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>('/login', user).pipe(
      tap(({ result }) => {
        localStorage.setItem('auth-token', result);
        this.setToken(result);
      })
    );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
