import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { timer, concat } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../api-response';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getData() {

    // A cada 15 segundos atualiza o horarío na view (tempos menores ocasionarão HTTP 409)

    const firstInterval = timer(1);
    const secondInterval = interval(15000);

    return concat(firstInterval, secondInterval)
      .pipe(switchMap(() => this.http.get<ApiResponse>(environment.apiHost  + '/getData')));
  }
  
  public getText(text: string): Observable<any>{
    return this.http.post(environment.apiHost + '/getText', text);
  }

  public getHello(): Observable<any> {
    return this.http.get(environment.apiHost + '/hello');
  }

}
