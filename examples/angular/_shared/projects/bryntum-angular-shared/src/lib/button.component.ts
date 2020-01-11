/**
 * Angular wrapper for Bryntum button Widget
 */

/* <remove-on-release> */
/* cSpell: ignore toggleable */
/* </remove-on-release> */

import { Component, OnInit, Input, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
// UMD bundle is used to support IE11 browser. If you don't need it just use "import { ... } from 'bryntum-gantt'" instead
import { WidgetHelper } from 'bryntum-gantt/gantt.umd.js';

@Component({
    selector : 'bry-button',
    template : ''
})

export class ButtonComponent implements OnInit, OnChanges {

    private elementRef : ElementRef;
    private button : any;

    @Input() cls : string;
    @Input() color : string      = 'b-orange b-raised';
    @Input() icon : string;
    @Input() onAction : Function = () => {};
    @Input() pressed : boolean;
    @Input() text : string;
    @Input() toggleable : boolean;
    @Input() toggleGroup : string;
    @Input() tooltip : string;
    @Input() disabled : boolean;

    @Output() click : EventEmitter<any> = new EventEmitter();

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
        this.button = WidgetHelper.createWidget({
            type        : 'button',
            appendTo    : this.elementRef.nativeElement,
            cls         : this.cls,
            color       : this.color,
            icon        : this.icon,
            onAction    : this.onAction,
            onClick     : (event : any) => this.click.emit(event),
            pressed     : this.pressed,
            text        : this.text,
            toggleable  : this.toggleable,
            toggleGroup : this.toggleGroup,
            tooltip     : this.tooltip,
            disabled    : this.disabled
        });
    }

    ngOnChanges(changes : SimpleChanges) : void {
        if (this.button) {
            Object.entries(changes).forEach(([name, { currentValue }]) => {
                this.button[name] = currentValue;
                // console.log(name, currentValue);
            });
        }
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
