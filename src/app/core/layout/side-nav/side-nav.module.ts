import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component'; 
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material/material.module';



@NgModule({
  declarations: [ 
    SideNavComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports:[
    SideNavComponent,
    HeaderComponent
  ]
})
export class SideNavModule { }
