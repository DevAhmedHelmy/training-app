import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingComponent } from './components/past-training/past-training.component';
import { CoreModule } from '../core/core.module';
import { StopTrainingComponent } from './components/stop-training/stop-training.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [CommonModule, TrainingRoutingModule, CoreModule,FormsModule],
})
export class TrainingModule {}
