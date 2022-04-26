import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lists=[
    {name:'signup','icon':'face',url:'/signup'},
    {name:'login','icon':'input',url:'/login'},
    {name:'training','icon':'fitness_center',url:'/training'}
  ]
  // @ViewChild('sideNave') sideNave:ElementRef;
  // onToggle(){
  //   this.sideNave.toggle();
  // }
}
