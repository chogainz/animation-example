import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { SelectedRetailerService } from '../selected-retailer.service';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'selected-retailer',
  templateUrl: './selected-retailer.component.html',
  styleUrls: ['./selected-retailer.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({ transform: 'translateY(0)' })),
      state('false', style({ transform: 'translateY(-100%)' })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ])
  ]
})
export class SelectedRetailerComponent implements OnInit {
  state = false;
  activeContent: string;
  retailers: any;
  selectedRetailer = 'Funky Chicken Westbridges';

  postcode: FormControl = new FormControl('', Validators.required);
  distance: FormControl = new FormControl('', Validators.required);

  constructor(private dataService: SelectedRetailerService) {}

  ngOnInit() {
    this.postcode.valueChanges.subscribe(value => {
      this.retailers = ['Volvo Stafford', 'Fish Fingers', 'Chicken Dippers'];
    });

    this.dataService.state.pipe(debounceTime(1)).subscribe(data => {
      this.state = data.state;
      this.activeContent = data.activeContent;
    });
  }

  openChangeRetailer(event) {
    this.activeContent = 'changeRetailer';
  }

  saveRetailer() {
    this.state = false;
    this.dataService.updateState({
      activeContent: 'changeRetailer',
      state: this.state
    });
    this.dataService.updateRetailer(this.selectedRetailer);
    this.retailers = [];
  }

  animationDone(event) {
    if (event.fromState && !event.toState) {
      this.dataService.updateState({
        activeContent: 'selectedRetailer',
        state: this.state
      });
    }
  }
}
