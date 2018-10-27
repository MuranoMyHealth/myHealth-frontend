import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReqExercises } from '../requests/req-exercises';
import { Sessions } from '../responses/sessions';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  readonly lsName = 'execSessions';
  private rootUrl: string;
  private sessions: Sessions;
  constructor(private http: HttpClient) { }
  getExercises(req: ReqExercises): Observable<Sessions> {
    if (!this.sessions) {
      const data = localStorage.getItem(this.lsName);
      if (data && data !== 'undefined') {
        this.sessions = JSON.parse(localStorage.getItem(this.lsName));
      }
      const param = new HttpParams;
      param.set('userId', req.userId);
      return this.http.get<Sessions>(environment.http_url + '/exercises', { params: param })
        .pipe(tap(x => { this.sessions = x; })
          , catchError(e => {
            return of(new Sessions);
          }
          )).pipe(tap((x) => {
            this.sessions = x;
            if (this.sessions) {
              localStorage.setItem(this.lsName, JSON.stringify(this.sessions));
            }
          }));
    }
    return of(this.sessions);
  }
}
