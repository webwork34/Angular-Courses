import {
  IAuthor,
  IAuthorResponse,
  IAuthorsResponse,
  IDelete,
} from './../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IAuthorsResponse> {
    return this.http.get<IAuthorsResponse>('/authors/all');
  }

  addAuthor(author: IAuthor): Observable<IAuthorResponse> {
    return this.http.post<IAuthorResponse>('/authors/add', author);
  }

  deleteAuthor(authorId: string): Observable<IDelete> {
    return this.http.delete<IDelete>(`/authors/${authorId}`);
  }
}
