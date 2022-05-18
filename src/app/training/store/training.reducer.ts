import { Exercise } from '../exercise.model';
import {
  TrainingActions,
  SET_AVAILABLE_TRAINING,
  SET_FINISHED_TRAINING,
  SET_ACTIVE_TRAINING,
  STOP_TRAINING,
  START_TRAINING,
} from './training.actions';

import * as fromRoot from '../../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: any;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAINING:
      return {
        ...state,
        availableExercises: action.payload,
      };
    case SET_FINISHED_TRAINING:
      return {
        ...state,
        finishedExercises: action.payload,
      };
    case SET_ACTIVE_TRAINING:
      return {
        ...state,
        activeTraining: action.payload,
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null,
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {...
          state.availableExercises.find(
            (ex) => ex.id === action.payload
          ),
        }
      };
    default:
      return state;
  }
}

export const getTrainingState =
  createFeatureSelector<TrainingState>('training');

export const getAvailableTrainings = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getFinishedTrainings = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);
export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining!==null
);
