import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../services/training.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() startTraining = new EventEmitter<void>();
  newExecires$: Observable<any[]>;
  newExecires: Exercise[]; 

  constructor(
    private trainService: TrainingService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    const data = collection(this.firestore, 'availableExercises');
    this.newExecires$ = collectionData(data)
  }
  onSatrtTraining(form: NgForm) {
    this.trainService.startExercise(form.value.exercise);
  }
}
