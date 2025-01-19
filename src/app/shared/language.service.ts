import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<string>('en');
  language$ = this.currentLanguage.asObservable();

  constructor() {}

  setLanguage(lang: string): void {
    this.currentLanguage.next(lang);
  }

  getLanguage(): string {
    return this.currentLanguage.value;
  }
}
