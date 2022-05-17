import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { UIService } from 'src/app/core/services/ui.service';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import { Exercise } from '../exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<any>();
  finishedExercisesChanged = new Subject<any>();
  availableExercises: any = [];
  runningExercise: any;
  exercises: Exercise[] = [];

  constructor(
    private firestore: Firestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
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
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.availableExercises = response;
        this.exercisesChanged.next([...this.availableExercises]);
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(
          'Fetching exerises faild, please try again later',
          null,
          3000
        );
        this.exercisesChanged.next(null);
      });
  }

  startExercise(selectedId: string) {
    // update using doc
    const docRef = doc(this.firestore, 'availableExercises', selectedId);
    updateDoc(docRef, {
      lastSelected: new Date(),
    });
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
      })
      .catch((error) => {
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    const newCityRef = doc(collection(this.firestore, 'finishedExercises'));
    setDoc(newCityRef, exercise);
  }
}
