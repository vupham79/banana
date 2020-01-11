/**
 * Angular wrapper for Bryntum slider Widget
 */

import { Component, OnInit, EventEmitter, ElementRef, Input, Output } from '@angular/core';
// UMD bundle is used to support IE11 browser. If you don't need it just use "import { ... } from 'bryntum-gantt'" instead
import { WidgetHelper } from 'bryntum-gantt/gantt.umd.js';

@Component({
    selector : 'bry-slider',
    template : ''
})

export class SliderComponent implements OnInit {

    private elementRef : ElementRef;
    public slider : any;

    @Input() max : Number        = 100;
    @Input() min : Number        = 0;
    @Input() onChange : Function = () => {};
    @Input() showTooltip : Boolean;
    @Input() showValue : Boolean;
    @Input() step : Number       = 5;
    @Input() text : String       = 'Slider';
    @Input() value : Number      = 0;

    @Output() change : EventEmitter<any> = new EventEmitter;

    /**
     * Saves element to have container to render the button to
     * @param element
     */
    constructor(element : ElementRef) {
        this.elementRef = element;
    }

    ngOnInit() {
        const slider = WidgetHelper.createWidget({
            type        : 'slider',
            appendTo    : this.elementRef.nativeElement,
            max         : this.max,
            min         : this.min,
            onChange    : this.onChange,
            showTooltip : this.showTooltip,
            showValue   : this.showValue,
            step        : this.step,
            text        : this.text,
            value       : this.value
        });

        this.slider = slider;
    }

    /**
     * Destroys the Bryntum slider
     */
    ngOnDestroy() {
        if (this.slider) {
            this.slider.destroy();
        }
    }

}

