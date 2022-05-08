import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';  
import { CoreModule } from './core/core.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment'; 
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

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
    TrainingModule,
    AngularFireModule.initializeApp(environment.firebase),
    
    AngularFirestoreModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
