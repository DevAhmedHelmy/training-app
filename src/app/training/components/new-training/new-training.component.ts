import { Store } from '@ngrx/store';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/core/services/ui.service';

import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../services/training.service';
import * as fromRoot from '../../../app.reducer';
import * as fromTraining from '../../store/training.reducer';
import * as UI from '../../../shared/ui.actions';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() startTraining = new EventEmitter<void>();

  exercisesSubscription: Subscription;
  newExecires$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.newExecires$ = this.store.select(fromTraining.getAvailableTrainings);
    // this.exercisesSubscription = this.trainService.exercisesChanged.subscribe(
    //   (exercises) => {
    //     this.newExecires = exercises;
    //   }
    // );
    this.fetchingExercises();
  }
  fetchingExercises() {
    this.trainService.fetchAvailableExercises();
  }
  onSatrtTraining(form: NgForm) {
    this.trainService.startExercise(form.value.exercise);
  }
  ngOnDestroy() {
    if (this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe();
    }
  }
}
