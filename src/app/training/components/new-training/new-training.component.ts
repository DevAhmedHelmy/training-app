import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../services/training.service';
import { Firestore, collectionData, collection, doc,docSnapshots,docData, collectionGroup,DocumentReference, onSnapshot, getDocs  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() startTraining = new EventEmitter<void>();
  doc: DocumentReference;
  newExecires$: Observable<any[]>;
  newExecires: any=[]; 

  constructor(
    private trainService: TrainingService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {  
    const data = collection(this.firestore, 'availableExercises');
    getDocs(data)
      .then((response) => {
        this.newExecires = [...response.docs.map((item) => { 
          return { ...item.data(), id: item.id }
        })]
      }) 
  
  }
  onSatrtTraining(form: NgForm) {
    this.trainService.startExercise(form.value.exercise);
  }
}
