declare module "bryntum-gantt" {

    export type AnyConstructor<A = object> = new (...input : any[]) => A

    export abstract class Base {        
        config: object;        
        constructor(args: any);
        construct(config?: object): void;
        destroy(): void;
        callback(handler: string|Function, thisObj: object, args: Array<any>): void;
        setConfig(config: object): void;
        static isOfTypeName(type: string): boolean;
        detachListeners(name: string): void;
    }

    export class BryntumWidgetAdapter {
    }

    export class AjaxStore extends Store {        
        allCount: number;
        isCommitting: boolean;
        isLoading: boolean;
        isPaged: boolean;
        lastPage: number;        
        encodeFilterParams(filters: Array<any>): void;
        encodeSorterParams(sorters: Array<any>): void;
        load(params: object): Promise<any>;
        loadChildren(parentRecord: Model): Promise<any>;
        loadPage(page: number, params: object): Promise<any>;
        nextPage(): Promise<any>;
        previousPage(): Promise<any>;
        commit(): Promise<any>;
    }

    export class Model implements TreeNode, ModelStm {        
        parentId: string|number;        
        static autoExposeFields: boolean;
        static childrenField: string;
        static convertEmptyParentToLeaf: boolean|object;
        static fieldMap: object;
        static fields: Array<any>;
        static idField: string;
        allChildren: Array<any>;
        childLevel: number;
        children: Array<any>;
        descendantCount: number;
        fieldNames: Array<any>;
        firstChild: Model;
        firstStore: Store;
        hasGeneratedId: boolean;
        id: string|number;
        internalId: number;
        isBatchUpdating: boolean;
        isCommitting: boolean;
        isLeaf: boolean;
        isLoaded: boolean;
        isModified: boolean;
        isParent: boolean;
        isPhantom: boolean;
        isValid: boolean;
        json: string;
        lastChild: Model;
        modificationData: object;
        modifications: object;
        parent: Model;
        previousSiblingsTotalCount: number;
        stm: StateTrackingManager;
        visibleDescendantCount: number;        
        constructor(data?: object, store?: Store, meta?: object);
        equals(other: Model): boolean;
        static addField(field: string|object): void;
        static removeField(fieldName: string): void;
        static getFieldDefinition(fieldName: string): object;
        getDataSource(fieldName: string): string;
        static processField(fieldName: string, value: any): any;
        get(fieldName: string): any;
        set(field: string|object, value: any, silent?: boolean): void;
        isFieldModified(fieldName: string): boolean;
        generateId(): void;
        static asId(model: Model|string|number): string|number;
        beginBatch(): void;
        endBatch(silent?: boolean): void;
        cancelBatch(): void;
        copy(newId?: number|string|object): Model;
        remove(silent?: boolean): void;
        ancestorsExpanded(): void;
        isExpanded(store: Store): void;
        getDescendantCount(onlyVisible?: boolean, store?: Store): number;
        traverse(fn: any): void;
        traverseBefore(fn: any): void;
        traverseWhile(fn: Function): boolean;
        bubble(fn: Function): void;
        bubbleWhile(fn: Function): boolean;
        contains(childOrId: Model|string|number): boolean;
        appendChild(childRecord: Model|Array<any>, silent?: boolean): Model|Array<any>;
        insertChild(childRecord: Model|Array<any>, before?: Model, silent?: boolean): Model|Array<any>;
        removeChild(childRecords: Model|Array<any>, isMove?: boolean, silent?: boolean): void;
    }

    export class Store extends Base implements StoreChained, StoreCRUD, StoreFilter, StoreGroup, StoreSearch, StoreSort, StoreSum, StoreTree, Events, StoreStm {        
        static stores: Array<any>;
        allCount: number;
        autoCommit: boolean;
        changes: object;
        count: number;
        data: Array<any>;
        filters: Collection;
        first: Model;
        groupers: Array<any>;
        id: string|number;
        isChained: boolean;
        isFiltered: boolean;
        isGrouped: boolean;
        isSorted: boolean;
        isTree: boolean;
        last: Model;
        leaves: Array<any>;
        listeners: object;
        modelClass: { new(data: object): Model };
        originalCount: number;
        records: Array<any>;
        rootNode: Model;
        sorters: Array<any>;        
        beginBatch(): void;
        endBatch(): void;
        static getStore(id: string|number|Array<any>): Store;
        getRange(start?: number, end?: number): Array<any>;
        createRecord(data: any, skipExpose?: any): void;
        getCount(countProcessed?: any): number;
        getAt(index: number): Model;
        getById(id: Model|string|number): Model;
        isVisible(recordOrId: Model|string|number): boolean;
        isAvailable(recordOrId: Model|string|number): boolean;
        getByInternalId(internalId: number): Model;
        includes(recordOrId: Model|string|number): boolean;
        indexOf(recordOrId: Model|string|number, visibleRecords?: boolean): number;
        getDistinctValues(field: any): Array<any>;
        getValueCount(field: any, value: any): number;
        forEach(fn: Function, thisObj: object): void;
        map(fn: Function): Array<any>;
        reduce(fn: Function, initialValue: any): any;
        traverse(fn: Function, topNode?: Model, skipTopNode?: boolean): void;
        traverseWhile(fn: Function, topNode?: Model, skipTopNode?: boolean): void;
        getNext(recordOrId: any, wrap?: boolean, skipSpecialRows?: boolean): Model;
        getPrev(recordOrId: any, wrap?: boolean, skipSpecialRows?: boolean): Model;
        makeChained(chainedFilterFn: Function, chainedFields: Array<any>, config: object): Store;
        chain(chainedFilterFn: Function, chainedFields: Array<any>, config: object): Store;
        remove(records: string|Array<any>|number|Array<any>|Model|Array<any>, silent?: boolean): Array<any>;
        removeAll(silent: any): void;
        add(records: Model|Array<any>|object|Array<any>, silent?: boolean): Array<any>;
        insert(index: any, records: any): Array<any>;
        move(item: object, beforeItem: object): void;
        commit(silent?: boolean): object;
        applyChangesFromStore(otherStore: Store): void;
        filter(newFilters: object|Array<any>|Function): void;
        filterBy(fn: Function): void;
        clearFilters(): void;
        group(field: string, ascending: boolean, add?: boolean, performSort?: boolean, silent?: boolean): void;
        clearGroupers(): void;
        isRecordInGroup(record: Model, groupValue: any): boolean;
        getGroupRecords(groupValue: any): Array<any>;
        getGroupTitles(): Array<any>;
        search(find: any, fields: Array<any>): any;
        findByField(field: any, value: any): any;
        find(fn: Function): Model;
        findRecord(fieldName: string, value: any): Model;
        query(fn: any): Array<any>;
        some(fn: any): boolean;
        sort(field: string|object, ascending?: boolean, add?: boolean, silent?: boolean): void;
        addSorter(field: string|object, ascending?: boolean): void;
        removeSorter(field: any): void;
        clearSorters(): void;
        createSorterFn(sorters: any): Function;
        sum(field: string, records: Array<any>): number;
        min(field: string, records: Array<any>): number;
        max(field: string, records: Array<any>): number;
        average(field: string, records: Array<any>): number;
        groupSum(groupValue: any, field: string): number;
        loadChildren(parentRecord: Model): Promise<any>;
        getChildren(parent: Model): void;
        toggleCollapse(idOrRecord: string|number|Model, collapse?: boolean): Promise<any>;
        addListener(config: object, thisObj?: object, prio?: number): Function;
        on(config: any, thisObj?: any): void;
        un(config: any, thisObj: any): void;
        removeListener(config: object, thisObj: object): void;
        hasListener(eventName: string): boolean;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        trigger(eventName: string, param: object): boolean;
        suspendEvents(queue?: boolean): void;
        resumeEvents(): void;
    }

    export class StoreCRUD {        
        autoCommit: boolean;
        changes: object;        
        remove(records: string|Array<any>|number|Array<any>|Model|Array<any>, silent?: boolean): Array<any>;
        removeAll(silent: any): void;
        add(records: Model|Array<any>|object|Array<any>, silent?: boolean): Array<any>;
        insert(index: any, records: any): Array<any>;
        move(item: object, beforeItem: object): void;
        commit(silent?: boolean): object;
        applyChangesFromStore(otherStore: Store): void;
    }

    export class StoreChained {        
        isChained: boolean;
    }

    export class StoreFilter {        
        filters: Collection;
        isFiltered: boolean;        
        filter(newFilters: object|Array<any>|Function): void;
        filterBy(fn: Function): void;
        clearFilters(): void;
    }

    export class StoreGroup {        
        groupers: Array<any>;
        isGrouped: boolean;        
        group(field: string, ascending: boolean, add?: boolean, performSort?: boolean, silent?: boolean): void;
        clearGroupers(): void;
        isRecordInGroup(record: Model, groupValue: any): boolean;
        getGroupRecords(groupValue: any): Array<any>;
        getGroupTitles(): Array<any>;
    }

    export class StoreSearch {        
        search(find: any, fields: Array<any>): any;
        findByField(field: any, value: any): any;
        find(fn: Function): Model;
        findRecord(fieldName: string, value: any): Model;
        query(fn: any): Array<any>;
        some(fn: any): boolean;
    }

    export class StoreSort {        
        isSorted: boolean;
        sorters: Array<any>;        
        sort(field: string|object, ascending?: boolean, add?: boolean, silent?: boolean): void;
        addSorter(field: string|object, ascending?: boolean): void;
        removeSorter(field: any): void;
        clearSorters(): void;
        createSorterFn(sorters: any): Function;
    }

    export class StoreSum {        
        sum(field: string, records: Array<any>): number;
        min(field: string, records: Array<any>): number;
        max(field: string, records: Array<any>): number;
        average(field: string, records: Array<any>): number;
        groupSum(groupValue: any, field: string): number;
    }

    export class StoreSync {
    }

    export class StoreTree {        
        isTree: boolean;
        leaves: Array<any>;        
        loadChildren(parentRecord: Model): Promise<any>;
        getChildren(parent: Model): void;
        toggleCollapse(idOrRecord: string|number|Model, collapse?: boolean): Promise<any>;
    }

    export class TreeNode {        
        parentId: string|number;        
        static convertEmptyParentToLeaf: boolean|object;
        allChildren: Array<any>;
        childLevel: number;
        children: Array<any>;
        descendantCount: number;
        firstChild: Model;
        isLeaf: boolean;
        isLoaded: boolean;
        isParent: boolean;
        lastChild: Model;
        parent: Model;
        previousSiblingsTotalCount: number;
        visibleDescendantCount: number;        
        ancestorsExpanded(): void;
        isExpanded(store: Store): void;
        getDescendantCount(onlyVisible?: boolean, store?: Store): number;
        traverse(fn: any): void;
        traverseBefore(fn: any): void;
        traverseWhile(fn: Function): boolean;
        bubble(fn: Function): void;
        bubbleWhile(fn: Function): boolean;
        contains(childOrId: Model|string|number): boolean;
        appendChild(childRecord: Model|Array<any>, silent?: boolean): Model|Array<any>;
        insertChild(childRecord: Model|Array<any>, before?: Model, silent?: boolean): Model|Array<any>;
        removeChild(childRecords: Model|Array<any>, isMove?: boolean, silent?: boolean): void;
    }

    export class StateTrackingManager {        
        autoRecord: boolean;
        canRedo: boolean;
        canUndo: boolean;
        disabled: boolean;
        isReady: boolean;
        isRecording: boolean;
        isRestoring: boolean;
        length: number;
        position: number;
        queue: Array<any>;
        state: StateBase;
        stores: Array<any>;
        transaction: Transaction;        
        hasStore(store: Store): boolean;
        addStore(store: Store): void;
        removeStore(store: Store): void;
        getStoreById(id: string|number): Store;
        forEachStore(fn: Function): void;
        enable(): void;
        disable(): void;
        startTransaction(title?: string): void;
        stopTransaction(title?: string): void;
        rejectTransaction(): void;
        undo(steps?: number): void;
        undoAll(): void;
        redo(steps?: number): void;
        redoAll(): void;
        resetQueue(): void;
        resetUndoQueue(): void;
        resetRedoQueue(): void;
    }

    export class Transaction {        
        length: number;
        queue: Array<any>;        
        addAction(action: ActionBase|object): void;
        undo(): void;
        redo(): void;
    }

    export abstract class ActionBase {        
        type: string;        
        undo(): void;
        redo(): void;
    }

    export class AddAction {
    }

    export class InsertAction {
    }

    export class InsertChildAction {
    }

    export class RemoveAction {
    }

    export class RemoveAllAction {
    }

    export class UpdateAction {
    }

    export class ModelStm {        
        stm: StateTrackingManager;
    }

    export class StoreStm {
    }

    export abstract class StateBase {
    }

    export class AjaxHelper {        
        static get(url: string, options?: object): Promise<any>;
        static post(url: string, payload: string|object|FormData, options: object): Promise<any>;
        static fetch(url: string, options: object): Promise<any>;
    }

    export class CSSHelper {        
        static insertRule(cssText: string): CSSRule;
        static findRule(selector: string|Function): CSSRule;
    }

    export class DateHelper {        
        static defaultFormat: string;
        static weekStartDay: any;        
        static parse(dateString: string, format: string): Date;
        static create(definition: object): Date;
        static format(date: Date, format: string): string;
        static asMilliseconds(amount: number|string, unit: string): number;
        static formatDelta(delta: number, abbrev?: boolean): void;
        static as(toUnit: any, amount: any, fromUnit?: any): number;
        static is24HourFormat(format: string): boolean;
        static add(date: Date, amount: number, unit?: string): Date;
        static diff(start: Date, end: Date, unit?: string, fractional?: boolean): number;
        static startOf(date: Date, unit?: string, clone?: boolean): Date;
        static clone(date: Date): Date;
        static clearTime(date: Date, clone?: boolean): Date;
        static set(date: Date, unit: string|object, amount: number): Date;
        static constrain(date: Date, min: Date, max: Date): Date;
        static getTime(hours: number, minutes?: number, seconds?: number): Date;
        static copyTimeValues(targetDate: Date, sourceDate: Date): Date;
        static isBefore(first: any, second: any): boolean;
        static isAfter(first: any, second: any): boolean;
        static isEqual(first: any, second: any, unit: any): boolean;
        static compare(first: Date, second: Date, unit: string): number;
        static isStartOf(date: Date, unit: string): boolean;
        static betweenLesser(date: Date, start: Date, end: Date): boolean;
        static betweenLesserEqual(date: Date, start: Date, end: Date): boolean;
        static intersectSpans(date1Start: Date, date1End: Date, date2Start: Date, date2End: Date): boolean;
        static compareUnits(unit1: string, unit2: string): void;
        static timeSpanContains(spanStart: Date, spanEnd: Date, otherSpanStart: Date, otherSpanEnd: Date): boolean;
        static get(date: Date, unit: string): void;
        static daysInMonth(date: Date): number;
        static getFirstDateOfMonth(date: Date): Date;
        static getLastDateOfMonth(date: Date): Date;
        static min(first: Date, second: Date): Date;
        static max(first: Date, second: Date): Date;
        static getNext(date: Date, unit: string, increment?: number, weekStartDay?: number): Date;
        static getStartOfNextDay(date: Date, clone: boolean, noNeedToClearTime: boolean): Date;
        static getEndOfPreviousDay(date: Date, noNeedToClearTime: boolean): Date;
        static formatCount(count: number, unit: string): string;
        static getUnitToBaseUnitRatio(baseUnit: string, unit: string, acceptEstimate?: boolean): number;
        static getMeasuringUnit(unit: any): any;
        static getShortNameOfUnit(unit: string): string;
        static getLocalizedNameOfUnit(unit: string, plural: boolean): string;
        static normalizeUnit(unit: string): string;
        static getDurationInUnit(start: Date, end: Date, unit: string): number;
        static parseDuration(value: string, allowDecimals?: boolean, defaultUnit?: string): object;
        static parseTimeUnit(unitName: any): void;
    }

    export class DomHelper {        
        static activeElement: HTMLElement;
        static scrollBarWidth: number;
        static themeInfo: object;        
        static isFocusable(element: HTMLElement): void;
        static isInView(element: HTMLElement, whole: boolean): void;
        static isVisible(element: HTMLElement): boolean;
        static isCustomElement(element: HTMLElement): boolean;
        static elementFromPoint(x: number, y: number): HTMLElement;
        static getId(element: HTMLElement): void;
        static setLength(element: string|HTMLElement, style?: string, value?: number|string): string;
        static getChild(element: HTMLElement, selector: string): HTMLElement;
        static hasChild(element: HTMLElement, selector: string): boolean;
        static children(element: HTMLElement, selector: string): Array<any>;
        static down(element: HTMLElement, selector: string): HTMLElement;
        static isDescendant(parentElement: HTMLElement, childElement: HTMLElement): boolean;
        static forEachSelector(element: HTMLElement, selector: string, fn: Function): void;
        static forEachChild(element: HTMLElement, fn: Function): void;
        static removeEachSelector(element: HTMLElement, selector: string): void;
        static up(element: HTMLElement, selector: string): HTMLElement;
        static getParents(element: HTMLElement): Array<any>;
        static makeValidId(id: string): string;
        static createElement(config: object, returnAll?: boolean): HTMLElement|Array<any>|object;
        static insertFirst(into: HTMLElement, element: HTMLElement): HTMLElement;
        static insertBefore(into: HTMLElement, element: HTMLElement, beforeElement: HTMLElement): HTMLElement;
        static append(parentElement: HTMLElement, elementOrConfig: HTMLElement|object|string): HTMLElement;
        static getTranslateX(element: HTMLElement): number;
        static getTranslateY(element: HTMLElement): number;
        static getTranslateXY(element: HTMLElement): Array<any>;
        static getOffsetX(element: HTMLElement, container: HTMLElement): number;
        static getOffsetY(element: HTMLElement, container: HTMLElement): number;
        static getOffsetXY(element: HTMLElement, container: HTMLElement): Array<any>;
        static focusWithoutScrolling(element: HTMLElement): void;
        static getPageX(element: HTMLElement): number;
        static getPageY(element: HTMLElement): number;
        static setTranslateX(element: HTMLElement, x: number): void;
        static setTranslateY(element: HTMLElement, y: number): void;
        static setTop(element: HTMLElement, y: number|string): void;
        static setLeft(element: HTMLElement, x: number|string): void;
        static setTranslateXY(element: HTMLElement, x?: number, y?: number): void;
        static addTranslateX(element: HTMLElement, x: number): void;
        static addTranslateY(element: HTMLElement, y: number): void;
        static addLeft(element: HTMLElement, x: any): void;
        static addTop(element: HTMLElement, y: any): void;
        static alignTo(element: HTMLElement, target: HTMLElement|Rectangle, alignSpec: object): void;
        static getStyleValue(element: HTMLElement, propName: string|Array<any>, inline?: boolean): string|object;
        static applyStyle(element: HTMLElement, style: string|object, overwrite?: boolean): void;
        static addClasses(element: HTMLElement, classes: Array<any>): void;
        static removeClasses(element: HTMLElement, classes: Array<any>): void;
        static toggleClasses(element: HTMLElement, classes: Array<any>, force?: boolean): void;
        static addTemporaryClass(element: HTMLElement, cls: string, duration: number): void;
        static highlight(element: Rectangle): void;
        static resetScrollBarWidth(): void;
        static measureText(text: string, sourceElement: HTMLElement): number;
        static measureSize(size: string, sourceElement: HTMLElement): number;
        static sync(sourceElement: string|HTMLElement, targetElement: HTMLElement): HTMLElement;
        static syncClassList(element: HTMLElement, newClasses: Array<any>|string|object): void;
        static setTheme(newThemeName: string): Promise<any>;
    }

    export class DomSync {        
        static sync(options: object): HTMLElement;
    }

    export class DragHelper extends Base implements Events {        
        listeners: object;        
        constructor(config: object);
        abort(): void;
        createProxy(): void;
        addListener(config: object, thisObj?: object, prio?: number): Function;
        on(config: any, thisObj?: any): void;
        un(config: any, thisObj: any): void;
        removeListener(config: object, thisObj: object): void;
        hasListener(eventName: string): boolean;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        trigger(eventName: string, param: object): boolean;
        suspendEvents(queue?: boolean): void;
        resumeEvents(): void;
    }

    export class EventHelper {        
        static dblClickTime: number;
        static longPressTime: number;        
        static getXY(event: Event): Array<any>;
        static getDistanceBetween(event1: Event, event2: Event): number;
        static getPagePoint(event: Event): Point;
        static getClientPoint(event: Event): Point;
        static addListener(element: HTMLElement, eventName: string|object, handler?: Function, options?: object): Function;
        static on(options: object): Function;
    }

    export class ObjectHelper {        
        static isEqual(a: any, b: any): any;
        static isDeeplyEqual(a: object, b: object, options?: object): boolean;
        static isPartial(a: any, b: any): boolean;
        static isLessThan(a: any, b: any): boolean;
        static isMoreThan(a: any, b: any): boolean;
        static copyProperties(dest: object, source: object, props: Array<any>): void;
        static copyPropertiesIf(dest: object, source: object, props: Array<any>): void;
        static keys(object: object, ignore?: object): Array<any>;
        static isEmpty(object: object): boolean;
        static getTruthyKeys(source: object): Array<any>;
        static getTruthyValues(source: object): Array<any>;
        static createTruthyKeys(The: string|Array<any>): void;
        static allKeys(source: object): Array<any>;
        static pathExists(object: object, path: string): boolean;
        static getPath(object: object, path: string): any;
        static setPath(object: object, path: string, value: any): void;
        static getPropertyDescriptor(object: object, propertyName: string): object;
        static cleanupProperties(object: object): object;
        static assertType(value: object, type: string, name: string): void;
        static assertNumber(value: object, name: string): void;
        static assertBoolean(value: object, name: string): void;
        static toFixed(number: number, digits: number): string;
        static round(number: number, digits: number): number;
    }

    export class StringHelper {        
        static capitalizeFirstLetter(string: any): string;
        static lowercaseFirstLetter(string: any): string;
        static hyphenate(string: any): string;
        static safeJsonParse(string: string): object;
        static safeJsonStringify(object: object): object;
        static createId(inString: any): string;
        static joinPaths(paths: Array<any>, pathSeparator?: string): string;
    }

    export class WidgetHelper {        
        static adapter: any;
        static hasAdapter: boolean;        
        static getById(id: any): Widget;
        static fromElement(element: HTMLElement|Event, type?: string|Function, limit?: HTMLElement|number): any;
        static createWidget(config: any): object;
        static append(widget: object|Array<any>, config?: HTMLElement|string|object): Array<any>;
        static openPopup(element: any, config: any): any|object;
        static showContextMenu(element: HTMLElement|Array<any>, config: object): any|object;
        static attachTooltip(element: any, configOrText: any): object;
        static hasTooltipAttached(element: any): boolean;
        static destroyTooltipAttached(element: any): void;
        static mask(element: any, msg: any): void;
        static unmask(element: any): void;
        static toast(msg: string): void;
    }

    export class DomClassList {        
        clone(): DomClassList;
        trim(): string;
        isEqual(other: DomClassList|string): boolean;
        add(classes: string): void;
        remove(classes: string): void;
        split(): Array<any>;
    }

    export class Fullscreen {        
        static enabled: boolean;
        static isFullscreen: boolean;        
        static request(element: HTMLElement): void;
        static exit(): void;
        static onFullscreenChange(fn: Function): void;
        static unFullscreenChange(fn: Function): void;
    }

    export class Point extends Rectangle {        
        constrain(into: Rectangle): void;
    }

    export class RandomGenerator {        
        nextRandom(max: any): number;
        reset(): void;
        fromArray(array: any): any;
    }

    export class Rectangle {        
        bottom: number;
        center: Point;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
        x: number;
        y: number;        
        static from(element: HTMLElement, relativeTo?: HTMLElement, ignorePageScroll?: boolean): Rectangle;
        static inner(element: any, relativeTo?: HTMLElement, ignorePageScroll?: boolean): Rectangle;
        static content(element: any, relativeTo?: HTMLElement, ignorePageScroll?: boolean): Rectangle;
        static client(element: any, relativeTo?: HTMLElement, ignorePageScroll?: boolean): Rectangle;
        static union(rectangles: Array<any>): Rectangle;
        round(): void;
        clone(): void;
        contains(other: any): boolean;
        intersect(other: Rectangle, useBoolean?: boolean): Rectangle|boolean;
        translate(x: number, y: number): void;
        moveTo(x: number, y: number): void;
        getDelta(other: Point): void;
        adjust(x: number, y: number, width: number, height: number): void;
        inflate(amount: number): Rectangle;
        constrainTo(constrainTo: Rectangle, strict: boolean): void;
        alignTo(spec: object): Rectangle;
        getAlignmentPoint(alignmentPoint: string, margins: Array<any>): void;
        highlight(): void;
    }

    export class Scroller extends Base implements Events {        
        clientHeight: number;
        clientWidth: number;
        id: string;
        listeners: object;
        maxX: number;
        maxY: number;
        overflowX: boolean|string;
        overflowY: boolean|string;
        scrollHeight: number;
        scrollWidth: number;
        viewport: Rectangle;
        x: number;
        y: number;        
        addPartner(otherScroller: Scroller, axes?: string|object): void;
        removePartner(otherScroller: Scroller): void;
        scrollIntoView(element: HTMLElement|Rectangle, options?: object): Promise<any>;
        scrollBy(xDelta?: number, yDelta?: number, options?: object|boolean): Promise<any>;
        scrollTo(toX?: number, toY?: number, options?: object|boolean): Promise<any>;
        addListener(config: object, thisObj?: object, prio?: number): Function;
        on(config: any, thisObj?: any): void;
        un(config: any, thisObj: any): void;
        removeListener(config: object, thisObj: object): void;
        hasListener(eventName: string): boolean;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        trigger(eventName: string, param: object): boolean;
        suspendEvents(queue?: boolean): void;
        resumeEvents(): void;
        hasTimeout(name: any): void;
        setTimeout(timeoutSpec: object): number;
        clearTimeout(idOrName: number|string): void;
        clearInterval(id: number): void;
        setInterval(fn: any, delay: any): number;
        requestAnimationFrame(fn: Function, extraArgs?: Array<any>, thisObj?: object): number;
        createOnFrame(fn: Function|string, args?: Array<any>, thisObj?: object, cancelOutstanding?: boolean): void;
        cancelAnimationFrame(handle: number): void;
        buffer(fn: Function|string, delay: number, thisObj?: object): Function;
        throttle(fn: Function, buffer: number): void;
    }

    export class LocaleManager {        
        locale: string|object;        
        registerLocale(name: any, config: any): void;
        extendLocale(name: any, config: any): void;
        applyLocale(name: string): boolean|Promise<any>;
    }

    export class Localizable {        
        localeManager: LocaleManager;        
        L(text: string, templateData?: object): string;
    }

    export class Events {        
        listeners: object;        
        addListener(config: object, thisObj?: object, prio?: number): Function;
        on(config: any, thisObj?: any): void;
        un(config: any, thisObj: any): void;
        removeListener(config: object, thisObj: object): void;
        hasListener(eventName: string): boolean;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        trigger(eventName: string, param: object): boolean;
        suspendEvents(queue?: boolean): void;
        resumeEvents(): void;
    }

    export class InstancePlugin implements Localizable, Events {        
        client: Widget;
        disabled: boolean;
        listeners: object;
        localeManager: LocaleManager;        
        doDisable(): void;
        L(text: string, templateData?: object): string;
        addListener(config: object, thisObj?: object, prio?: number): Function;
        on(config: any, thisObj?: any): void;
        un(config: any, thisObj: any): void;
        removeListener(config: object, thisObj: object): void;
        hasListener(eventName: string): boolean;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        trigger(eventName: string, param: object): boolean;
        suspendEvents(queue?: boolean): void;
        resumeEvents(): void;
    }

    export class Override {        
        static apply(override: any): void;
    }

    export class Pluggable {        
        plugins: object;        
        addPlugins(plugins: any): void;
        hasPlugin(pluginClassOrName: any): boolean;
        getPlugin(pluginClassOrName: any): object;
    }

    export class State {        
        state: object;
    }

    export class Bag {        
        count: number;
        values: Array<any>;        
        get(id: any): object;
        add(toAdd: object|Array<any>): void;
        remove(toAdd: object|Array<any>): void;
        changeId(item: string|number|object, newId: string|number): void;
        includes(item: object|string|number): boolean;
        map(fn: Function, thisObj?: object): Array<any>;
        forEach(fn: Function, thisObj?: object): void;
        find(fn: Function): object;
        sort(fn: Function): void;
    }

    export class ClickRepeater {
    }

    export class Collection {        
        allValues: Array<any>;
        count: number;
        filterFunction: Function;
        filters: Collection;
        generation: number;
        idProperty: string;
        isFiltered: boolean;
        isSorted: boolean;
        sortFunction: Function;
        sorters: Collection;
        totalCount: number;
        values: Array<any>;        
        clear(): void;
        forEach(fn: Function, ignoreFilters?: boolean): void;
        map(fn: Function, ignoreFilters?: boolean): Array<any>;
        find(fn: Function, ignoreFilters?: boolean): object;
        add(items: object): void;
        remove(items: object): void;
        move(item: object, beforeItem?: object): number;
        splice(index?: number, toRemove?: Array<any>|number, toAdd?: Array<any>|object): void;
        changeId(item: string|number|object, newId: string|number): void;
        get(id: any, ignoreFilters?: boolean): object;
        getBy(propertyName: string, value: any, ignoreFilters?: boolean): object;
        addSorter(sorter: object): CollectionSorter;
        addFilter(filter: object): CollectionFilter;
        findIndex(propertyName: string, value: any, ignoreFilters?: boolean): number;
        indexOf(item: object|string|number, ignoreFilters?: boolean): number;
        includes(item: object|string|number, ignoreFilters?: boolean): boolean;
    }

    export class CollectionFilter {        
        filterBy: Function;
        operator: string;
        property: string;
        value: any;
    }

    export class CollectionSorter {
    }

    export class Month {        
        dayCount: number;
        endDate: Date;
        startDate: Date;
        weekCount: number;        
        constructor(config: object);
        eachDay(fn: Function): void;
        eachWeek(fn: Function): void;
    }

    export class Button extends Widget implements Badge {        
        badge: string;
        icon: string;
        iconAlign: string;
        menu: Widget;
        pressed: boolean;
        pressedIcon: string;
        text: string;        
        toggle(pressed: boolean): void;
    }

    export class ButtonGroup extends Container {        
        toggleGroup: any;
    }

    export class CalendarPanel {        
        date: Date;
        weekStartDay: any;
    }

    export class Checkbox extends Field {        
        checked: boolean;
        readOnly: boolean;
        text: string;
        value: string;        
        check(): void;
        uncheck(): void;
        toggle(): void;
    }

    export class ChipView extends List {
    }

    export class Combo extends PickerField {        
        static queryAll: symbol;
        static queryLast: symbol;
        hidePickerOnSelect: any;
        record: Array<any>;
        records: Array<any>;
        store: Store|object;
        value: object;
        valueCollection: any;
    }

    export class Container extends Widget {        
        isSettingValues: boolean;
        isValid: boolean;
        items: Array<any>;
        layoutStyle: object;
        record: Model;
        values: object;
        widgetMap: any;        
        remove(toRemove: Widget): Widget|Array<any>;
        removeAll(): Array<any>;
        add(toAdd: Widget): Widget|Array<any>;
        insert(toAdd: Widget, The: number|Widget): Widget;
        eachWidget(fn: Function, deep?: boolean): boolean;
        queryAll(filter: Function): Array<any>;
        query(filter: Function): Widget;
        getWidgetById(id: string): Widget;
        processWidgetConfig(): void;
    }

    export class DateField extends PickerField {        
        format: string;
        max: Date|string;
        min: Date|string;
        step: string|number|object;
    }

    export class DatePicker {
    }

    export class DisplayField extends Field {
    }

    export class DurationField extends TextField {        
        milliseconds: number;
        value: string|number|object;
    }

    export class Editor extends Container {        
        startEdit(editObject: object): void;
        completeEdit(): void;
        cancelEdit(): void;
    }

    export abstract class Field extends Widget implements Badge {        
        static errorTip: Tooltip;
        badge: string;
        isEmpty: boolean;
        isEmptyInput: boolean;
        isValid: boolean;
        label: string;
        readOnly: boolean;
        triggers: object;
        value: any;        
        select(start?: number, end?: number): void;
        setError(error: string, silent?: boolean): void;
        clearError(error: string, silent?: boolean): void;
        getErrors(): Array<any>;
    }

    export class FileField extends Field {        
        files: FileList;        
        clear(): void;
    }

    export class FilePicker extends Container {        
        files: FileList;        
        clear(): void;
    }

    export class FlagField {
    }

    export class List extends Widget {        
        items: Array<any>;
        store: Store;
    }

    export class Mask {        
        text: string;        
        static mask(text: string|object, element: HTMLElement): Mask;
        static unmask(element: HTMLElement): Promise<any>;
        show(): void;
        hide(): Promise<any>;
        close(): Promise<any>;
    }

    export class Menu extends Popup {        
        currentSubMenu: Menu;
        isSubMenu: boolean;
        parentMenu: Menu;
        selectedElement: HTMLElement;
    }

    export class MenuItem extends Widget {        
        checked: boolean;
        menu: Widget;        
        doAction(): void;
    }

    export class NumberField extends Field {        
        max: number;
        min: number;
        step: number;
        value: number;
    }

    export class PagingToolbar extends Toolbar {
    }

    export class Panel extends Container {        
        tools: object;
    }

    export abstract class PickerField extends TextField {        
        togglePicker(): void;
        showPicker(): void;
        hidePicker(): void;
    }

    export class Popup extends Panel {        
        close(): void;
    }

    export class Slider extends Widget {        
        max: number;
        min: number;
        step: number;
        text: string;
        value: number;
    }

    export class Splitter extends Widget {        
        currentOrientation: string;
        orientation: string;
    }

    export class TabPanel extends Widget {        
        activeIndex: number;
        activeItem: Widget;
        activeTab: Widget|number;
    }

    export class TextAreaField extends Field {
    }

    export class TextField extends Field {
    }

    export class TimeField extends PickerField {        
        format: string;
        max: Date|string;
        min: Date|string;
        step: string|number|object;
        value: Date|string;        
        showPicker(): void;
        focusPicker(): void;
    }

    export class Toast {        
        static show(msgOrConfig: string|object): Toast;
        hide(): void;
        static hideAll(): void;
    }

    export class Tool extends Widget {
    }

    export class Toolbar extends Container {
    }

    export class Tooltip extends Widget {        
        static currentOverElement: HTMLElement;
        activeTarget: HTMLElement;
        html: string;
        textContent: any;
    }

    export class Widget extends Base implements Events, Localizable {        
        alignSelf: string;
        anchorSize: Array<any>;
        content: string;
        contentElement: HTMLElement;
        dataset: object;
        disabled: boolean;
        element: HTMLElement;
        flex: number|string;
        focusElement: HTMLElement;
        height: number|string;
        hidden: boolean;
        html: string;
        id: string;
        isVisible: boolean;
        listeners: object;
        localeManager: LocaleManager;
        margin: number|string;
        maxHeight: string|number;
        maxWidth: string|number;
        minHeight: string|number;
        minWidth: string|number;
        nextSibling: Widget;
        owner: Widget;
        previousSibling: Widget;
        scrollable: Scroller;
        style: string|object|CSSStyleDeclaration;
        tooltip: string|object;
        visible: boolean;
        width: number|string;
        x: any;
        y: any;        
        alignTo(spec: object): void;
        toFront(): void;
        setXY(x?: number, y?: number): void;
        disable(): void;
        enable(): void;
        focus(): void;
        show(): Promise<any>;
        showBy(spec: object|HTMLElement): void;
        showByPoint(x: number|Array<any>, y?: number, options?: object): void;
        hide(animate?: boolean): Promise<any>;
        up(selector: string|Function, deep?: boolean, limit?: number|string|Widget): void;
        owns(target: HTMLElement|Event|Widget): void;
        revertFocus(force: boolean): void;
        mask(msg: string|object): Mask;
        unmask(): void;
        parseTRBL(values: number|string|Array<any>, units?: string): void;
        addListener(config: object, thisObj?: object, prio?: number): Function;
        on(config: any, thisObj?: any): void;
        un(config: any, thisObj: any): void;
        removeListener(config: object, thisObj: object): void;
        hasListener(eventName: string): boolean;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        trigger(eventName: string, param: object): boolean;
        suspendEvents(queue?: boolean): void;
        resumeEvents(): void;
        L(text: string, templateData?: object): string;
    }

    export class Card {        
        activeIndex: number;
        activeItem: Widget;        
        setActiveItem(activeItem: Widget|number): object;
    }

    export class Fit {
    }

    export class Layout {        
        containerCls: any;
        itemCls: any;
    }

    export class Badge {        
        badge: string;
    }

    export class AddNewColumn extends Column {
    }

    export class CalendarColumn extends Column {
    }

    export class ConstraintDateColumn extends GanttDateColumn {
    }

    export class ConstraintTypeColumn extends Column {
    }

    export class DependencyColumn extends Column {
    }

    export class DurationColumn extends SchedulerDurationColumn {
    }

    export class EarlyEndDateColumn extends GanttDateColumn {
    }

    export class EarlyStartDateColumn extends GanttDateColumn {
    }

    export class EffortColumn extends DurationColumn {
    }

    export class EndDateColumn extends GanttDateColumn {
    }

    export abstract class GanttDateColumn extends DateColumn {
    }

    export class LateEndDateColumn extends GanttDateColumn {
    }

    export class LateStartDateColumn extends GanttDateColumn {
    }

    export class MilestoneColumn extends CheckColumn {
    }

    export class NameColumn extends TreeColumn {
    }

    export class NoteColumn extends Column {
    }

    export class PercentDoneCircleColumn extends PercentDoneColumn {
    }

    export class PercentDoneColumn extends NumberColumn {
    }

    export class PredecessorColumn extends DependencyColumn {
    }

    export class ResourceAssignmentColumn extends Column {
    }

    export class SchedulingModeColumn extends Column {
    }

    export class SequenceColumn extends Column {
    }

    export class ShowInTimelineColumn extends CheckColumn {
    }

    export class StartDateColumn extends GanttDateColumn {
    }

    export class SuccessorColumn extends DependencyColumn {
    }

    export class TotalSlackColumn extends DurationColumn {
    }

    export class WBSColumn extends Column {
    }

    export class GanttTag {
    }

    export class AssignmentStore extends ProAssignmentStore {
    }

    export class CalendarManagerStore extends ProCalendarManagerStore {
    }

    export class DependencyStore extends ProDependencyStore {
    }

    export class ResourceStore extends ProResourceStore {
    }

    export class TaskStore extends ProTaskStore {        
        setBaseline(index: number): void;
    }

    export class Baselines extends TooltipBase {
    }

    export class CellEdit extends GridCellEdit {        
        doAddNewAtEnd(): Promise<any>;
    }

    export class CriticalPaths extends InstancePlugin {
    }

    export class Dependencies extends SchedulerDependencies {        
        drawForTask(): void;
    }

    export class DependencyEdit extends SchedulerDependencyEdit {
    }

    export class Labels extends SchedulerLabels {
    }

    export class PercentBar extends InstancePlugin {
    }

    export class ProgressLine extends InstancePlugin {        
        statusDate: Date;        
        shouldDrawProgressLine(): boolean;
        draw(): void;
        hasTimeout(name: any): void;
        setTimeout(timeoutSpec: object): number;
        clearTimeout(idOrName: number|string): void;
        clearInterval(id: number): void;
        setInterval(fn: any, delay: any): number;
        requestAnimationFrame(fn: Function, extraArgs?: Array<any>, thisObj?: object): number;
        createOnFrame(fn: Function|string, args?: Array<any>, thisObj?: object, cancelOutstanding?: boolean): void;
        cancelAnimationFrame(handle: number): void;
        buffer(fn: Function|string, delay: number, thisObj?: object): Function;
        throttle(fn: Function, buffer: number): void;
    }

    export class ProjectLines extends TimeRanges {
    }

    export class Rollups extends TooltipBase {
    }

    export class TaskContextMenu extends TimeSpanRecordContextMenuBase {        
        showContextMenuFor(taskRecord: TaskModel, options?: object): void;
    }

    export class TaskDrag extends DragBase {
    }

    export class TaskDragCreate extends DragCreateBase {
    }

    export class TaskEdit extends ProTaskEdit {        
        editTask(taskRecord: TaskModel): void;
    }

    export class TaskResize extends ResizeBase {
    }

    export class TaskTooltip extends TooltipBase {
    }

    export class PdfExport extends SchedulerPdfExport {
    }

    export class AssignmentModel extends ProAssignmentModel {
    }

    export class Baseline extends TimeSpan {        
        task: TaskModel;        
        convertToMilestone(): void;
        convertToRegular(): void;
    }

    export class CalendarModel extends ProCalendarModel {
    }

    export class DependencyModel extends ProDependencyModel {
    }

    export class ProjectModel extends TaskModel {        
        endDate: string|Date;
        startDate: string|Date;        
        assignmentStore: AssignmentStore;
        calendarManagerStore: CalendarManagerStore;
        dependencyStore: DependencyStore;
        eventStore: TaskStore;
        resourceStore: ResourceStore;
        stm: StateTrackingManager;
        taskStore: TaskStore;        
        getCalendar(): CalendarModel;
        setCalendar(calendar: CalendarModel): Promise<any>;
        propagate(onEffect: any): Promise<any>;
    }

    export class ResourceModel extends ProResourceModel {
    }

    export class SubProjectModel extends ProSubProjectModel {
    }

    export class TaskModel extends TimeSpan {        
        baselines: Array<any>;
        calendar: CalendarModel;
        cls: DomClassList|string;
        constraintDate: Date;
        constraintType: string;
        critical: boolean;
        draggable: boolean;
        durationUnit: string;
        earlyEndDate: Date;
        earlyStartDate: Date;
        effort: number;
        effortDriven: boolean;
        effortUnit: string;
        endDate: string|Date;
        iconCls: string;
        id: string|number;
        lateEndDate: Date;
        lateStartDate: Date;
        manuallyScheduled: boolean;
        name: string;
        note: string;
        percentDone: number;
        resizable: boolean|string;
        schedulingMode: string;
        showInTimeline: boolean;
        slackUnit: string;
        startDate: string|Date;
        taskIconCls: string;
        totalSlack: number;        
        static convertEmptyParentToLeaf: boolean|object;
        allDependencies: Array<any>;
        assignments: Array<any>;
        fullEffort: object;
        incomingDeps: Set<any>;
        isCompleted: boolean;
        isInProgress: boolean;
        isStarted: boolean;
        outgoingDeps: Set<any>;
        predecessorTasks: Array<any>;
        previousSiblingsTotalCount: number;
        sequenceNumber: number;
        successorTasks: Array<any>;        
        propagate(onEffect: any): Promise<any>;
        setBaseline(index: number): void;
        convertToMilestone(): void;
        convertToRegular(): void;
        getAssignmentFor(resource: ResourceModel): AssignmentModel|null;
        assign(resource: ResourceModel, units?: number): Promise<any>;
        unassign(resource: ResourceModel): Promise<any>;
        setCalendar(calendar: CalendarModel): Promise<any>;
        getCalendar(): CalendarModel;
        setStartDate(date: Date, keepDuration?: boolean): Promise<any>;
        setEndDate(date: Date, keepDuration?: boolean): Promise<any>;
        setDuration(duration: number, unit?: string): Promise<any>;
        setEffort(effort: number, unit?: string): Promise<any>;
        setConstraint(constraintType: string, constraintDate?: Date): Promise<any>;
    }

    export class TaskSegmentModel extends ProTaskSegmentModel {
    }

    export class ProjectGenerator {
    }

    export class Gantt extends GanttBase implements GanttDom, GanttRegions, GanttScroll, GanttState, GanttStores, EventNavigation, TaskNavigation {        
        resolveTaskRecord(element: HTMLElement): TaskModel;
        getElementFromTaskRecord(taskRecord: TaskModel, inner?: boolean): HTMLElement;
        getScheduleRegion(taskRecord: TaskModel): object;
        getTaskBox(taskRecord: TaskModel, inner?: boolean): Rectangle;
        scrollTaskIntoView(taskRecord: TaskModel, options?: object): Promise<any>;
    }

    export class GanttBase extends TimelineBase implements GanttDom, GanttRegions, GanttScroll, GanttState, GanttStores, EventNavigation, TaskNavigation {        
        project: ProjectModel;        
        indent(tasks: Array<any>|TaskModel): void;
        outdent(tasks: Array<any>|TaskModel): void;
        resolveTaskRecord(element: HTMLElement): TaskModel;
        getElementFromTaskRecord(taskRecord: TaskModel, inner?: boolean): HTMLElement;
        getScheduleRegion(taskRecord: TaskModel): object;
        getTaskBox(taskRecord: TaskModel, inner?: boolean): Rectangle;
        scrollTaskIntoView(taskRecord: TaskModel, options?: object): Promise<any>;
    }

    export class GanttDom {        
        resolveTaskRecord(element: HTMLElement): TaskModel;
        getElementFromTaskRecord(taskRecord: TaskModel, inner?: boolean): HTMLElement;
    }

    export class GanttRegions {        
        getScheduleRegion(taskRecord: TaskModel): object;
        getTaskBox(taskRecord: TaskModel, inner?: boolean): Rectangle;
    }

    export class GanttScroll {        
        scrollTaskIntoView(taskRecord: TaskModel, options?: object): Promise<any>;
    }

    export class GanttState {
    }

    export class GanttStores {
    }

    export class TaskNavigation {
    }

    export class AssignmentField extends PickerField {
    }

    export class AssignmentGrid extends Grid {
    }

    export class CalendarPicker extends Combo {        
        refreshCalendars(calendars: Array<any>): void;
    }

    export class DependencyField extends Combo {
    }

    export class TaskEditor extends GanttTaskEditor {
    }

    export class Timeline extends Scheduler {
    }

    export class AggregateColumn extends Column {
    }

    export class CheckColumn extends WidgetColumn {
    }

    export class Column extends Model implements Events, Localizable {        
        contentElement: HTMLElement;
        defaults: object;
        element: HTMLElement;
        flex: string;
        hidden: boolean;
        icon: string;
        listeners: object;
        localeManager: LocaleManager;
        subGrid: SubGrid;
        text: string;
        textElement: HTMLElement;
        textWrapper: HTMLElement;
        width: number|string;        
        getRawValue(record: Model): any;
        hide(): void;
        show(): void;
        toggle(force: boolean): void;
        resizeToFitContent(): void;
        addListener(config: object, thisObj?: object, prio?: number): Function;
        on(config: any, thisObj?: any): void;
        un(config: any, thisObj: any): void;
        removeListener(config: object, thisObj: object): void;
        hasListener(eventName: string): boolean;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        trigger(eventName: string, param: object): boolean;
        suspendEvents(queue?: boolean): void;
        resumeEvents(): void;
        L(text: string, templateData?: object): string;
    }

    export class DateColumn extends Column {        
        format: string;
    }

    export class NumberColumn extends Column {
    }

    export class PercentColumn extends Column {
    }

    export class RatingColumn extends NumberColumn {
    }

    export class RowNumberColumn extends Column {        
        resizeToFitContent(): void;
    }

    export class TemplateColumn extends Column {
    }

    export class TimeColumn extends Column {        
        format: string;
    }

    export class TreeColumn extends Column {
    }

    export class WidgetColumn extends Column {
    }

    export class GridTag {
    }

    export class ColumnStore extends Store {        
        bottomColumns: Array<any>;
        topColumns: Array<any>;
        visibleColumns: Array<any>;        
        get(field: string): Column;
        indexOf(recordOrId: any): number;
        static registerColumnType(columnClass: AnyConstructor, simpleRenderer?: boolean): void;
    }

    export class GridRowModel extends Model {        
        cls: string;
        expanded: boolean;
        href: string;
        iconCls: string;
        rowHeight: number;
        target: string;
    }

    export class GridCellEdit extends InstancePlugin {        
        isEditing: boolean;        
        confirm(options: object): void;
        startEditing(cellContext: object): boolean;
        cancelEditing(silent?: boolean): void;
        finishEditing(): void;
    }

    export class CellTooltip extends InstancePlugin {
    }

    export class ColumnDragToolbar extends InstancePlugin {
    }

    export class ColumnPicker extends InstancePlugin {
    }

    export class ColumnReorder extends InstancePlugin {
    }

    export class ColumnResize extends InstancePlugin {
    }

    export class ContextMenu extends InstancePlugin {
    }

    export class Filter extends InstancePlugin {        
        showFilterEditor(column: Column, value: any): void;
        closeFilterEditor(): void;
    }

    export class FilterBar extends InstancePlugin {        
        hideFilterBar(): void;
        showFilterBar(): void;
        toggleFilterBar(): void;
    }

    export class GridFeatureManager {        
        static registerFeature(featureClass: InstancePlugin, onByDefault?: boolean, forType?: string|Array<any>): void;
        static getTypeNameFeatures(forType?: string): object;
        static getTypeNameDefaultFeatures(forType?: string): object;
        static getInstanceFeatures(instance: object): object;
        static getInstanceDefaultFeatures(instance: object): object;
        static isDefaultFeatureForTypeName(featureClass: InstancePlugin, forType?: string): boolean;
        static isDefaultFeatureForInstance(featureClass: InstancePlugin, forType?: string): boolean;
    }

    export class Group extends InstancePlugin {        
        toggleCollapse(recordOrId: any, collapse: any): void;
        collapseAll(): void;
        expandAll(): void;
    }

    export class GridGroupSummary extends InstancePlugin {
    }

    export class QuickFind extends InstancePlugin {        
        found: Array<any>;
        foundCount: number;        
        search(find: any, columnFieldOrId: any): void;
        clear(): void;
        gotoHit(index: any): void;
        gotoFirstHit(): void;
        gotoLastHit(): void;
        gotoNextHit(): void;
        gotoPrevHit(): void;
    }

    export class RegionResize extends InstancePlugin {
    }

    export class RowReorder extends InstancePlugin {
    }

    export class Search extends InstancePlugin {        
        foundCount: number;
        isHitFocused: boolean;        
        search(find: string, gotoHit?: boolean, reapply?: boolean): void;
        clear(): void;
        gotoNextHit(): void;
        gotoPrevHit(): void;
        gotoHit(index: any): void;
        gotoFirstHit(): void;
        gotoLastHit(): void;
    }

    export class Sort extends InstancePlugin {
    }

    export class Stripe extends InstancePlugin {
    }

    export class GridSummary extends InstancePlugin {
    }

    export class Tree extends InstancePlugin {        
        toggleCollapse(idOrRecord: string|number|Model, collapse?: boolean, skipRefresh?: boolean): Promise<any>;
        collapse(idOrRecord: string|number|Model): Promise<any>;
        expand(idOrRecord: string|number|Model): Promise<any>;
        expandOrCollapseAll(collapse?: boolean, topNode?: Model): Promise<any>;
        collapseAll(): Promise<any>;
        expandAll(): Promise<any>;
        expandTo(idOrRecord: string|number|Model): Promise<any>;
    }

    export class GridExcelExporter extends InstancePlugin {        
        export(config: object): void;
    }

    export class GridPdfExport extends InstancePlugin {        
        currentExportPromise: Promise<any>;        
        export(config: object): Promise<any>;
        showExportDialog(): void;
    }

    export class Row extends Base {        
        bottom: number;
        cells: Array<any>;
        dataIndex: number;
        elements: Array<any>;
        height: number;
        id: string|number;
        index: number;
        isFirst: boolean;
        offsetHeight: number;
        top: number;        
        constructor(config: object, index: number);
        getElement(region: string): HTMLElement;
        eachElement(fn: Function): void;
        eachCell(fn: Function): void;
        getCells(region: string): Array<any>;
        getCell(columnId: string|number): HTMLElement;
        addCls(classes: string): void;
        removeCls(classes: string): void;
    }

    export class TableExporter extends Base {        
        export(config: object): object;
    }

    export class Grid extends GridBase {
    }

    export class GridBase extends Widget implements Events, Pluggable, State, GridElementEvents, GridFeatures, GridResponsive, GridSelection, GridState, GridSubGrids {        
        bodyHeight: number;
        columnLines: boolean;
        columns: ColumnStore;
        data: Array<any>;
        features: any;
        headerHeight: number;
        listeners: object;
        plugins: object;
        readOnly: boolean;
        responsiveLevel: string;
        selectedCell: object;
        selectedCellCSSSelector: string;
        selectedRecord: Model;
        selectedRecords: Array<any>|Array<any>;
        state: object;
        store: Store|object;        
        collapseAll(): void;
        expandAll(): void;
        startEditing(cellContext: object): boolean;
        toggleCollapse(idOrRecord: string|number|Model, collapse?: boolean, skipRefresh?: boolean): Promise<any>;
        collapse(idOrRecord: string|number|Model): Promise<any>;
        expand(idOrRecord: string|number|Model): Promise<any>;
        expandTo(idOrRecord: string|number|Model): Promise<any>;
        getCell(cellContext: object): HTMLElement;
        getHeaderElement(columnId: string|number|Column): HTMLElement;
        getRecordFromElement(element: HTMLElement): Model;
        getColumnFromElement(element: HTMLElement): Column;
        scrollRowIntoView(recordOrId: Model|string|number, options?: object): Promise<any>;
        scrollColumnIntoView(column: Column|string|number, options?: object): Promise<any>;
        scrollCellIntoView(cellContext: object): void;
        scrollToBottom(): Promise<any>;
        scrollToTop(): Promise<any>;
        storeScroll(): object;
        restoreScroll(state: any): void;
        refreshRows(): void;
        refreshColumn(column: Column): void;
        renderRows(): void;
        renderContents(): void;
        maskBody(loadMask: string): Mask;
        unmaskBody(): void;
        addListener(config: object, thisObj?: object, prio?: number): Function;
        on(config: any, thisObj?: any): void;
        un(config: any, thisObj: any): void;
        removeListener(config: object, thisObj: object): void;
        hasListener(eventName: string): boolean;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        trigger(eventName: string, param: object): boolean;
        suspendEvents(queue?: boolean): void;
        resumeEvents(): void;
        addPlugins(plugins: any): void;
        hasPlugin(pluginClassOrName: any): boolean;
        getPlugin(pluginClassOrName: any): object;
        hasFeature(name: string): boolean;
        spliceSelectedRecords(index: number, toRemove: Array<any>|number, toAdd: Array<any>|object): void;
        isSelected(cellSelectorOrId: object|string|number|Model): boolean;
        isSelectable(recordCellOrId: any): boolean;
        selectRow(options: object): void;
        selectCell(cellSelector: object, scrollIntoView?: boolean, addToSelection?: boolean, silent?: boolean): object;
        deselectAll(): void;
        deselectRow(recordOrId: Model|string|number): void;
        deselectCell(cellSelector: object): object;
        selectRange(fromId: string|number, toId: string|number): void;
        getSubGrid(region: string): SubGrid;
        getSubGridFromColumn(column: string|Column): SubGrid;
    }

    export class SubGrid extends Widget {        
        collapsed: boolean;
        flex: number|string;
        rowElements: Array<any>;
        viewRectangle: Rectangle;
        width: number;        
        scrollColumnIntoView(column: Column|string|number, options?: object): Promise<any>;
        collapse(): Promise<any>;
        expand(): Promise<any>;
    }

    export class TreeGrid extends Grid {        
        store: Store|object;        
        toggleCollapse(idOrRecord: string|number|Model, collapse?: boolean, skipRefresh?: boolean): Promise<any>;
        collapse(idOrRecord: string|number|Model): Promise<any>;
        expand(idOrRecord: string|number|Model): Promise<any>;
        expandTo(idOrRecord: string|number|Model): Promise<any>;
    }

    export class ExportDialog extends Popup {        
        client: any;
        hidePNGMultipageOption: any;
    }

    export class GridElementEvents {
    }

    export class GridFeatures {        
        features: any;        
        hasFeature(name: string): boolean;
    }

    export class GridNavigation {        
        cellCSSSelector: string;
        focusedCell: object;
        isActionableLocation: boolean;        
        isFocused(cellSelector: object|string|number): boolean;
        focusCell(cellSelector: object, options: object): object;
        navigateRight(event?: Event): object;
        navigateLeft(event?: Event): object;
        navigateDown(event?: Event): object;
        navigateUp(event?: Event): object;
    }

    export class GridResponsive {        
        responsiveLevel: string;
    }

    export class GridSelection {        
        selectedCell: object;
        selectedCellCSSSelector: string;
        selectedRecord: Model;
        selectedRecords: Array<any>|Array<any>;        
        spliceSelectedRecords(index: number, toRemove: Array<any>|number, toAdd: Array<any>|object): void;
        isSelected(cellSelectorOrId: object|string|number|Model): boolean;
        isSelectable(recordCellOrId: any): boolean;
        selectRow(options: object): void;
        selectCell(cellSelector: object, scrollIntoView?: boolean, addToSelection?: boolean, silent?: boolean): object;
        deselectAll(): void;
        deselectRow(recordOrId: Model|string|number): void;
        deselectCell(cellSelector: object): object;
        selectRange(fromId: string|number, toId: string|number): void;
    }

    export class GridState {
    }

    export class GridSubGrids {        
        getSubGrid(region: string): SubGrid;
        getSubGridFromColumn(column: string|Column): SubGrid;
    }

    export class ResourceInfoColumn extends Column {
    }

    export class TimeAxisColumn extends Column {        
        refreshHeader(): void;
    }

    export abstract class AbstractCrudManager extends Base implements Events, AbstractCrudManagerMixin {        
        crudRevision: number;
        crudStores: Array<any>;
        isCrudManagerLoading: boolean;
        isLoading: boolean;
        listeners: object;
        revision: number;
        stores: Array<any>;
        syncApplySequence: Array<any>;        
        commit(): void;
        reject(): void;
        addStore(store: Store|string|object|Array<any>|Array<any>|Array<any>, position?: number, fromStore?: string|Store|object): void;
        addListener(config: object, thisObj?: object, prio?: number): Function;
        on(config: any, thisObj?: any): void;
        un(config: any, thisObj: any): void;
        removeListener(config: object, thisObj: object): void;
        hasListener(eventName: string): boolean;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        trigger(eventName: string, param: object): boolean;
        suspendEvents(queue?: boolean): void;
        resumeEvents(): void;
        abstract sendRequest(request: object): Promise<any>;
        abstract cancelRequest(request: object): void;
        abstract encode(request: object): string;
        abstract decode(response: string): object;
        getStoreDescriptor(storeId: string|Store): object;
        getCrudStore(storeId: string): Store;
        addCrudStore(store: Store|string|object|Array<any>|Array<any>|Array<any>, position?: number, fromStore?: string|Store|object): void;
        removeCrudStore(store: object|string|Store): void;
        addStoreToApplySequence(store: Store|object|Array<any>|Array<any>, position?: number, fromStore?: string|Store|object): void;
        removeStoreFromApplySequence(store: object|string|Store): void;
        crudStoreHasChanges(storeId?: string|Store): boolean;
        load(options: object): Promise<any>;
        sync(): Promise<any>;
        commitCrudStores(): void;
        rejectCrudStores(): void;
        doDestroy(): void;
    }

    export abstract class AbstractCrudManagerMixin {        
        crudRevision: number;
        crudStores: Array<any>;
        isCrudManagerLoading: boolean;
        syncApplySequence: Array<any>;        
        abstract sendRequest(request: object): Promise<any>;
        abstract cancelRequest(request: object): void;
        abstract encode(request: object): string;
        abstract decode(response: string): object;
        getStoreDescriptor(storeId: string|Store): object;
        getCrudStore(storeId: string): Store;
        addCrudStore(store: Store|string|object|Array<any>|Array<any>|Array<any>, position?: number, fromStore?: string|Store|object): void;
        removeCrudStore(store: object|string|Store): void;
        addStoreToApplySequence(store: Store|object|Array<any>|Array<any>, position?: number, fromStore?: string|Store|object): void;
        removeStoreFromApplySequence(store: object|string|Store): void;
        crudStoreHasChanges(storeId?: string|Store): boolean;
        load(options: object): Promise<any>;
        sync(): Promise<any>;
        commitCrudStores(): void;
        rejectCrudStores(): void;
        doDestroy(): void;
    }

    export class JsonEncoder {        
        encode(request: object): string;
        decode(responseText: string): object;
    }

    export abstract class AjaxTransport {        
        cancelRequest(requestPromise: Promise<any>): void;
        sendRequest(request: object): Promise<any>;
    }

    export class SchedulerAssignmentStore extends Store {        
        eventStore: any;        
        mapAssignmentsForEvent(event: EventModel, fn?: Function, filterFn?: Function): Array<any>;
        mapAssignmentsForResource(resource: SchedulerResourceModel|number|string, fn?: Function, filterFn?: Function): Array<any>;
        getAssignmentsForEvent(event: TimeSpan): Array<any>;
        removeAssignmentsForEvent(event: TimeSpan|object): void;
        getAssignmentsForResource(event: SchedulerResourceModel|object): Array<any>;
        removeAssignmentsForResource(resource: SchedulerResourceModel|any): void;
        getResourcesForEvent(event: EventModel): Array<any>;
        getEventsForResource(resource: SchedulerResourceModel|any): Array<any>;
        assignEventToResource(event: TimeSpan|any, resource: SchedulerResourceModel|Array<any>): Array<any>;
        unassignEventFromResource(event: TimeSpan|string|number, resource?: SchedulerResourceModel|string|number): SchedulerAssignmentModel|Array<any>;
        isEventAssignedToResource(event: EventModel|string|number, resource: SchedulerResourceModel|string|number): boolean;
        getAssignmentForEventAndResource(event: EventModel|string|number, resource: SchedulerResourceModel|string|number): SchedulerAssignmentModel;
    }

    export class Calendar {        
        static allCalendars: Array<any>;
        calendarId: string;
        parent: any;        
        static getCalendar(id: string): Calendar;
        removeAll(): Array<any>;
        intersectsWithCurrentWeeks(startDate: Date, endDate: Date): boolean;
        addNonStandardWeek(startDate: Date, endDate: Date, weekAvailability: Array<any>|Array<any>, name: string): void;
        getNonStandardWeekByStartDate(startDate: Date): object;
        removeNonStandardWeek(startDate: Date): void;
        getNonStandardWeekByDate(timeDate: Date): object;
        setWeekendsAreWorkDays(value: boolean): void;
        areWeekendsWorkDays(): boolean;
        forEachNonStandardWeek(func: Function, thisObj: object): boolean;
        getCalendarDay(timeDate: Date): CalendarDayModel;
        getOverrideDay(timeDate: Date): CalendarDayModel;
        getOwnCalendarDay(timeDate: Date): CalendarDayModel;
        getWeekDay(weekDayIndex: number, timeDate?: Date): CalendarDayModel;
        isHoliday(timeDate: Date): boolean;
        getDefaultCalendarDay(weekDayIndex: number): CalendarDayModel;
        isWorkingDay(date: Date): boolean;
        isWeekend(timeDate: Date): boolean;
        convertMSDurationToUnit(durationInMs: number, unit: string): number;
        convertDurationToMs(durationInMs: number, unit: string): number;
        forEachAvailabilityInterval(options: object, func: Function, thisObj: object): boolean;
        calculateDuration(startDate: Date, endDate: Date, unit: string): number;
        getHolidaysRanges(startDate: Date, endDate: Date): Array<any>;
        calculateEndDate(startDate: Date, duration: number, unit: string): Date;
        skipNonWorkingTime(date: Date, isForward: boolean): Date;
        calculateStartDate(endDate: Date, duration: number, unit: string): Date;
        skipWorkingTime(date: Date, duration: number, unit: string): Date;
        getAvailabilityIntervalsFor(timeDate: Date|number): Array<any>;
    }

    export class CrudManager extends AbstractCrudManager implements JsonEncoder, AjaxTransport {        
        assignmentStore: SchedulerAssignmentStore;
        dependencyStore: SchedulerDependencyStore;
        eventStore: EventStore;
        resourceStore: SchedulerResourceStore;
        timeRangesStore: Store;        
        encode(request: object): string;
        decode(responseText: string): object;
        cancelRequest(requestPromise: Promise<any>): void;
        sendRequest(request: object): Promise<any>;
    }

    export class SchedulerDependencyStore extends AjaxStore {        
        eventStore: EventStore;        
        getEventDependencies(event: EventModel, flat?: boolean): Array<any>;
        getEventPredecessors(event: EventModel, flat?: boolean): Array<any>;
        getEventSuccessors(event: EventModel, flat?: boolean): Array<any>;
        getDependencyForSourceAndTargetEvents(sourceEvent: EventModel|string, targetEvent: EventModel|string): SchedulerDependencyModel;
        getEventsLinkingDependency(sourceEvent: EventModel|string, targetEvent: EventModel|string): SchedulerDependencyModel;
        isValidDependency(dependencyOrFromId: SchedulerDependencyModel|number|string, toId?: number|string, type?: number): boolean;
        getHighlightedDependencies(cls: string): Array<any>;
    }

    export class EventStore extends AjaxStore implements EventStoreMixin {        
        assignmentStore: SchedulerAssignmentStore;
        dependencyStore: SchedulerDependencyStore;
        resourceStore: SchedulerResourceStore;        
        append(record: EventModel): void;
        getEventsInTimeSpan(start: Date, end: Date, allowPartial?: boolean, onlyAssigned?: boolean): Array<any>;
        getEventsByStartDate(start: any): Array<any>;
        forEachScheduledEvent(fn: Function, thisObj: object): void;
        getTotalTimeSpan(): object;
        isEventPersistable(event: EventModel): boolean;
        isDateRangeAvailable(start: Date, end: Date, excludeEvent: EventModel, resource: SchedulerResourceModel): boolean;
        getResourcesForEvent(event: EventModel|string|number): Array<any>;
        getEventsForResource(resource: SchedulerResourceModel|string|number): Array<any>;
        getAssignmentsForEvent(event: EventModel|string|number): Array<any>;
        getAssignmentsForResource(resource: SchedulerResourceModel|string|number): Array<any>;
        assignEventToResource(event: EventModel|string|number, resource: SchedulerResourceModel|string|number|Array<any>|Array<any>|Array<any>): void;
        unassignEventFromResource(event: EventModel|string|number, resource: SchedulerResourceModel|string|number): void;
        reassignEventFromResourceToResource(event: EventModel, oldResource: SchedulerResourceModel|Array<any>, newResource: SchedulerResourceModel|Array<any>): void;
        isEventAssignedToResource(event: EventModel|string|number, resource: SchedulerResourceModel|string|number): boolean;
        removeAssignmentsForEvent(event: EventModel|string|number): void;
        removeAssignmentsForResource(resource: SchedulerResourceModel|string|number): void;
    }

    export class SchedulerResourceStore extends AjaxStore implements ResourceStoreMixin {        
        eventStore: EventStore;
    }

    export class ResourceTimeRangeStore extends AjaxStore {
    }

    export class TimeAxis extends Store {        
        endDate: Date;
        isContinuous: boolean;
        ticks: Array<any>;
        viewPreset: ViewPreset;        
        setTimeSpan(newStartDate: Date, newEndDate: Date): void;
        shift(amount: number, unit?: string): void;
        shiftNext(amount?: number): void;
        shiftPrevious(amount?: number): void;
        filterBy(fn: Function, thisObj?: object): void;
        generateTicks(axisStartDate: Date, axisEndDate: Date, unit: string, increment: number): Array<any>;
        getTickFromDate(date: Date): number;
        getDateFromTick(tick: number, roundingMethod?: string): Date;
        dateInAxis(date: Date): boolean;
        timeSpanInAxis(start: Date, end: Date): boolean;
    }

    export class AssignmentAPI {
    }

    export class BatchAPI {        
        beginPropagationBatch(): void;
        endPropagationBatch(): Promise<any>;
    }

    export class DataAPI {        
        dataApi: object;
    }

    export class DependencyAPI {
    }

    export class EventAPI {
    }

    export class ResourceAPI {
    }

    export class EventStoreMixin {        
        assignmentStore: SchedulerAssignmentStore;
        dependencyStore: SchedulerDependencyStore;
        resourceStore: SchedulerResourceStore;        
        getEventsInTimeSpan(start: Date, end: Date, allowPartial?: boolean, onlyAssigned?: boolean): Array<any>;
        getEventsByStartDate(start: any): Array<any>;
        forEachScheduledEvent(fn: Function, thisObj: object): void;
        getTotalTimeSpan(): object;
        isEventPersistable(event: EventModel): boolean;
        isDateRangeAvailable(start: Date, end: Date, excludeEvent: EventModel, resource: SchedulerResourceModel): boolean;
        getResourcesForEvent(event: EventModel|string|number): Array<any>;
        getEventsForResource(resource: SchedulerResourceModel|string|number): Array<any>;
        getAssignmentsForEvent(event: EventModel|string|number): Array<any>;
        getAssignmentsForResource(resource: SchedulerResourceModel|string|number): Array<any>;
        assignEventToResource(event: EventModel|string|number, resource: SchedulerResourceModel|string|number|Array<any>|Array<any>|Array<any>): void;
        unassignEventFromResource(event: EventModel|string|number, resource: SchedulerResourceModel|string|number): void;
        reassignEventFromResourceToResource(event: EventModel, oldResource: SchedulerResourceModel|Array<any>, newResource: SchedulerResourceModel|Array<any>): void;
        isEventAssignedToResource(event: EventModel|string|number, resource: SchedulerResourceModel|string|number): boolean;
        removeAssignmentsForEvent(event: EventModel|string|number): void;
        removeAssignmentsForResource(resource: SchedulerResourceModel|string|number): void;
    }

    export class RecurringEventsMixin extends RecurringTimeSpansMixin {        
        supportsRecurringEvents: boolean;        
        generateOccurrencesForEventsBuffered(events: Array<any>, startDate: Date, endDate: Date, preserveExisting?: boolean): Promise<any>;
        regenerateOccurrencesForEventsBuffered(events: Array<any>, startDate: Date, endDate: Date): Promise<any>;
        getRecurringEvents(): Array<any>;
        getOccurrencesForEvents(events: EventModel|Array<any>): Array<any>;
        removeOccurrencesForEvents(events: EventModel|Array<any>): void;
    }

    export class RecurringTimeSpansMixin {        
        delayedCallTimeout: number;
        supportsRecurringTimeSpans: boolean;        
        regenerateOccurrencesForTimeSpansBuffered(timeSpans: Array<any>, startDate: Date, endDate: Date): Promise<any>;
        generateOccurrencesForTimeSpansBuffered(timeSpans: Array<any>, startDate: Date, endDate: Date, preserveExisting?: boolean): Promise<any>;
        getRecurringTimeSpans(): Array<any>;
        getOccurrencesForTimeSpans(records: TimeSpan|Array<any>): Array<any>;
        getOccurrencesForAll(): Array<any>;
        removeOccurrencesForTimeSpans(timeSpans: TimeSpan|Array<any>): void;
        removeOccurrencesForAll(): void;
    }

    export class ResourceStoreMixin {        
        eventStore: EventStore;
    }

    export class RecurrenceLegend implements Localizable {        
        localeManager: LocaleManager;        
        static getLegend(recurrence: RecurrenceModel, timeSpanStartDate?: Date): string;
        L(text: string, templateData?: object): string;
    }

    export abstract class AbstractTimeRanges extends InstancePlugin {        
        showHeaderElements: boolean;
        store: Store;        
        getTipHtml(): void;
        hasTimeout(name: any): void;
        setTimeout(timeoutSpec: object): number;
        clearTimeout(idOrName: number|string): void;
        clearInterval(id: number): void;
        setInterval(fn: any, delay: any): number;
        requestAnimationFrame(fn: Function, extraArgs?: Array<any>, thisObj?: object): number;
        createOnFrame(fn: Function|string, args?: Array<any>, thisObj?: object, cancelOutstanding?: boolean): void;
        cancelAnimationFrame(handle: number): void;
        buffer(fn: Function|string, delay: number, thisObj?: object): Function;
        throttle(fn: Function, buffer: number): void;
    }

    export class ColumnLines extends InstancePlugin {
    }

    export class SchedulerDependencies extends InstancePlugin implements DependencyCreation {        
        refreshDependency(dependency: SchedulerDependencyModel): void;
        drawDependency(dependency: SchedulerDependencyModel): void;
        drawForEvent(): void;
        draw(): void;
        releaseDependency(dependency: SchedulerDependencyModel): void;
        getConnectorStartSide(timeSpanRecord: TimeSpan): string;
        getConnectorEndSide(timeSpanRecord: TimeSpan): string;
        hasTimeout(name: any): void;
        setTimeout(timeoutSpec: object): number;
        clearTimeout(idOrName: number|string): void;
        clearInterval(id: number): void;
        setInterval(fn: any, delay: any): number;
        requestAnimationFrame(fn: Function, extraArgs?: Array<any>, thisObj?: object): number;
        createOnFrame(fn: Function|string, args?: Array<any>, thisObj?: object, cancelOutstanding?: boolean): void;
        cancelAnimationFrame(handle: number): void;
        buffer(fn: Function|string, delay: number, thisObj?: object): Function;
        throttle(fn: Function, buffer: number): void;
        abort(): void;
        showTerminals(timeSpanRecord: TimeSpan, element: HTMLElement): void;
        hideTerminals(eventElement: HTMLElement): void;
    }

    export class SchedulerDependencyEdit extends InstancePlugin {        
        cancelButton: Button;
        deleteButton: Button;
        fromNameField: DisplayField;
        lagField: DurationField;
        saveButton: Button;
        toNameField: DisplayField;
        typeField: Combo;        
        onBeforeSave(dependencyRecord: SchedulerDependencyModel): void;
        onAfterSave(dependencyRecord: SchedulerDependencyModel): void;
        editDependency(dependencyRecord: SchedulerDependencyModel): void;
    }

    export class EventContextMenu extends TimeSpanRecordContextMenuBase {        
        showContextMenuFor(eventRecord: EventModel, options?: object): void;
    }

    export class EventDrag extends DragBase {        
        getRelatedRecords(eventRecord: EventModel): Array<any>;
    }

    export class EventDragCreate extends DragCreateBase {
    }

    export class EventDragSelect extends InstancePlugin {        
        hasTimeout(name: any): void;
        setTimeout(timeoutSpec: object): number;
        clearTimeout(idOrName: number|string): void;
        clearInterval(id: number): void;
        setInterval(fn: any, delay: any): number;
        requestAnimationFrame(fn: Function, extraArgs?: Array<any>, thisObj?: object): number;
        createOnFrame(fn: Function|string, args?: Array<any>, thisObj?: object, cancelOutstanding?: boolean): void;
        cancelAnimationFrame(handle: number): void;
        buffer(fn: Function|string, delay: number, thisObj?: object): Function;
        throttle(fn: Function, buffer: number): void;
    }

    export class EventEdit extends EditBase implements RecurringEventEdit {        
        cancelButton: Button;
        deleteButton: Button;
        editRecurrenceButton: RecurrenceLegendButton;
        endDateField: DateField;
        endTimeField: TimeField;
        eventRecord: EventModel;
        nameField: TextField;
        readOnly: boolean;
        recurrenceCombo: RecurrenceCombo;
        resourceField: Combo;
        saveButton: Button;
        startDateField: DateField;
        startTimeField: TimeField;        
        editEvent(eventRecord: EventModel, resourceRecord?: SchedulerResourceModel, element?: HTMLElement): void;
    }

    export class EventFilter extends InstancePlugin {
    }

    export class EventResize extends ResizeBase {
    }

    export class EventTooltip extends TooltipBase {
    }

    export class GroupSummary extends GridGroupSummary {
    }

    export class HeaderContextMenu extends InstancePlugin {
    }

    export class HeaderZoom extends InstancePlugin {
    }

    export class SchedulerLabels extends InstancePlugin {
    }

    export class NonWorkingTime extends AbstractTimeRanges {
    }

    export class Pan extends InstancePlugin {
    }

    export class RecurringEvents extends RecurringTimeSpans {
    }

    export class RecurringTimeSpans extends InstancePlugin {        
        store: Store;        
        bindClient(panel?: Scheduler): void;
        bindStore(store?: Store): void;
        isRecurrenceRelatedFieldChange(timeSpan: TimeSpan, toSet: object): boolean;
    }

    export class ResourceTimeRanges extends InstancePlugin {
    }

    export class ScheduleContextMenu extends TimeSpanRecordContextMenuBase {
    }

    export class ScheduleTooltip extends InstancePlugin {        
        getHoverTipHtml(): void;
        getText(date: Date, event: Event): string;
    }

    export class SimpleEventEdit extends InstancePlugin {        
        eventRecord: EventModel;        
        editEvent(eventRecord: EventModel, resourceRecord?: SchedulerResourceModel): void;
    }

    export class Summary extends GridSummary {
    }

    export class TimeRanges extends AbstractTimeRanges {        
        disabled: boolean;
        showCurrentTimeLine: boolean;
        store: Store;
    }

    export abstract class DragBase extends InstancePlugin {        
        disabled: boolean;        
        getTipHtml(): void;
    }

    export class DragCreateBase extends InstancePlugin {        
        addProxy(config: any): void;
        initResizer(event: any, data: any): void;
        initTooltip(): void;
        getTipHtml(): any;
    }

    export class EditBase extends InstancePlugin {        
        onBeforeSave(eventRecord: EventModel): void;
        onAfterSave(eventRecord: EventModel): void;
    }

    export abstract class ResizeBase extends InstancePlugin {
    }

    export abstract class TimeSpanRecordContextMenuBase extends InstancePlugin {        
        showContextMenuFor(record: TimeSpan, options?: object): void;
    }

    export class TooltipBase extends InstancePlugin {        
        tooltip: Tooltip;
    }

    export class ExcelExporter extends GridExcelExporter {
    }

    export class SchedulerPdfExport extends GridPdfExport {
    }

    export class DependencyCreation {        
        abort(): void;
        showTerminals(timeSpanRecord: TimeSpan, element: HTMLElement): void;
        hideTerminals(eventElement: HTMLElement): void;
    }

    export class RecurringEventEdit {        
        editRecurrenceButton: RecurrenceLegendButton;
        recurrenceCombo: RecurrenceCombo;
    }

    export class SchedulerAssignmentModel extends Model {        
        eventId: string|number;
        resourceId: string|number;        
        assignmentStore: SchedulerAssignmentStore;
        event: EventModel;
        eventName: string;
        eventStore: EventStore;
        isPersistable: boolean;
        resource: SchedulerResourceModel;
        resourceName: string;
        resourceStore: SchedulerResourceStore;        
        getResource(): SchedulerResourceModel;
    }

    export class CalendarDayModel extends Model {        
        availability: Array<any>|Array<any>;
        cls: string;
        date: string|Date;
        id: string|number;
        isWorkingDay: boolean;
        name: string;
        overrideEndDate: Date;
        overrideStartDate: Date;
        type: string;
        weekday: number;        
        totalHours: number;
        totalMS: number;        
        clearDate(): void;
        getAvailability(asString: boolean): Array<any>|Array<any>;
        addAvailabilityInterval(startTime: Date|string, endTime: Date|string): void;
        removeAvailabilityInterval(index: number): void;
        getAvailabilityIntervalsFor(timeDate: Date): Array<any>;
        getAvailabilityStartFor(timeDate: Date): Date;
        getAvailabilityEndFor(timeDate: Date): Date;
    }

    export class DependencyBaseModel extends Model {        
        bidirectional: boolean;
        cls: string;
        from: string|number;
        fromSide: string;
        lag: number;
        lagUnit: string;
        to: string|number;
        toSide: string;
        type: number;        
        static Type: object;
        fullLag: object;
        hardType: number;
        isPersistable: boolean;
        sourceEvent: EventModel;
        targetEvent: EventModel;        
        getHardType(): number;
        setHardType(type: number): void;
        setLag(lag: number|string|object, lagUnit?: string): void;
        getSourceEvent(): EventModel;
        getTargetEvent(): EventModel;
        highlight(cls: string): void;
        unhighlight(cls: string): void;
        isHighlightedWith(cls: string): boolean;
    }

    export class SchedulerDependencyModel extends DependencyBaseModel {
    }

    export class EventModel extends TimeSpan implements RecurringTimeSpan {        
        draggable: boolean;
        eventColor: string;
        eventStyle: string;
        exceptionDates: Array<any>;
        iconCls: string;
        id: string|number;
        milestoneWidth: number;
        recurrenceRule: string;
        recurringTimeSpanId: string|number;
        resizable: boolean|string;
        resourceId: string|number;        
        assignmentStore: SchedulerAssignmentStore;
        assignments: Array<any>;
        eventStore: EventStore;
        isDraggable: boolean;
        isEvent: any;
        isOccurrence: boolean;
        isPersistable: boolean;
        isRecurring: boolean;
        isResizable: any;
        occurrences: Array<any>;
        recurrence: RecurrenceModel;
        recurrenceModel: string;
        recurringTimeSpan: TimeSpan;
        resource: SchedulerResourceModel;
        resourceStore: SchedulerResourceStore;
        resources: Array<any>;
        supportsRecurring: boolean;        
        getResource(resourceId: string): SchedulerResourceModel;
        assign(resource: SchedulerResourceModel|string|number): void;
        unassign(resource?: SchedulerResourceModel|string|number|Array<any>): void;
        reassign(oldResourceId: SchedulerResourceModel|string|number, newResourceId: SchedulerResourceModel|string|number): void;
        isAssignedTo(resource: SchedulerResourceModel|string|number): boolean;
        setRecurrence(frequency: RecurrenceModel, interval?: number, recurrenceEnd?: number|Date): void;
        removeOccurrences(): void;
        onRecurrenceChanged(): void;
        buildOccurrence(startDate: Date): TimeSpan;
        addExceptionDate(date: Date): void;
    }

    export class RecurrenceModel extends Model {        
        count: number;
        days: Array<any>;
        endDate: Date;
        frequency: string;
        interval: number;
        monthDays: Array<any>;
        months: Array<any>;
        positions: number;        
        isRecurrenceModel: boolean;
        rule: any;
        timeSpan: any;
    }

    export class SchedulerResourceModel extends GridRowModel {        
        eventColor: string;
        eventStyle: string;
        id: string|number;
        imageUrl: string;
        name: string;        
        assignmentStore: SchedulerAssignmentStore;
        assignments: Array<any>;
        eventStore: EventStore;
        events: Array<any>;
        isPersistable: boolean;
        resourceStore: SchedulerResourceStore;        
        getEvents(eventStore: EventStore): Array<any>;
        isAbove(otherResource: SchedulerResourceModel): boolean;
        unassignAll(): void;
    }

    export class ResourceTimeRangeModel extends TimeSpan {        
        resourceId: string|number;
        timeRangeColor: string;
    }

    export class TimeSpan extends Model {        
        cls: DomClassList|string;
        duration: number;
        durationUnit: string;
        endDate: string|Date;
        name: string;
        startDate: string|Date;
        style: string;        
        dates: Array<any>;
        fullDuration: any;
        isScheduled: boolean;        
        setDuration(duration: number, durationUnit: string): void;
        setStartDate(date: Date, keepDuration?: boolean): void;
        setEndDate(date: Date, keepDuration?: boolean): void;
        setStartEndDate(start: Date, end: Date): void;
        forEachDate(func: Function, thisObj: object): void;
        shift(unit: string, amount: number): void;
        split(splitPoint?: number): TimeSpan;
    }

    export class RecurringTimeSpan {        
        exceptionDates: Array<any>;
        recurrenceRule: string;
        recurringTimeSpanId: string|number;        
        isOccurrence: boolean;
        isRecurring: boolean;
        occurrences: Array<any>;
        recurrence: RecurrenceModel;
        recurrenceModel: string;
        recurringTimeSpan: TimeSpan;
        supportsRecurring: boolean;        
        setRecurrence(frequency: RecurrenceModel, interval?: number, recurrenceEnd?: number|Date): void;
        removeOccurrences(): void;
        onRecurrenceChanged(): void;
        buildOccurrence(startDate: Date): TimeSpan;
        addExceptionDate(date: Date): void;
    }

    export class PresetManager extends PresetStore {        
        registerPreset(id: string, config: object): ViewPreset;
        normalizePreset(presetOrId: string|object): ViewPreset;
        deletePreset(id: string): void;
    }

    export class PresetStore extends Store {
    }

    export class ViewPreset extends Model {        
        columnLinesFor: number;
        defaultSpan: number;
        displayDateFormat: string;
        headers: object;
        mainHeaderLevel: number;
        rowHeight: number;
        shiftIncrement: number;
        shiftUnit: string;
        tickHeight: number;
        tickWidth: number;
        timeResolution: object;
    }

    export class ViewPresetHeaderRow {
    }

    export class ScheduleTableExporter extends TableExporter implements Localizable {        
        localeManager: LocaleManager;        
        L(text: string, templateData?: object): string;
    }

    export class ResourceHeader extends Widget {        
        fillWidth: boolean;
        fitWidth: boolean;        
        refresh(): void;
    }

    export class Scheduler extends SchedulerBase {
    }

    export class SchedulerBase extends TimelineBase implements EventNavigation, EventSelection, SchedulerDom, SchedulerDomEvents, SchedulerEventRendering, SchedulerRegions, SchedulerScroll, SchedulerState, SchedulerStores, TimelineDateMapper, TimelineDomEvents, TimelineEventRendering, TimelineScroll, TimelineViewPresets, TimelineZoomable {        
        static eventColors: string;
        static eventStyles: string;
        assignmentStore: SchedulerAssignmentStore;
        assignments: Array<any>|Array<any>;
        barMargin: number;
        crudManager: CrudManager;
        dependencyStore: SchedulerDependencyStore;
        displayDateFormat: string;
        eventLayout: string;
        eventStore: EventStore;
        events: Array<any>|Array<any>;
        fillTicks: string;
        maxZoomLevel: number;
        milestoneAlign: any;
        minZoomLevel: number;
        resourceColumnWidth: number;
        resourceColumns: ResourceHeader;
        resourceMargin: number;
        resourceStore: SchedulerResourceStore;
        resources: Array<any>|Array<any>;
        scrollLeft: number;
        scrollTop: number;
        selectedEvents: Array<any>|Array<any>;
        snap: boolean;
        tickSize: number;
        tickWidth: number;
        timeResolution: object;
        viewPreset: ViewPreset|string;
        viewportCenterDate: Date;
        zoomLevel: number;        
        editEvent(eventRecord: EventModel, resourceRecord?: SchedulerResourceModel, element?: HTMLElement): void;
        onEventCreated(eventRecord: EventModel): void;
        getEventMenuItems(params: object): void;
        getScheduleMenuItems(params: object): void;
        isDateRangeAvailable(start: Date, end: Date, excludeEvent: EventModel, resource: SchedulerResourceModel): boolean;
        isEventSelected(event: EventModel|SchedulerAssignmentModel): void;
        selectEvent(event: EventModel|SchedulerAssignmentModel, preserveSelection?: boolean): void;
        deselectEvent(event: EventModel|SchedulerAssignmentModel): void;
        selectEvents(events: Array<any>|Array<any>): void;
        deselectEvents(events: Array<any>|Array<any>): void;
        clearEventSelection(): void;
        getElementFromAssignmentRecord(assignmentRecord: SchedulerAssignmentModel): HTMLElement;
        getElementFromEventRecord(eventRecord: EventModel, resourceRecord: SchedulerResourceModel): HTMLElement;
        getElementsFromEventRecord(eventRecord: EventModel, resourceRecord?: SchedulerResourceModel): Array<any>;
        getEventRecordFromDomId(id: string): EventModel;
        getResourceRecordFromDomId(id: string): SchedulerResourceModel;
        resolveResourceRecord(elementOrEvent: HTMLElement|Event, xy?: Array<any>): SchedulerResourceModel;
        resolveEventRecord(element: HTMLElement): EventModel;
        resolveAssignmentRecord(element: HTMLElement): SchedulerAssignmentModel;
        getMilestoneLabelWidth(eventRecord: EventModel): number;
        repaintEventsForResource(resourceRecord: SchedulerResourceModel): void;
        onEventDataGenerated(eventData: object): void;
        getScheduleRegion(resourceRecord: SchedulerResourceModel, eventRecord: EventModel): object;
        getResourceRegion(resourceRecord: SchedulerResourceModel, startDate: Date, endDate: Date): Rectangle;
        getStartEndDatesFromRectangle(rect: Rectangle, roundingMethod: string): object;
        getResourceEventBox(eventRecord: EventModel, resourceRecord: SchedulerResourceModel, includeOutside?: boolean): any;
        scrollEventIntoView(eventRec: EventModel, options?: object): Promise<any>;
        scrollResourceEventIntoView(resourceRec: SchedulerResourceModel, eventRec: EventModel, index: number, options?: object): Promise<any>;
        scrollResourceIntoView(resourceRecord: SchedulerResourceModel, options?: object): Promise<any>;
        onAssignmentFilter(): void;
        applyStartEndParameters(): void;
        getDateFromCoordinate(coordinate: number, roundingMethod?: string, local?: boolean): Date;
        getDateFromX(x: number, roundingMethod: string, local?: boolean): Date;
        getDateFromXY(xy: Array<any>, roundingMethod?: string, local?: boolean): Date;
        getCoordinateFromDate(date: Date|number, options?: boolean|object): number;
        getDateFromDomEvent(e: Event, roundingMethod?: string, local?: boolean): Date;
        getTimeSpanDistance(startDate: Date, endDate: Date): number;
        scrollToDate(date: Date, options?: object): Promise<any>;
        scrollToNow(options?: object): Promise<any>;
        scrollHorizontallyTo(x: number, options?: object|boolean): Promise<any>;
        scrollVerticallyTo(y: number, options?: object|boolean): Promise<any>;
        scrollTo(x: number, options?: object|boolean): Promise<any>;
        zoomTo(config: object|string|number): void;
        zoomToLevel(preset: number, options?: object): number;
        zoomToFit(options?: object): void;
        zoomToSpan(config: object): number;
        zoomIn(levels?: number): number;
        zoomOut(levels?: number): number;
        zoomInFull(): number;
        zoomOutFull(): number;
        setTimeSpan(startDate: Date, endDate: Date): void;
        shift(amount: number, unit?: string): void;
        shiftNext(amount?: number): void;
        shiftPrevious(amount?: number): void;
    }

    export abstract class TimelineBase extends Grid implements TimelineDateMapper, TimelineDomEvents, TimelineEventRendering, TimelineScroll, TimelineViewPresets, TimelineZoomable {        
        static eventColors: string;
        static eventStyles: string;
        barMargin: number;
        displayDateFormat: string;
        endDate: Date;
        hasVisibleEvents: boolean;
        maxZoomLevel: number;
        minZoomLevel: number;
        scrollLeft: number;
        scrollTop: number;
        snap: boolean;
        tickSize: number;
        tickWidth: number;
        timeAxisViewModel: TimeAxisViewModel;
        timeResolution: object;
        viewPreset: ViewPreset|string;
        viewportCenterDate: Date;
        workingTime: object;
        zoomLevel: number;        
        setStartDate(date: Date, keepDuration?: boolean): void;
        setEndDate(date: Date, keepDuration?: boolean): void;
        getHeaderDomConfigs(configs: Array<any>): void;
        getForegroundDomConfigs(configs: Array<any>): void;
        refreshWithTransition(): void;
        getVisibleDateRange(): object;
        getDateFromCoordinate(coordinate: number, roundingMethod?: string, local?: boolean): Date;
        getDateFromX(x: number, roundingMethod: string, local?: boolean): Date;
        getDateFromXY(xy: Array<any>, roundingMethod?: string, local?: boolean): Date;
        getCoordinateFromDate(date: Date|number, options?: boolean|object): number;
        getDateFromDomEvent(e: Event, roundingMethod?: string, local?: boolean): Date;
        getTimeSpanDistance(startDate: Date, endDate: Date): number;
        scrollToDate(date: Date, options?: object): Promise<any>;
        scrollToNow(options?: object): Promise<any>;
        scrollHorizontallyTo(x: number, options?: object|boolean): Promise<any>;
        scrollVerticallyTo(y: number, options?: object|boolean): Promise<any>;
        scrollTo(x: number, options?: object|boolean): Promise<any>;
        zoomTo(config: object|string|number): void;
        zoomToLevel(preset: number, options?: object): number;
        zoomToFit(options?: object): void;
        zoomToSpan(config: object): number;
        zoomIn(levels?: number): number;
        zoomOut(levels?: number): number;
        zoomInFull(): number;
        zoomOutFull(): number;
        setTimeSpan(startDate: Date, endDate: Date): void;
        shift(amount: number, unit?: string): void;
        shiftNext(amount?: number): void;
        shiftPrevious(amount?: number): void;
    }

    export class SchedulerExportDialog extends ExportDialog {
    }

    export class EventNavigation {
    }

    export class EventSelection {        
        selectedEvents: Array<any>|Array<any>;        
        isEventSelected(event: EventModel|SchedulerAssignmentModel): void;
        selectEvent(event: EventModel|SchedulerAssignmentModel, preserveSelection?: boolean): void;
        deselectEvent(event: EventModel|SchedulerAssignmentModel): void;
        selectEvents(events: Array<any>|Array<any>): void;
        deselectEvents(events: Array<any>|Array<any>): void;
        clearEventSelection(): void;
    }

    export class SchedulerDom {        
        getElementFromAssignmentRecord(assignmentRecord: SchedulerAssignmentModel): HTMLElement;
        getElementFromEventRecord(eventRecord: EventModel, resourceRecord: SchedulerResourceModel): HTMLElement;
        getElementsFromEventRecord(eventRecord: EventModel, resourceRecord?: SchedulerResourceModel): Array<any>;
        getEventRecordFromDomId(id: string): EventModel;
        getResourceRecordFromDomId(id: string): SchedulerResourceModel;
        resolveResourceRecord(elementOrEvent: HTMLElement|Event, xy?: Array<any>): SchedulerResourceModel;
        resolveEventRecord(element: HTMLElement): EventModel;
        resolveAssignmentRecord(element: HTMLElement): SchedulerAssignmentModel;
        getMilestoneLabelWidth(eventRecord: EventModel): number;
    }

    export class SchedulerDomEvents {
    }

    export class SchedulerEventRendering {        
        eventLayout: string;
        fillTicks: string;
        resourceColumnWidth: number;
        resourceColumns: ResourceHeader;
        resourceMargin: number;        
        repaintEventsForResource(resourceRecord: SchedulerResourceModel): void;
        onEventDataGenerated(eventData: object): void;
    }

    export class SchedulerRegions {        
        getScheduleRegion(resourceRecord: SchedulerResourceModel, eventRecord: EventModel): object;
        getResourceRegion(resourceRecord: SchedulerResourceModel, startDate: Date, endDate: Date): Rectangle;
        getStartEndDatesFromRectangle(rect: Rectangle, roundingMethod: string): object;
        getResourceEventBox(eventRecord: EventModel, resourceRecord: SchedulerResourceModel, includeOutside?: boolean): any;
    }

    export class SchedulerScroll {        
        scrollEventIntoView(eventRec: EventModel, options?: object): Promise<any>;
        scrollResourceEventIntoView(resourceRec: SchedulerResourceModel, eventRec: EventModel, index: number, options?: object): Promise<any>;
        scrollResourceIntoView(resourceRecord: SchedulerResourceModel, options?: object): Promise<any>;
    }

    export class SchedulerState {
    }

    export class SchedulerStores {        
        assignmentStore: SchedulerAssignmentStore;
        assignments: Array<any>|Array<any>;
        crudManager: CrudManager;
        dependencyStore: SchedulerDependencyStore;
        eventStore: EventStore;
        events: Array<any>|Array<any>;
        resourceStore: SchedulerResourceStore;
        resources: Array<any>|Array<any>;        
        onAssignmentFilter(): void;
        applyStartEndParameters(): void;
    }

    export class TimelineDateMapper {        
        displayDateFormat: string;
        snap: boolean;
        timeResolution: object;
        viewportCenterDate: Date;        
        getDateFromCoordinate(coordinate: number, roundingMethod?: string, local?: boolean): Date;
        getDateFromX(x: number, roundingMethod: string, local?: boolean): Date;
        getDateFromXY(xy: Array<any>, roundingMethod?: string, local?: boolean): Date;
        getCoordinateFromDate(date: Date|number, options?: boolean|object): number;
        getDateFromDomEvent(e: Event, roundingMethod?: string, local?: boolean): Date;
        getTimeSpanDistance(startDate: Date, endDate: Date): number;
    }

    export class TimelineDomEvents {
    }

    export class TimelineEventRendering {        
        static eventColors: string;
        static eventStyles: string;
        barMargin: number;
        tickSize: number;
        tickWidth: number;
    }

    export class TimelineScroll {        
        scrollLeft: number;
        scrollTop: number;        
        scrollToDate(date: Date, options?: object): Promise<any>;
        scrollToNow(options?: object): Promise<any>;
        scrollHorizontallyTo(x: number, options?: object|boolean): Promise<any>;
        scrollVerticallyTo(y: number, options?: object|boolean): Promise<any>;
        scrollTo(x: number, options?: object|boolean): Promise<any>;
    }

    export class TimelineViewPresets {        
        viewPreset: ViewPreset|string;
    }

    export class TimelineZoomable {        
        maxZoomLevel: number;
        minZoomLevel: number;
        zoomLevel: number;        
        zoomTo(config: object|string|number): void;
        zoomToLevel(preset: number, options?: object): number;
        zoomToFit(options?: object): void;
        zoomToSpan(config: object): number;
        zoomIn(levels?: number): number;
        zoomOut(levels?: number): number;
        zoomInFull(): number;
        zoomOutFull(): number;
        setTimeSpan(startDate: Date, endDate: Date): void;
        shift(amount: number, unit?: string): void;
        shiftNext(amount?: number): void;
        shiftPrevious(amount?: number): void;
    }

    export class TimeAxisViewModel extends Events {        
        getDistanceBetweenDates(start: Date, end: Date): number;
        getDistanceForDuration(durationMS: number): number;
        getPositionFromDate(date: Date): number;
        getDateFromPosition(position: number, roundingMethod?: string): Date;
    }

    export class RecurrenceConfirmationPopup extends Popup {        
        cancelButton: Button;
        changeMultipleButton: Button;
        changeSingleButton: Button;        
        confirm(config: object): void;
    }

    export class RecurrenceEditor extends Popup {        
        record: RecurrenceModel;        
        updateRecord(): void;
    }

    export class RecurrenceLegendButton extends Button {        
        recurrence: any;
    }

    export class RecurrenceCombo extends RecurrenceFrequencyCombo {
    }

    export class RecurrenceDaysButtonGroup extends ButtonGroup {
    }

    export class RecurrenceDaysCombo extends Combo {
    }

    export class RecurrenceFrequencyCombo extends Combo {
    }

    export class RecurrencePositionsCombo extends Combo {
    }

    export class RecurrenceStopConditionCombo extends Combo {
    }

    export class SchedulerDurationColumn extends NumberColumn {
    }

    export class ProAssignmentStore extends SchedulerAssignmentStore implements PartOfProject {        
        assignmentStore: ProAssignmentStore|SchedulerAssignmentStore;
        calendarManagerStore: ProCalendarManagerStore;
        dependencyStore: ProDependencyStore|SchedulerDependencyStore;
        // @ts-ignore
        eventStore: ProTaskStore|EventStore;
        // @ts-ignore
        resourceStore: ProResourceStore|SchedulerResourceStore;
        taskStore: ProTaskStore;        
        mapAssignmentsForTask(task: ProTaskModel|object, fn: Function, filterFn: Function): Array<any>;
        getAssignmentsForTask(task: ProTaskModel|object): Array<any>;
        removeAssignmentsForTask(task: ProTaskModel|object): void;
        getResourcesForTask(task: ProTaskModel|object): Array<any>;
        getTasksForResource(resource: ProResourceModel|object): Array<any>;
        assignTaskToResource(task: ProTaskModel|object, resource: ProResourceModel|object): ProAssignmentModel;
        unassignTaskFromResource(task: ProTaskModel|object, resource: ProResourceModel|object): ProAssignmentModel;
        isTaskAssignedToResource(task: ProTaskModel|object, resource: ProResourceModel|object, fn?: Function): boolean;
        getAssignmentForTaskAndResource(task: ProTaskModel, resource: ProResourceModel): ProAssignmentModel;
        getEventStore(): ProTaskStore;
        getResourceStore(): ProResourceStore;
        getAssignmentStore(): ProAssignmentStore;
        getDependencyStore(): ProDependencyStore;
        getCalendarManagerStore(): ProCalendarManagerStore;
        getProject(): ProProjectModel;
    }

    export class ProCalendarManagerStore extends AjaxStore implements PartOfProject {        
        assignmentStore: ProAssignmentStore|SchedulerAssignmentStore;
        calendarManagerStore: ProCalendarManagerStore;
        dependencyStore: ProDependencyStore|SchedulerDependencyStore;
        // @ts-ignore
        eventStore: ProTaskStore|EventStore;
        // @ts-ignore
        resourceStore: ProResourceStore|SchedulerResourceStore;
        taskStore: ProTaskStore;        
        getEventStore(): ProTaskStore;
        getResourceStore(): ProResourceStore;
        getAssignmentStore(): ProAssignmentStore;
        getDependencyStore(): ProDependencyStore;
        getCalendarManagerStore(): ProCalendarManagerStore;
        getProject(): ProProjectModel;
    }

    export class ProDependencyStore extends SchedulerDependencyStore implements PartOfProject {        
        assignmentStore: ProAssignmentStore|SchedulerAssignmentStore;
        calendarManagerStore: ProCalendarManagerStore;
        dependencyStore: ProDependencyStore|SchedulerDependencyStore;
        // @ts-ignore
        eventStore: ProTaskStore|EventStore;
        // @ts-ignore
        resourceStore: ProResourceStore|SchedulerResourceStore;
        taskStore: ProTaskStore;        
        getTaskDependencies(task: ProTaskModel, flat: boolean): Array<any>;
        getTaskPredecessors(task: ProTaskModel, flat: boolean): Array<any>;
        getTaskSuccessors(task: ProTaskModel, flat: boolean): Array<any>;
        removeTaskDependencies(task: ProTaskModel, flat: boolean): void;
        removeTaskPredecessors(task: ProTaskModel, flat: boolean): void;
        removeTaskSuccessors(task: ProTaskModel, flat: boolean): void;
        getDependencyForSourceAndTargetTasks(sourceTask: ProTaskModel|string, targetTask: ProTaskModel|string): ProDependencyModel;
        getTasksLinkingDependency(sourceEvent: ProTaskModel, targetEvent: ProTaskModel): ProDependencyModel;
        getSourceTask(dependency: ProDependencyModel|object): ProTaskModel;
        getTargetTask(dependency: ProDependencyModel|object): ProTaskModel;
        getEventStore(): ProTaskStore;
        getResourceStore(): ProResourceStore;
        getAssignmentStore(): ProAssignmentStore;
        getDependencyStore(): ProDependencyStore;
        getCalendarManagerStore(): ProCalendarManagerStore;
        getProject(): ProProjectModel;
    }

    export class ProResourceStore extends SchedulerResourceStore implements PartOfProject {        
        assignmentStore: ProAssignmentStore|SchedulerAssignmentStore;
        calendarManagerStore: ProCalendarManagerStore;
        dependencyStore: ProDependencyStore|SchedulerDependencyStore;
        // @ts-ignore
        eventStore: ProTaskStore|EventStore;
        // @ts-ignore
        resourceStore: ProResourceStore|SchedulerResourceStore;
        taskStore: ProTaskStore;        
        getEventStore(): ProTaskStore;
        getResourceStore(): ProResourceStore;
        getAssignmentStore(): ProAssignmentStore;
        getDependencyStore(): ProDependencyStore;
        getCalendarManagerStore(): ProCalendarManagerStore;
        getProject(): ProProjectModel;
    }

    export class ProTaskStore extends AjaxStore implements EventStoreMixin, StoreTree, PartOfProject {        
        assignmentStore: SchedulerAssignmentStore;
        calendarManagerStore: ProCalendarManagerStore;
        dependencyStore: SchedulerDependencyStore;
        // @ts-ignore
        eventStore: ProTaskStore|EventStore;
        isTree: boolean;
        leaves: Array<any>;
        resourceStore: SchedulerResourceStore;
        taskStore: ProTaskStore;        
        getEventsInTimeSpan(start: Date, end: Date, allowPartial?: boolean, onlyAssigned?: boolean): Array<any>;
        getEventsByStartDate(start: any): Array<any>;
        forEachScheduledEvent(fn: Function, thisObj: object): void;
        getTotalTimeSpan(): object;
        isEventPersistable(event: EventModel): boolean;
        isDateRangeAvailable(start: Date, end: Date, excludeEvent: EventModel, resource: SchedulerResourceModel): boolean;
        getResourcesForEvent(event: EventModel|string|number): Array<any>;
        getEventsForResource(resource: SchedulerResourceModel|string|number): Array<any>;
        getAssignmentsForEvent(event: EventModel|string|number): Array<any>;
        getAssignmentsForResource(resource: SchedulerResourceModel|string|number): Array<any>;
        assignEventToResource(event: EventModel|string|number, resource: SchedulerResourceModel|string|number|Array<any>|Array<any>|Array<any>): void;
        unassignEventFromResource(event: EventModel|string|number, resource: SchedulerResourceModel|string|number): void;
        reassignEventFromResourceToResource(event: EventModel, oldResource: SchedulerResourceModel|Array<any>, newResource: SchedulerResourceModel|Array<any>): void;
        isEventAssignedToResource(event: EventModel|string|number, resource: SchedulerResourceModel|string|number): boolean;
        removeAssignmentsForEvent(event: EventModel|string|number): void;
        removeAssignmentsForResource(resource: SchedulerResourceModel|string|number): void;
        loadChildren(parentRecord: Model): Promise<any>;
        getChildren(parent: Model): void;
        toggleCollapse(idOrRecord: string|number|Model, collapse?: boolean): Promise<any>;
        getEventStore(): ProTaskStore;
        getResourceStore(): ProResourceStore;
        getAssignmentStore(): ProAssignmentStore;
        getDependencyStore(): ProDependencyStore;
        getCalendarManagerStore(): ProCalendarManagerStore;
        getProject(): ProProjectModel;
    }

    export class ProAssignmentAPI {
    }

    export class ProDataAPI {        
        dataApi: object;
    }

    export class ProDependencyAPI {
    }

    export class ProEventAPI {
    }

    export class ProProjectAPI {
    }

    export class ProResourceAPI {
    }

    export class PartOfProject {        
        assignmentStore: ProAssignmentStore|SchedulerAssignmentStore;
        calendarManagerStore: ProCalendarManagerStore;
        dependencyStore: ProDependencyStore|SchedulerDependencyStore;
        // @ts-ignore
        eventStore: ProTaskStore|EventStore;
        // @ts-ignore
        resourceStore: ProResourceStore|SchedulerResourceStore;
        taskStore: ProTaskStore;        
        getEventStore(): ProTaskStore;
        getResourceStore(): ProResourceStore;
        getAssignmentStore(): ProAssignmentStore;
        getDependencyStore(): ProDependencyStore;
        getCalendarManagerStore(): ProCalendarManagerStore;
        getProject(): ProProjectModel;
    }

    export class ProCrudManager implements Events, AbstractCrudManagerMixin, AjaxTransport, JsonEncoder {        
        crudRevision: number;
        crudStores: Array<any>;
        isCrudManagerLoading: boolean;
        listeners: object;
        syncApplySequence: Array<any>;        
        addListener(config: object, thisObj?: object, prio?: number): Function;
        on(config: any, thisObj?: any): void;
        un(config: any, thisObj: any): void;
        removeListener(config: object, thisObj: object): void;
        hasListener(eventName: string): boolean;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        trigger(eventName: string, param: object): boolean;
        suspendEvents(queue?: boolean): void;
        resumeEvents(): void;
        sendRequest(request: object): Promise<any>;
        cancelRequest(requestPromise: Promise<any>): void;
        encode(request: object): string;
        decode(responseText: string): object;
        getStoreDescriptor(storeId: string|Store): object;
        getCrudStore(storeId: string): Store;
        addCrudStore(store: Store|string|object|Array<any>|Array<any>|Array<any>, position?: number, fromStore?: string|Store|object): void;
        removeCrudStore(store: object|string|Store): void;
        addStoreToApplySequence(store: Store|object|Array<any>|Array<any>, position?: number, fromStore?: string|Store|object): void;
        removeStoreFromApplySequence(store: object|string|Store): void;
        crudStoreHasChanges(storeId?: string|Store): boolean;
        load(options: object): Promise<any>;
        sync(): Promise<any>;
        commitCrudStores(): void;
        rejectCrudStores(): void;
        doDestroy(): void;
    }

    export class ProDependencies extends Dependencies {
    }

    export class ProEventDrag extends EventDrag {
    }

    export class ProEventDragCreate extends EventDragCreate {
    }

    export class ProNonWorkingTime extends AbstractTimeRanges {
    }

    export class ProTaskEdit extends InstancePlugin implements ProTaskEditStm {        
        editEvent(taskRecord: ProTaskModel|Function, resourceRecord?: ProResourceModel, element?: HTMLElement): void;
        hasTimeout(name: any): void;
        setTimeout(timeoutSpec: object): number;
        clearTimeout(idOrName: number|string): void;
        clearInterval(id: number): void;
        setInterval(fn: any, delay: any): number;
        requestAnimationFrame(fn: Function, extraArgs?: Array<any>, thisObj?: object): number;
        createOnFrame(fn: Function|string, args?: Array<any>, thisObj?: object, cancelOutstanding?: boolean): void;
        cancelAnimationFrame(handle: number): void;
        buffer(fn: Function|string, delay: number, thisObj?: object): Function;
        throttle(fn: Function, buffer: number): void;
    }

    export class ProTaskEditStm {
    }

    export class ProAssignmentModel extends SchedulerAssignmentModel implements PartOfProject {        
        // @ts-ignore
        event: ProTaskModel;
        eventId: string|number;
        // @ts-ignore
        resource: ProResourceModel;
        resourceId: string|number;
        units: number;        
        assignmentStore: ProAssignmentStore|SchedulerAssignmentStore;
        calendarManagerStore: ProCalendarManagerStore;
        dependencyStore: ProDependencyStore|SchedulerDependencyStore;
        // @ts-ignore
        eventStore: ProTaskStore|EventStore;
        // @ts-ignore
        resourceStore: ProResourceStore|SchedulerResourceStore;
        task: ProTaskModel;
        taskName: string;
        taskStore: ProTaskStore;        
        setUnits(units: number): Promise<any>;
        setEvent(event: ProTaskModel): Promise<any>;
        setResource(event: ProResourceModel): Promise<any>;
        getEventStore(): ProTaskStore;
        getResourceStore(): ProResourceStore;
        getAssignmentStore(): ProAssignmentStore;
        getDependencyStore(): ProDependencyStore;
        getCalendarManagerStore(): ProCalendarManagerStore;
        getProject(): ProProjectModel;
    }

    export class ProCalendarIntervalModel {        
        endDate: Date;
        isWorking: boolean;
        recurrentEndDate: string;
        recurrentStartDate: string;
        startDate: Date;        
        isRecurrent(): boolean;
        isStatic(): boolean;
        getStartDateSchedule(): object;
        getEndDateSchedule(): object;
    }

    export class ProCalendarModel extends Model implements PartOfProject {        
        daysPerMonth: number;
        daysPerWeek: number;
        hoursPerDay: number;
        name: string;
        unspecifiedTimeIsWorking: boolean;        
        assignmentStore: ProAssignmentStore|SchedulerAssignmentStore;
        calendarManagerStore: ProCalendarManagerStore;
        dependencyStore: ProDependencyStore|SchedulerDependencyStore;
        // @ts-ignore
        eventStore: ProTaskStore|EventStore;
        // @ts-ignore
        resourceStore: ProResourceStore|SchedulerResourceStore;
        taskStore: ProTaskStore;        
        addInterval(interval: ProCalendarIntervalModel): void;
        addIntervals(intervals: Array<any>): void;
        getEventStore(): ProTaskStore;
        getResourceStore(): ProResourceStore;
        getAssignmentStore(): ProAssignmentStore;
        getDependencyStore(): ProDependencyStore;
        getCalendarManagerStore(): ProCalendarManagerStore;
        getProject(): ProProjectModel;
    }

    export class ProDependencyModel extends DependencyBaseModel {        
        fromEvent: ProTaskModel;
        lag: number;
        lagUnit: string;
        toEvent: ProTaskModel;        
        sourceTask: ProTaskModel;
        targetTask: ProTaskModel;        
        setLag(amount: number, unit?: string): Promise<any>;
        setFromEvent(event: ProTaskModel): Promise<any>;
        setToEvent(event: ProTaskModel): Promise<any>;
    }

    export class ProProjectModel extends ProTaskModel implements ProCrudManager {        
        endDate: string|Date;
        startDate: string|Date;        
        assignmentStore: ProAssignmentStore;
        calendarManagerStore: ProCalendarManagerStore;
        crudRevision: number;
        crudStores: Array<any>;
        dependencyStore: ProDependencyStore;
        eventStore: ProTaskStore;
        isCrudManagerLoading: boolean;
        listeners: object;
        resourceStore: ProResourceStore;
        stm: StateTrackingManager;
        syncApplySequence: Array<any>;
        taskStore: ProTaskStore;        
        getCalendar(): ProCalendarModel;
        setCalendar(calendar: ProCalendarModel): Promise<any>;
        propagate(): Promise<any>;
        suspendPropagate(): void;
        resumePropagate(trigger?: boolean): Promise<any>;
        addListener(config: object, thisObj?: object, prio?: number): Function;
        on(config: any, thisObj?: any): void;
        un(config: any, thisObj: any): void;
        removeListener(config: object, thisObj: object): void;
        hasListener(eventName: string): boolean;
        relayAll(through: Events, prefix: string, transformCase?: boolean): void;
        removeAllListeners(): void;
        trigger(eventName: string, param: object): boolean;
        suspendEvents(queue?: boolean): void;
        resumeEvents(): void;
        sendRequest(request: object): Promise<any>;
        cancelRequest(requestPromise: Promise<any>): void;
        encode(request: object): string;
        decode(responseText: string): object;
        getStoreDescriptor(storeId: string|Store): object;
        getCrudStore(storeId: string): Store;
        addCrudStore(store: Store|string|object|Array<any>|Array<any>|Array<any>, position?: number, fromStore?: string|Store|object): void;
        removeCrudStore(store: object|string|Store): void;
        addStoreToApplySequence(store: Store|object|Array<any>|Array<any>, position?: number, fromStore?: string|Store|object): void;
        removeStoreFromApplySequence(store: object|string|Store): void;
        crudStoreHasChanges(storeId?: string|Store): boolean;
        load(options: object): Promise<any>;
        sync(): Promise<any>;
        commitCrudStores(): void;
        rejectCrudStores(): void;
        doDestroy(): void;
    }

    export class ProSubProjectModel extends ProTaskModel {        
        allowDependencies: any;
        description: any;        
        isSubProject: boolean;
    }

    export class ProTaskModel extends TimeSpan implements PartOfProject {        
        calendar: ProCalendarModel;
        cls: DomClassList|string;
        draggable: boolean;
        durationUnit: string;
        endDate: string|Date;
        iconCls: string;
        id: string|number;
        manuallyScheduled: boolean;
        name: string;
        note: string;
        percentDone: number;
        resizable: boolean|string;
        showInTimeline: boolean;
        startDate: string|Date;        
        static convertEmptyParentToLeaf: boolean|object;
        allDependencies: Array<any>;
        assignmentStore: ProAssignmentStore|SchedulerAssignmentStore;
        assignments: Array<any>;
        calendarManagerStore: ProCalendarManagerStore;
        dependencyStore: ProDependencyStore|SchedulerDependencyStore;
        // @ts-ignore
        eventStore: ProTaskStore|EventStore;
        fullEffort: object;
        incomingDeps: Set<any>;
        outgoingDeps: Set<any>;
        predecessorTasks: Array<any>;
        previousSiblingsTotalCount: number;
        // @ts-ignore
        resourceStore: ProResourceStore|SchedulerResourceStore;
        sequenceNumber: number;
        successorTasks: Array<any>;
        taskStore: ProTaskStore;        
        convertToMilestone(): void;
        convertToRegular(): void;
        getAssignmentFor(resource: ProResourceModel): ProAssignmentModel|null;
        assign(resource: ProResourceModel, units?: number): Promise<any>;
        unassign(resource: ProResourceModel): Promise<any>;
        setCalendar(calendar: ProCalendarModel): Promise<any>;
        getCalendar(): ProCalendarModel;
        setStartDate(date: Date, keepDuration?: boolean): Promise<any>;
        setEndDate(date: Date, keepDuration?: boolean): Promise<any>;
        setDuration(duration: number, unit?: string): Promise<any>;
        getEventStore(): ProTaskStore;
        getResourceStore(): ProResourceStore;
        getAssignmentStore(): ProAssignmentStore;
        getDependencyStore(): ProDependencyStore;
        getCalendarManagerStore(): ProCalendarManagerStore;
        getProject(): ProProjectModel;
    }

    export class ProTaskSegmentModel extends ProTaskModel {
    }

    export class ProResourceModel extends SchedulerResourceModel implements PartOfProject {        
        calendar: ProCalendarModel;        
        assignmentStore: ProAssignmentStore|SchedulerAssignmentStore;
        assignments: Array<any>;
        calendarManagerStore: ProCalendarManagerStore;
        dependencyStore: ProDependencyStore|SchedulerDependencyStore;
        // @ts-ignore
        eventStore: ProTaskStore|EventStore;
        // @ts-ignore
        resourceStore: ProResourceStore|SchedulerResourceStore;
        taskStore: ProTaskStore;
        tasks: Array<any>;        
        setCalendar(calendar: ProCalendarModel): Promise<any>;
        getCalendar(): ProCalendarModel;
        getEventStore(): ProTaskStore;
        getResourceStore(): ProResourceStore;
        getAssignmentStore(): ProAssignmentStore;
        getDependencyStore(): ProDependencyStore;
        getCalendarManagerStore(): ProCalendarManagerStore;
        getProject(): ProProjectModel;
    }

    export class ProScheduler extends Scheduler implements ProSchedulerStores {
    }

    export class ProSchedulerStores {
    }

    export class CalendarField {
    }

    export class ConstraintTypePicker extends Combo {
    }

    export class DependencyTypePicker extends Combo {
    }

    export class EffortField extends DurationField {
    }

    export class GanttTaskEditor extends TaskEditorBase {
    }

    export class ModelCombo {
    }

    export class SchedulerTaskEditor extends TaskEditorBase {
    }

    export class SchedulingModePicker extends Combo {
    }

    export class TaskEditorBase extends Popup {        
        durationDecimalPrecision: any;        
        loadEvent(record: ProTaskModel): void;
    }

    export class EventLoader {
    }

    export class TaskEditorTab {
    }

    export enum EffectResolutionResult {
        Cancel,
        Restart,
        Resume
    }

}