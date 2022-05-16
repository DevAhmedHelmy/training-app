import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining = false;
  exerciseSubscription:Subscription;
  constructor(private trainingServ:TrainingService) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingServ.exerciseChanged.subscribe(exercise=>{
      if(exercise){
        this.ongoingTraining=true;
      }else{
        this.ongoingTraining=false
      }
    })
  }
  ngOnDestroy(): void {
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
  }


}
