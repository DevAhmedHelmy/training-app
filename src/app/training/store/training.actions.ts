import { Action } from '@ngrx/store';
import { Exercise } from '../exercise.model';

export const SET_AVAILABLE_TRAINING = '[Training] Set Available Traning';
export const SET_FINISHED_TRAINING = '[Training] Set Finished Traning';
export const SET_ACTIVE_TRAINING = '[Training] Set Active Traning';
export const STOP_TRAINING = '[Training] Stop Traning';
export const START_TRAINING = '[Training] Start Traning';
export class SetAvailableTraning implements Action {
  readonly type = SET_AVAILABLE_TRAINING;
  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTraning implements Action {
  readonly type = SET_FINISHED_TRAINING;
  constructor (public payload: Exercise[]) {}
}

export class SetActiveTraning implements Action {
  readonly type = SET_ACTIVE_TRAINING;
  constructor(public payload:any) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
  constructor(public payload: any) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  constructor(public payload: any) {}
}

export type TrainingActions = SetAvailableTraning | SetFinishedTraning | SetActiveTraning | StopTraining | StartTraining;
