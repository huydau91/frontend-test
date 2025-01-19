import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetaData, Bloc1, Bloc2, Bloc3 } from 'src/app/services/main.interface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  dataSubscription!: Subscription;
  data: MetaData;
  block1: Bloc1;
  block2: Bloc2;
  block3: Bloc3;
  itemsPerSlide = 3;
  singleSlideOffset = true;

  constructor(private service: MainService) {}

  ngOnInit(): void {
    this.handleSubscription();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  private handleSubscription(): void {
    this.dataSubscription = this.service.metaData$.subscribe((resp) => {
      if (resp) {
        this.data = resp;
        this.block1 = this.data?.bloc_1;
        this.block1.cases = this.block1.cases.map((el, idx) => ({...el, imgUrl: "assets/img_tire" + (idx+1) + "_block1.png"}));
        this.block2 = this.data?.bloc_2;
        this.block3 = this.data?.bloc_3;
        this.block3.cases = this.block3.cases.map((el, idx) => ({...el, imgUrl: "assets/img" + (idx+1) + "_block3.png"}));
      }
    });
  }
}
