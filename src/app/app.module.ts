import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DiagramComponent } from './components/diagram/diagram.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DiagramService } from './services/diagram.service';
import { FormsModule } from '@angular/forms';

export const appRoutes: Routes = [
  {path: '', component: DiagramComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [AppComponent, DiagramComponent],
  providers: [DiagramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
