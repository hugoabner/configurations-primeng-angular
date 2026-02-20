import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { API_ENDPOINTS } from '../../constants/api-endpoint-constants';
import { AuthResponse, GoogleAuthResponse } from '../../interfaces/interface-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  private readonly AUTH_URL = environment.apiUrl + API_ENDPOINTS.AUTH.LOGIN;
  private readonly GOOGLE_OAUTH_URL = environment.apiUrl + API_ENDPOINTS.AUTH.GOOGLE_OAUTH;

  private karlosToken$?: Observable<string>;
  private googleToken$?: Observable<string>;

  public getKarlosToken(): Observable<string> {
    console.log("Obteniendo token de Karlos...");
    if (!this.karlosToken$) {
      const payload = {
        username: environment.auth.username,
        password: environment.auth.password,
      };
      this.karlosToken$ = this.http
        .post<AuthResponse>(this.AUTH_URL, payload)
        .pipe(
          map((res: AuthResponse) => {
            if ('token' in res) {
              return res.token;
            } else {
              throw new Error(res.message || 'Error al obtener el token de Karlos');
            }
          }),
          shareReplay(1),
        );
    }
    return this.karlosToken$;
  }


  public getGoogleToken(): Observable<string> {
    console.log("Obteniendo token de Google...");
    if (!this.googleToken$) {
      this.googleToken$ = this.getKarlosToken().pipe(
        switchMap((karlosToken) => {
          const headers = new HttpHeaders().set('X-Auth-Token', karlosToken);
          return this.http.get<GoogleAuthResponse>(this.GOOGLE_OAUTH_URL, { headers });
        }),
        map((res: GoogleAuthResponse) => {
          if ('access_token' in res) {
            return res.access_token;
          } else {
            throw new Error(res.message || 'Error al obtener el token de Google');
          }
        }),
        shareReplay(1),
      );
    }
    return this.googleToken$;
  }

  public clearTokens(): void {
    this.karlosToken$ = undefined;
    this.googleToken$ = undefined;
  }
}
