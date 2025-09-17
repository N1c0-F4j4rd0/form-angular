import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resorce } from '../models/resource'; 

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  createResource(resource: Resorce): Observable<Resorce> {
    return this.http.post<Resorce>(this.apiUrl, resource);
  }

  getResources(): Observable<Resorce[]> {
    return this.http.get<Resorce[]>(this.apiUrl);
  }

  getResourceById(id: number): Observable<Resorce> {
    return this.http.get<Resorce>(`${this.apiUrl}/${id}`);
  }

  updateResource(id: number, resource: Resorce): Observable<Resorce> {
    return this.http.put<Resorce>(`${this.apiUrl}/${id}`, resource);
  }

  deleteResource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
