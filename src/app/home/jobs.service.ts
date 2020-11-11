import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { Job } from './Job';

const API_URL = 'http://18.219.141.211:8081/api/jobs';

@Injectable({
  providedIn: 'root'
})

export class JobsService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAll(): Observable<Job[]> {

    return this.http.get(API_URL+'/').pipe(map(response => response as Job[]));

  }

  save(item:Job): Observable<Job> {

    return this.http.post(API_URL+'/',item,{ headers: this.httpHeaders }).pipe(map(response => response as Job));

  }

  update(item:Job): Observable<Job> {

    return this.http.put(API_URL+'/'+item.id,item,{ headers: this.httpHeaders }).pipe(map(response => response as Job));

  }

  getById(item:Job): Observable<Job> {

    return this.http.get(API_URL+'/'+item.id).pipe(map(response => response as Job));

  }

  deleteById(item:Job): Observable<void> {

    return this.http.delete<void>(API_URL+'/'+item.id);

  }

}
