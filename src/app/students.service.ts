import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from './students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  url = "http://localhost:3001/students";

  constructor(private http: HttpClient) { }

  getStudent(): Observable<Students[]> {
    return this.http.get<Students[]>(this.url);
  }
  save(student: Students): Observable<Students> {
    return this.http.post<Students>(this.url, student);
  }
  delete(student: Students): Observable<void> {
    return this.http.delete<void>(`${this.url}/${student.id}`);
  }
  edit(student: Students): Observable<Students> {
    return this.http.put<Students>(`${this.url}/${student.id}`, student);
  }

}
