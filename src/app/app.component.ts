import { Component } from '@angular/core';
import { MetaData, GetMetaData } from './services/main.interface';
import { MainService } from './services/main.service';
import { finalize, Subscription } from 'rxjs';
import { LanguageService } from './shared/language.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MainService],
})
export class AppComponent {
  data: MetaData;
  currentLanguage = 'fr';
  languageSubscription!: Subscription;
  loading: boolean = false;

  constructor(
    private service: MainService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.handleSubscription();
  }

  private handleSubscription(): void {
    this.languageSubscription = this.languageService.language$.subscribe(
      (lang) => {
        this.currentLanguage = lang;
        this.getMetaData();
      }
    );
  }

  private getMetaData(): void {
    this.loading = true;
    this.service
      .getMetaData(this.currentLanguage)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (resp: GetMetaData) => {
          if (resp && resp[0]) {
            this.data = resp[0];
            this.service.setMetaData(this.data);
          }
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
