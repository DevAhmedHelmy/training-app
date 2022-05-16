import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/core/services/ui.service';

import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() startTraining = new EventEmitter<void>();
  loadingSubs: Subscription;
  exercisesSubscription: Subscription;
  newExecires: any = [];
  isLoading: boolean = true;

  constructor(
    private trainService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.exercisesSubscription = this.trainService.exercisesChanged.subscribe(
      (exercises) => {
        this.isLoading = false;
        this.newExecires = exercises;
      }
    );
    this.fetchingExercises();
  }
  fetchingExercises() {
    this.trainService.fetchAvailableExercises();
  }
  onSatrtTraining(form: NgForm) {
    this.trainService.startExercise(form.value.exercise);
  }
  ngOnDestroy() {
    if (this.loadingSubs || this.exercisesSubscription) {
      this.loadingSubs.unsubscribe();
      this.exercisesSubscription.unsubscribe();
    }

  }
}
