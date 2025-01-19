import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetMetaData, MetaData } from './main.interface';

@Injectable()
export class MainService {
  private metaData = new BehaviorSubject<any>(null);
  private apiUrl = 'https://api.test.soa-dev.net/api/v1/pages';
  metaData$ = this.metaData.asObservable();

  constructor(private http: HttpClient) {}

  getMetaData(lang: string): Observable<GetMetaData> {
    return this.http.get<GetMetaData>(this.apiUrl, { params: { lang } });
  }

  setMetaData(data: MetaData): void {
    this.metaData.next(data);
  }
}
