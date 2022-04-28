import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from '../exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  availableExercises: Exercise[] = [
    { id: 'test1', name: 'test name1', duration: 10, calorise: 1 },
    { id: 'test2', name: 'test name2', duration: 20, calorise: 2 },
    { id: 'test3', name: 'test name3', duration: 30, calorise: 3 },
    { id: 'test3', name: 'test name3', duration: 30, calorise: 3 },
    { id: 'test4', name: 'test name4', duration: 40, calorise: 4 },
  ];

  runningExercise: any;
  exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'complete',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(this.runningExercise);
  }

  cancelExercise(progress:number) {
    this.exercises.push({
      ...this.runningExercise,
      duration:this.runningExercise.duration * (progress*100),
      calorise:this.runningExercise.duration * (progress*100),
      date: new Date(),
      state: 'canceld',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(this.runningExercise);
  }

  getCompletedOrCanceledExercise(){
    return this.exercises.slice();
  }
}
