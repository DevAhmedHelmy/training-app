import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() startTraining = new EventEmitter<void>();

  newExecires: any = [];

  constructor(private trainService: TrainingService) {}

  ngOnInit(): void {

    this.trainService.exercisesChanged.subscribe((exercises) => {


      this.newExecires = exercises;
    });
    this.trainService.fetchAvailableExercises();
  }
  onSatrtTraining(form: NgForm) {
    this.trainService.startExercise(form.value.exercise);
  }
}
