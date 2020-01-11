/**
 * Angular wrapper for Bryntum Fullscreen button
 */

/* <remove-on-release> */
/* cSpell: ignore toggleable */
/* </remove-on-release> */

import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
// UMD bundle is used to support IE11 browser. If you don't need it just use "import { ... } from 'bryntum-gantt'" instead
import { Fullscreen, WidgetHelper } from 'bryntum-gantt/gantt.umd.js';

@Component({
    selector : 'bry-fullscreen',
    template : ''
})

export class FullscreenComponent implements OnInit, OnDestroy {

    // class variables
    private elementRef : ElementRef;
    private button : any;

    /**
     * Saves element to have container to render the button to
     * @param element
     */
    constructor(element : ElementRef) {
        this.elementRef = element;
    }

    /**
     * Runs once on component init. Creates and renders Bryntum Button
     */
    ngOnInit() {
        if (!Fullscreen.enabled) {
            return;
        }
        const button = WidgetHelper.createWidget({
            type       : 'button',
            appendTo   : this.elementRef.nativeElement,
            icon       : 'b-icon b-icon-fullscreen',
            tooltip    : 'Fullscreen',
            toggleable : true,
            cls        : 'b-blue b-raised',
            onToggle   : ({ pressed }) => {
                if (pressed) {
                    Fullscreen.request(document.documentElement);
                } else {
                    Fullscreen.exit();
                }
            }
        });

        Fullscreen.onFullscreenChange(() => {
            button['pressed'] = Fullscreen.isFullscreen;
        });

        this.button = button;

    }

    /**
     * Destroys the Bryntum button
     */
    ngOnDestroy() {
        if (this.button) {
            this.button.destroy();
        }
    }

}
