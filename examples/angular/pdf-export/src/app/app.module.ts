import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BryntumAngularSharedModule } from 'bryntum-angular-shared';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BryntumAngularSharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
