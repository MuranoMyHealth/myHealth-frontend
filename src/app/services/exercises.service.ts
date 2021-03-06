import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReqExercises } from '../requests/req-exercises';
import { Sessions } from '../responses/sessions';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Session } from '../models/Session';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  readonly lsName = 'execSessions';
  private rootUrl: string;
  private sessions: Session[];
  constructor(private http: HttpClient) { }
  getCurrentSession(req: ReqExercises): Observable<Session> {
    return this.getExercises(req).pipe(map(x => {
      const date = new Date();
      const hour = new Date().getHours();
      const ss = this.sessions.find(s => s.hour === hour);
      if (ss) {
        return ss;
      } else {
        return new Session();
      }
    }));
  }
  getExercises(req: ReqExercises): Observable<Session[]> {
    if (!this.sessions) {
      const data = localStorage.getItem(this.lsName);
      if (data && data !== 'undefined') {
        this.sessions = JSON.parse(localStorage.getItem(this.lsName));
      }
      return this.http.get<Session[]>(environment.http_url + '/Session')
        .pipe(tap(x => { this.sessions = x; })
          , catchError(e => {
            return of(new Sessions().list);
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
