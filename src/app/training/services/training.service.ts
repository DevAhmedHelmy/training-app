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
import { Subject, take } from 'rxjs';
import { UIService } from 'src/app/core/services/ui.service';
import * as fromTraining from '../store/training.reducer';
import * as UI from '../../shared/ui.actions';
import * as Training from '../store/training.actions';
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
    private store: Store<fromTraining.State>
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
        this.store.dispatch(new Training.SetAvailableTraning(response));
        // this.uiService.loadingStateChanged.next(false);
        // this.availableExercises = response;
        // this.exercisesChanged.next([...this.availableExercises]);
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
    this.store.dispatch(new Training.StartTraining(selectedId));
    // update using doc
    // const docRef = doc(this.firestore, 'availableExercises', selectedId);
    // updateDoc(docRef, {
    //   lastSelected: new Date(),
    // });
    // this.runningExercise = this.availableExercises.find(
    //   (ex: { id: string }) => ex.id === selectedId
    // );
    // this.exerciseChanged.next({ ...this.runningExercise });
  }

  // getRunningExercise() {
  //   return { ...this.runningExercise };
  // }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise) => {
        this.addDataToDatabase({
          ...exercise,
          date: new Date(),
          state: 'complete',
        });
        this.store.dispatch(new Training.StopTraining());
      });
    // this.runningExercise = null;
    // this.exerciseChanged.next(this.runningExercise);
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise) => {
        this.addDataToDatabase({
          ...exercise,
          duration: exercise.duration * (progress * 100),
          calorise: exercise.duration * (progress * 100),
          date: new Date(),
          state: 'canceld',
        });
        this.store.dispatch(new Training.StopTraining());
      });
    // this.runningExercise = null;
    // this.exerciseChanged.next(this.runningExercise);
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
        // this.finishedExercisesChanged.next(response);
        this.store.dispatch(new Training.SetFinishedTraning(response));
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
