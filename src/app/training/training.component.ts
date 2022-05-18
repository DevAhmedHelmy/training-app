
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TrainingService } from './services/training.service';
import * as fromTraining from './store/training.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit{

  ongoingTraining$ :Observable<boolean>;

  constructor(private trainingServ:TrainingService, private store:Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);

  }


}
