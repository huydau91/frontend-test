import { Component, Input } from '@angular/core';
import { Footer } from 'src/app/services/main.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() data: Footer;
}
