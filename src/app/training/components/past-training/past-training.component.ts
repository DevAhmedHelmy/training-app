import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../../exercise.model';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit,AfterViewInit {
  displayedColumns=['date','name','duration','calorise','state']
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCanceledExercise()
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  doFilter(event:any){
    let filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
