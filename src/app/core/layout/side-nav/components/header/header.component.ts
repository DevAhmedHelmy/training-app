import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { 
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() lists:any;
  constructor() { }

  ngOnInit(): void {
  }
  OnToggleSideNav(){
     this.sidenavToggle.emit();
  }
}
