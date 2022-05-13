import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, setDoc, doc } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Exercise } from '../exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<any[]>();

  availableExercises: any = [];
  runningExercise: any;
  exercises: Exercise[] = [];

  constructor(private firestore: Firestore) {}

  fetchAvailableExercises() {
    const data = collection(this.firestore, 'availableExercises');
    getDocs(data)
      .then((response) => {
        return [
          ...response.docs.map((item) => {
            return { id: item.id, ...item.data() };
          }),
        ];
      })
      .then((response) => {
        this.availableExercises = response;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex: { id: string }) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'complete',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(this.runningExercise);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress * 100),
      calorise: this.runningExercise.duration * (progress * 100),
      date: new Date(),
      state: 'canceld',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(this.runningExercise);
  }

  fetchCompletedOrCanceledExercise() {
    const data = collection(this.firestore, 'finishedExercises');
    getDocs(data)
      .then((response) => {
        return [
          ...response.docs.map((item) => {
            return { id: item.id, ...item.data() };
          }),
        ];
      })
      .then((response) => {

        this.finishedExercisesChanged.next(response);
      });
  }

  // private function addDataToDatabase
  private addDataToDatabase(exercise: Exercise) {
    // use setDoc to add data to the collection
    const newCityRef = doc(collection(this.firestore, 'finishedExercises'));
    setDoc(newCityRef, exercise);
  }
}
