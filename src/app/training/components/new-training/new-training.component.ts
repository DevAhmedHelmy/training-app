import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../services/training.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() startTraining = new EventEmitter<void>();
  constructor(private trainService:TrainingService,private firestore: AngularFirestore) { }
  newExecires:Exercise[];

  ngOnInit(): void {
    this.newExecires = this.trainService.getAvailableExercises();
  }
  onSatrtTraining(form:NgForm){
    this.trainService.startExercise(form.value.exercise);
  }
}
