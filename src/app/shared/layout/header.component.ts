import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  trigger,
  state,
  transition,
  animate,
  style
} from '@angular/animations';
import { SelectedRetailerService } from '../selected-retailer.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('growShrink', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  state = false;
  disableButton = false;
  retailer = 'Funky Chicken Westbridges';

  constructor(private dataService: SelectedRetailerService) {}

  ngOnInit() {
    this.dataService.state.pipe(debounceTime(1)).subscribe(data => {
      this.disableButton = false;
      if (data.activeContent === 'changeRetailer') {
        this.disableButton = true;
        this.state = data.state;
      }
    });
    this.dataService.retailer.subscribe(retailer => {
      if (retailer) {
        this.retailer = retailer;
      }
    });
  }

  public toggle(event): void {

    this.state = !this.state;
    this.dataService.updateState({
      activeContent: 'selectedRetailer',
      state: this.state
    });
  }
}
