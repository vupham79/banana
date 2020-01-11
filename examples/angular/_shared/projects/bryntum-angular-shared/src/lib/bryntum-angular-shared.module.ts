import { NgModule } from '@angular/core';
import { GanttComponent } from './gantt.component';
import { FullscreenComponent } from './fullscreen.component';
import { ButtonComponent } from './button.component';
import { SliderComponent } from './slider.component';

@NgModule({
    declarations : [
        GanttComponent,
        FullscreenComponent,
        ButtonComponent,
        SliderComponent
    ],
    imports      : [],
    exports      : [
        GanttComponent,
        FullscreenComponent,
        ButtonComponent,
        SliderComponent
    ]
})

export class BryntumAngularSharedModule {
}
