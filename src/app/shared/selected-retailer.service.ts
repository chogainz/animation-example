import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SelectedRetailerService {
  private stateDataSource = new BehaviorSubject({
    activeContent: 'selectedRetailer',
    state: false
  });

  state = this.stateDataSource.asObservable();

  private retailerDataSource = new BehaviorSubject(null);
  retailer = this.retailerDataSource.asObservable();

  constructor() {}

  updateState(data: any) {
    this.stateDataSource.next(data);
  }
  updateRetailer(data: any) {
    this.retailerDataSource.next(data);
  }
}
