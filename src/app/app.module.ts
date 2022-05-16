import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot({ui:appReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
