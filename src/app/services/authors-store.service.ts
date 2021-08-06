import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { IAuthorResponse } from '../shared/interfaces';
import { AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorsStoreService {
  constructor(private authorsService: AuthorsService) {}

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private authors$$: BehaviorSubject<IAuthorResponse> = new BehaviorSubject(
    null
  );

  get isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }

  get authors$() {
    return this.authors$$.asObservable();
  }

  getAll() {
    this.isLoading$$.next(true);
    this.authorsService.getAll().subscribe((data: any) => {
      this.authors$$.next(data);
      this.isLoading$$.next(false);
    });
  }

  addAuthor(author: string) {
    this.authorsService
      .addAuthor({ name: author })
      .subscribe((authorResponse: any) => {
        this.authors$$.next(authorResponse.result);
      });
  }
}
