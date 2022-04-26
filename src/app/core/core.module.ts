import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavModule } from './layout/side-nav/side-nav.module';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    SideNavModule
  ],
  exports:[
    MaterialModule,
    SideNavModule
  ]
})
export class CoreModule { }
