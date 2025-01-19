import { Component, Input } from '@angular/core';
import { LanguageService } from 'src/app/shared/language.service';

interface Menu {
  title: string;
  path: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() menus: string[] = [];

  currentLanguage = 'en';

  constructor(private languageService: LanguageService) {}

  changeLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.languageService.setLanguage(lang);
  }
}
