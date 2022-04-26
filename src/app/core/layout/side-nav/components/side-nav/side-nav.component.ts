import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  @Input() lists:any;
  constructor() { }

  ngOnInit(): void {
  }
  onClose(){
    this.closeSidenav.emit();
  }
}
