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
  newExecires: Exercise[]; 

  constructor(
    private trainService: TrainingService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void { 

    const ref = doc(this.firestore, 'availableExercises', 'availableExercises');
     docSnapshots(ref).pipe(map(data => console.log(data)));


    const data = collection(this.firestore, 'availableExercises');
    const ddd = getDocs(data);
    const dd = ddd.docs.map(doc => doc.data()); 
    console.log(getDocs(data));

     
    // collectionData(data).subscribe(res=>{console.log(res);
   
      
  
  }
  onSatrtTraining(form: NgForm) {
    this.trainService.startExercise(form.value.exercise);
  }
}
