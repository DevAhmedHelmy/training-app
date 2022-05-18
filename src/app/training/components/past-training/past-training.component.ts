import { Subscription } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../services/training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../../store/training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calorise', 'state'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private exChangedSubscription: Subscription;
  constructor(
    private trainService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    // this.dataSource.data = this.store.select(fromTraining.getFinishedTrainings);
   this.store
     .select(fromTraining.getFinishedTrainings)
     .subscribe((exercises: Exercise[]) => {
       this.dataSource.data = exercises;
     });
    // this.exChangedSubscription =
    //   this.trainService.finishedExercisesChanged.subscribe((exercises) => {
    //     this.dataSource.data = exercises;
    //   });
    this.trainService.fetchCompletedOrCanceledExercise();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(event: any) {
    let filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngOnDestroy(): void {
    // if (this.exChangedSubscription) {
    //   this.exChangedSubscription.unsubscribe();
    // }
  }
}
