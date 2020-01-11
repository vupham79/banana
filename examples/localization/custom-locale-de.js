// prepare "namespace"
window.bryntum         = window.bryntum || {};
window.bryntum.locales = window.bryntum.locales || {};

// put the locale under window.bryntum.locales to make sure it is discovered automatically
window.bryntum.locales.De = {

    localeName : 'De',
    localeDesc : 'Deutsch',

    // Translations for common words and phrases which are used by all classes.
    Object : {
        Yes    : 'Ja',
        No     : 'Nein',
        Cancel : 'Stornieren'
    },

    //region Columns

    AddNewColumn : {
        'New Column' : 'Neue Spalte hinzufügen...'
    },

    EarlyStartDateColumn : {
        'Early Start' : 'Frühes Startdatum'
    },

    EarlyEndDateColumn : {
        'Early End' : 'Frühes Ende'
    },

    LateStartDateColumn : {
        'Late Start' : 'Später Start'
    },

    LateEndDateColumn : {
        'Late End' : 'Spätes Ende'
    },

    TotalSlackColumn : {
        'Total Slack' : 'Gesamte Pufferzeit'
    },

    CalendarColumn : {
        Calendar : 'Kalender'
    },

    ConstraintDateColumn : {
        'Constraint Date' : 'Einschränkung Datum'
    },

    ConstraintTypeColumn : {
        'Constraint Type' : 'Einschränkung'
    },

    DependencyColumn : {
        'Invalid dependency found, change is reverted' : 'Ungültige Abhängigkeit gefunden, Änderung rückgängig gemacht'
    },

    DurationColumn : {
        Duration : 'Dauer'
    },

    EffortColumn : {
        Effort : 'Aufwand'
    },

    EndDateColumn : {
        Finish : 'Fertig stellen'
    },

    EventModeColumn : {
        'Event mode' : 'Ereignismodus',
        'Manual'     : 'Manuell',
        'Auto'       : 'Auto'
    },

    ManuallyScheduledColumn : {
        'Manually scheduled' : 'Manuell geplant'
    },

    MilestoneColumn : {
        'Milestone' : 'Meilenstein'
    },

    NameColumn : {
        Name : 'Vorgangsname'
    },

    NoteColumn : {
        Note : 'Notiz'
    },

    PercentDoneColumn : {
        '% Done' : '% erledigt'
    },

    PredecessorColumn : {
        Predecessors : 'Vorgänger'
    },

    ResourceAssignmentColumn : {
        'Assigned Resources' : 'Zugwiesene Resourcen'
    },

    ResourceInfoColumn : {
        eventCountText : function(data) {
            return data + ' Veranstaltung' + (data !== 1 ? 'en' : '');
        }
    },

    SchedulingModeColumn : {
        'Scheduling Mode' : 'Modus'
    },

    ShowInTimelineColumn : {
        'Show in timeline' : 'Zur Zeitachse hinzufügen'
    },

    SequenceColumn : {
        Sequence : '#'
    },

    StartDateColumn : {
        Start : 'Anfang'
    },

    SuccessorColumn : {
        Successors : 'Nachfolger'
    },

    WBSColumn : {
        WBS : 'WBS'
    },

    //endregion

    //region Gantt

    ProjectLines : {
        'Project Start' : 'Projektstart',
        'Project End'   : 'Projektabende'
    },

    TaskTooltip : {
        Start    : 'Beginnt',
        End      : 'Endet',
        Duration : 'Dauer',
        Complete : 'Erledigt'
    },

    AssignmentGrid : {
        Name     : 'Ressourcenname',
        Units    : 'Einheiten',
        '%'      : '%',
        unitsTpl : function(value) {
            return value.value ? value.value + '%' : '';
        }
    },

    AssignmentPicker : {
        'Save'   : 'Sparen',
        'Cancel' : 'Stornieren'
    },

    AssignmentEditGrid : {
        Name  : 'Resourcenname',
        Units : 'Einheiten'
    },

    ConstraintTypePicker : {
        'Finish no earlier than' : 'Ende nicht früher als',
        'Finish no later than'   : 'Ende nicht später als',
        'Must start on'          : 'Muss anfangen am',
        'Must finish on'         : 'Muss enden am',
        'Start no earlier than'  : 'Anfang nicht früher als',
        'Start no later than'    : 'Anfang nicht später als'
    },

    Gantt : {
        'Add'          : 'Hinzufügen...',
        'New Task'     : 'Neue Aufgabe',
        'Task above'   : 'Aufgabe vor',
        'Task below'   : 'Aufgabe unter',
        'Delete task'  : 'Lösche Aufgabe(n)',
        Milestone      : 'Meilenstein',
        'Sub-task'     : 'Unteraufgabe',
        Successor      : 'Nachfolger',
        Predecessor    : 'Vorgänger',
        changeRejected : 'Scheduling Engine hat die Änderungen abgelehnt'
    },

    GanttCommon : {},

    SchedulerProCommon : {
        SS              : 'AA',
        SF              : 'EA',
        FS              : 'AE',
        FF              : 'EE',
        StartToStart    : 'Anfang-Anfang',
        StartToEnd      : 'Anfang-Ende',
        EndToStart      : 'Enge-Anfang',
        EndToEnd        : 'Enge-Ende',
        dependencyTypes : [
            'AA',
            'EA',
            'AE',
            'EE'
        ],
        dependencyTypesLong : [
            'Anfang-Anfang',
            'Anfang-Ende',
            'Enge-Anfang',
            'Enge-Ende'
        ]
    },

    ProTaskEdit : {
        'Edit event' : 'Buchung redigieren'
    },

    TaskEditorBase : {
        'editorWidth' : '50em',
        'Information' : 'Informationen',
        'Save'        : 'Sparen',
        'Cancel'      : 'Stornieren',
        'Delete'      : 'Löschen'
    },

    SchedulerGeneralTab : {
        labelWidth           : '15em',
        'General'            : 'Generell',
        'Name'               : 'Name',
        '% complete'         : 'Abgeschlossen in Prozent',
        'Duration'           : 'Dauer',
        'Start'              : 'Start',
        'Finish'             : 'Ende',
        'Effort'             : 'Anstrengung',
        'Dates'              : 'Datumsangaben',
        'Manually scheduled' : 'Manuell geplant',
        'Calendar'           : 'Kalender'
    },

    GeneralTab : {
        labelWidth   : '15em',
        'General'    : 'Generell',
        'Name'       : 'Name',
        '% complete' : 'Abgeschlossen in Prozent',
        'Duration'   : 'Dauer',
        'Start'      : 'Start',
        'Finish'     : 'Ende',
        'Effort'     : 'Anstrengung',
        'Dates'      : 'Datumsangaben'
    },

    AdvancedTab : {
        labelWidth           : '15em',
        'Advanced'           : 'Fortgeschritten',
        'Calendar'           : 'Kalender',
        'Scheduling mode'    : 'Planungsmodus',
        'Effort driven'      : 'Mühe getrieben',
        'Manually scheduled' : 'Manuell geplant',
        'Constraint type'    : 'Einschränkungstyp',
        'Constraint date'    : 'Datum der Einschränkung',
        'Constraint'         : 'Einschränkung'
    },

    DependencyTab : {
        'Predecessors'                        : 'Vorgänger',
        'Successors'                          : 'Nachfolger',
        'ID'                                  : 'ID',
        'Name'                                : 'Name',
        'Type'                                : 'Typ',
        'Lag'                                 : 'Verzögern',
        'Cyclic dependency has been detected' : 'Die zyklische Abhängigkeit wurde erkannt'
    },

    ResourcesTab : {
        'Resources' : 'Resourcen',
        'Resource'  : 'Resource',
        'Units'     : 'Einheiten',
        unitsTpl    : function(value) {
            return value.value ? value.value + '%' : '';
        }
    },

    NotesTab : {
        'Notes' : 'Notizen'
    },

    SchedulingModePicker : {
        'Normal'         : 'Normal',
        'Fixed Duration' : 'Feste Dauer',
        'Fixed Units'    : 'Feste Einheiten',
        'Fixed Effort'   : 'Feste Arbeit'
    },

    //endregion

    //region Columns

    TemplateColumn : {
        noTemplate : 'TemplateColumn braucht eine template',
        noFunction : 'TemplateColumn.template muss eine funktion sein'
    },

    ColumnStore : {
        columnTypeNotFound : function(data) {
            return 'Spalte typ ' + data.type + 'nicht registriert';
        }
    },

    //endregion

    //region Mixins

    InstancePlugin : {
        fnMissing : function(data) {
            return 'Trying to chain fn ' + data.plugIntoName + '#' + data.fnName + ', but plugin fn ' + data.pluginName + '#' + data.fnName + ' does not exist';
        },
        overrideFnMissing : function(data) {
            return 'Trying to override fn ' + data.plugIntoName + '#' + data.fnName + ', but plugin fn ' + data.pluginName + '#' + data.fnName + ' does not exist';
        }
    },

    //endregion

    //region Features

    ColumnPicker : {
        columnsMenu     : 'Spalten',
        hideColumn      : 'Versteck spalte',
        hideColumnShort : 'Versteck'
    },

    Filter : {
        applyFilter  : 'Filter anwenden',
        filter       : 'Filter',
        editFilter   : 'Filter redigieren',
        on           : 'Auf',
        before       : 'Vor',
        after        : 'Nach',
        equals       : 'Gleichen',
        lessThan     : 'Weniger als',
        moreThan     : 'Mehr als',
        removeFilter : 'Filter entfernen'
    },

    FilterBar : {
        enableFilterBar  : 'Filterleiste anzeigen',
        disableFilterBar : 'Filterleiste ausblenden'
    },

    Group : {
        groupAscending       : 'Aufsteigend gruppieren',
        groupDescending      : 'Absteigend gruppieren',
        groupAscendingShort  : 'Aufsteigend',
        groupDescendingShort : 'Absteigend',
        stopGrouping         : 'Stoppen gruppierung',
        stopGroupingShort    : 'Stoppen'
    },

    Search : {
        searchForValue : 'Suche nach Wert'
    },

    Sort : {
        'sortAscending'          : 'Aufsteigend sortierung',
        'sortDescending'         : 'Absteigend sortierung',
        'multiSort'              : 'Multi sortieren',
        'removeSorter'           : 'Sortierung entfernen',
        'addSortAscending'       : 'Aufsteigend sortieren hinzufügen',
        'addSortDescending'      : 'Absteigend sortieren hinzufügen',
        'toggleSortAscending'    : 'Ändern Sie auf aufsteigend',
        'toggleSortDescending'   : 'Zu absteigend wechseln',
        'sortAscendingShort'     : 'Aufsteigend',
        'sortDescendingShort'    : 'Absteigend',
        'removeSorterShort'      : 'Entfernen',
        'addSortAscendingShort'  : '+ Aufsteigend',
        'addSortDescendingShort' : '+ Absteigend'
    },

    Tree : {
        noTreeColumn : 'To use the tree feature one column must be configured with tree: true'
    },

    //endregion

    //region Grid

    Grid : {
        featureNotFound : function(data) {
            return 'Feature "' + data + '" not available, make sure you have imported it';
        },
        invalidFeatureNameFormat : function(data) {
            return 'Invalid feature name "' + data + '", must start with a lowercase letter';
        },
        removeRow         : 'Zeile löschen',
        removeRows        : 'Zeilen löschen',
        loadFailedMessage : 'Wird geladen, bitte versuche es erneut',
        moveColumnLeft    : 'Bewegen Sie sich zum linken Bereich',
        moveColumnRight   : 'Bewegen Sie sich nach rechts'
    },

    GridBase : {
        loadMask : 'Laden...',
        noRows   : 'Keine Zeilen zum Anzeigen'
    },
    
    //region Export
    
    PdfExport : {
        'Waiting for response from server...' : 'Warten auf Antwort vom Server...'
    },
    
    ExportDialog : {
        width          : '40em',
        labelWidth     : '12em',
        exportSettings : 'Exporteinstellungen',
        export         : 'Export',
        exporterType   : 'Kontrolliere die Paginierung',
        cancel         : 'Stornieren',
        fileFormat     : 'Datei Format',
        rows           : 'Reihen',
        alignRows      : 'Zeilen ausrichten',
        columns        : 'Säulen',
        paperFormat    : 'Papierformat',
        orientation    : 'Orientierung'
    },
    
    ExportRowsCombo : {
        all     : 'Alle Zeilen',
        visible : 'Sichtbare Zeilen'
    },
    
    ExportOrientationCombo : {
        portrait  : 'Porträt',
        landscape : 'Landschaft'
    },
    
    SinglePageExporter : {
        singlepage : 'Einzelne Seite'
    },
    
    MultiPageExporter : {
        multipage     : 'Mehrere Seiten',
        exportingPage : function(data) {
            return 'Seite exportieren ' + data.currentPage + '/' + data.totalPages;
        }
    },
    
    //endregion

    //endregion

    //region Widgets

    DateField : {
        invalidDate : 'Ungültige Datumseingabe'
    },

    Field : {
        invalidValue          : 'Ungültiger Feldwert',
        minimumValueViolation : 'Mindestwertverletzung',
        maximumValueViolation : 'Maximalwertverletzung',
        fieldRequired         : 'Dieses Feld wird benötigt',
        validateFilter        : 'Der Wert muss aus der Liste ausgewählt werden'
    },

    List : {
        loading : 'Beladung...'
    },

    PagingToolbar : {
        firstPage : 'Gehe zur ersten Seite',
        prevPage  : 'Zurück zur letzten Seite',
        page      : 'Seite',
        nextPage  : 'Gehe zur nächsten Seite',
        lastPage  : 'Gehe zur letzten Seite',
        reload    : 'Aktuelle Seite neu laden',
        noRecords : 'Keine Zeilen zum Anzeigen',
        pageCountTemplate(store) {
            return `von ${store.lastPage}`;
        },
        summaryTemplate(store) {
            const start = (store.currentPage - 1) * store.pageSize + 1;

            return `Ergebnisse ${start} - ${start + store.pageSize - 1} von ${store.allCount}`;
        }
    },

    TimeField : {
        invalidTime : 'Ungültige Zeitangabe'
    },

    //endregion

    //region Dates

    DateHelper : {
        locale       : 'de',
        shortWeek    : 'W',
        shortQuarter : 'q',
        week         : 'Woche',
        weekStartDay : 1,
        unitNames    : [
            { single : 'Millisekunde', plural : 'Millisekunden', abbrev : 'ms' },
            { single : 'Sekunde', plural : 'Sekunden', abbrev : 's' },
            { single : 'Minute', plural : 'Minuten', abbrev : 'min' },
            { single : 'Stunde', plural : 'Stunden', abbrev : 'std' },
            { single : 'Tag', plural : 'Tage', abbrev : 't' },
            { single : 'Woche', plural : 'Wochen', abbrev : 'W' },
            { single : 'Monat', plural : 'Monathe', abbrev : 'mon' },
            { single : 'Quartal', plural : 'Quartal', abbrev : 'Q' },
            { single : 'Jahr', plural : 'Jahre', abbrev : 'jahr' }
        ],
        // Used to build a RegExp for parsing time units.
        // The full names from above are added into the generated Regexp.
        // So you may type "2 w" or "2 wk" or "2 week" or "2 weeks" into a DurationField.
        // When generating its display value though, it uses the full localized names above.
        unitAbbreviations : [
            ['mil'],
            ['s', 'sec'],
            ['m', 'min'],
            ['h', 'hr'],
            ['d'],
            ['w', 'wk'],
            ['mo', 'mon', 'mnt'],
            ['q', 'quar', 'qrt'],
            ['y', 'yr']
        ],
        parsers : {
            'L'  : 'DD.MM.YYYY',
            'LT' : 'HH:mm'
        },
        ordinalSuffix : function(number) {
            return number;
        }
    },

    //endregion

    //region Scheduler

    SchedulerCommon : {
        // SS              : 'AA',
        // SF              : 'EA',
        // FS              : 'AE',
        // FF              : 'EE',
        // StartToStart    : 'Anfang-Anfang',
        // StartToEnd      : 'Anfang-Ende',
        // EndToStart      : 'Enge-Anfang',
        // EndToEnd        : 'Enge-Ende',
        // dependencyTypes : [
        //     'AA',
        //     'EA',
        //     'AE',
        //     'EE'
        // ],
        // dependencyTypesLong : [
        //     'Anfang-Anfang',
        //     'Anfang-Ende',
        //     'Enge-Anfang',
        //     'Enge-Ende'
        // ]
    },

    ExcelExporter : {
        'No resource assigned' : 'Keine Ressource zugewiesen'
    },

    Dependencies : {
        from     : 'Von',
        to       : 'Zo',
        valid    : 'Gültig',
        invalid  : 'Ungültig',
        Checking : 'Überprüfung…'
    },

    DependencyEdit : {
        From              : 'Von',
        To                : 'Zu',
        Type              : 'Typ',
        Lag               : 'Verzögern',
        'Edit dependency' : 'Abhängigkeit bearbeiten',

        Save         : 'Speichern',
        Delete       : 'Löschen',
        Cancel       : 'Abbrechen',
        StartToStart : 'Anfang-Anfang',
        StartToEnd   : 'Anfang-Ende',
        EndToStart   : 'Ende-Anfang',
        EndToEnd     : 'Ende-Ende'
    },

    EventEdit : {
        Name         : 'Name',
        Resource     : 'Ressource',
        Start        : 'Start',
        End          : 'Ende',
        Save         : 'Speichern',
        Delete       : 'Löschen',
        Cancel       : 'Abbrechen',
        'Edit Event' : 'Buchung redigieren',
        Repeat       : 'Wiederholen'
    },

    Scheduler : {
        'Add event'      : 'Ereignis hinzufügen',
        'Delete event'   : 'Buchung löschen',
        'Unassign event' : 'Ereignis nicht zuordnen'
    },

    HeaderContextMenu : {
        pickZoomLevel   : 'Zoomen',
        activeDateRange : 'Datumsbereich',
        startText       : 'Anfangsdatum',
        endText         : 'Endtermin',
        todayText       : 'Heute'
    },

    EventFilter : {
        filterEvents : 'Aufgaben filtern',
        byName       : 'Namentlich'
    },

    TimeRanges : {
        showCurrentTimeLine : 'Aktuelle Zeitleiste anzeigen'
    },

    PresetManager : {
        minuteAndHour : {
            topDateFormat : 'ddd DD.MM, HH:mm'
        },
        hourAndDay : {
            topDateFormat : 'ddd DD.MM'
        },
        weekAndDay : {
            displayDateFormat : 'HH:mm'
        }
    },

    RecurrenceConfirmationPopup : {
        'delete-title'              : 'Du löschst ein Ereignis',
        'delete-all-message'        : 'Möchten Sie alle Vorkommen dieses Ereignisses löschen?',
        'delete-further-message'    : 'Möchten Sie dieses und alle zukünftigen Vorkommen dieses Ereignisses oder nur das ausgewählte Vorkommen löschen?',
        'delete-further-btn-text'   : 'Alle zukünftigen Ereignisse löschen',
        'delete-only-this-btn-text' : 'Nur dieses Ereignis löschen',

        'update-title'              : 'Sie ändern ein sich wiederholendes Ereignis',
        'update-all-message'        : 'Möchten Sie alle Vorkommen dieses Ereignisses ändern?',
        'update-further-message'    : 'Möchten Sie nur dieses Vorkommen des Ereignisses oder dieses und aller zukünftigen Ereignisse ändern?',
        'update-further-btn-text'   : 'Alle zukünftigen Ereignisse',
        'update-only-this-btn-text' : 'Nur dieses Ereignis',

        'Yes'    : 'Ja',
        'Cancel' : 'Abbrechen',

        width : 600
    },

    RecurrenceLegend : {
        // list delimiters
        ' and '         : ' und ',
        // frequency patterns
        'Daily'         : 'Täglich',
        'Weekly on {1}' : function(data) {
            return 'Wöchentlich am ' + data.days;
        },
        'Monthly on {1}' : function(data) {
            return 'Monatlich am ' + data.days;
        },
        'Yearly on {1} of {2}' : function(data) {
            return 'Jährlich am ' + data.days + ' von ' + data.months;
        },
        'Every {0} days' : function(data) {
            return 'Alle ' + data.interval + ' Tage';
        },
        'Every {0} weeks on {1}' : function(data) {
            return 'Alle ' + data.interval + ' Wochen am ' + data.days;
        },
        'Every {0} months on {1}' : function(data) {
            return 'Alle ' + data.interval + ' Monate auf ' + data.days;
        },
        'Every {0} years on {1} of {2}' : function(data) {
            return 'Alle ' + data.interval + ' Jahre auf ' + data.days + ' von ' + data.months;
        },
        // day position translations
        'position1'   : 'ersten',
        'position2'   : 'zweiten',
        'position3'   : 'dritten',
        'position4'   : 'vierten',
        'position5'   : 'fünften',
        'position-1'  : 'letzten',
        // day options
        'day'         : 'Tag',
        'weekday'     : 'Wochentag',
        'weekend day' : 'Wochenend-Tag',
        // {0} - day position info ("the last"/"the first"/...)
        // {1} - day info ("Sunday"/"Monday"/.../"day"/"weekday"/"weekend day")
        // For example:
        //  "the last Sunday"
        //  "the first weekday"
        //  "the second weekend day"
        'daysFormat'  : function(data) {
            return data.position + ' ' + data.days;
        }
    },

    RecurrenceEditor : {
        'Repeat event'        : 'Ereignis wiederholen',
        'Cancel'              : 'Abbrechen',
        'Save'                : 'Speichern',
        'Frequency'           : 'Häufigkeit',
        'Every'               : 'Jede(n/r)',
        'DAILYintervalUnit'   : 'Tag',
        'WEEKLYintervalUnit'  : 'Woche am:',
        'MONTHLYintervalUnit' : 'Monat',
        'YEARLYintervalUnit'  : 'Jahr in:',
        'Each'                : 'Jeder',
        'On the'              : 'Am',
        'End repeat'          : 'Ende',
        'time(s)'             : 'Zeit'
    },

    RecurrenceDaysCombo : {
        'day'         : 'Tag',
        'weekday'     : 'Wochentag',
        'weekend day' : 'Wochenend-Tag'
    },

    RecurrencePositionsCombo : {
        'position1'  : 'ersten',
        'position2'  : 'zweiten',
        'position3'  : 'dritten',
        'position4'  : 'vierten',
        'position5'  : 'fünften',
        'position-1' : 'letzten'
    },

    RecurrenceStopConditionCombo : {
        'Never'   : 'Niemals',
        'After'   : 'Nach',
        'On date' : 'Am Tag'
    },

    RecurrenceFrequencyCombo : {
        'Daily'   : 'täglich',
        'Weekly'  : 'wöchentlich',
        'Monthly' : 'monatlich',
        'Yearly'  : 'jährlich'
    },

    RecurrenceCombo : {
        'None'      : 'Nie',
        'Custom...' : 'Benutzerdefiniert ...'
    },
    
    //region Export
    
    ScheduleRangeCombo : {
        completeview : 'Vollständiger Zeitplan',
        currentview  : 'Sichtbarer Zeitplan',
        daterange    : 'Datumsbereich',
        completedata : 'Vollständiger Zeitplan (für alle Veranstaltungen)'
    },
    
    SchedulerExportDialog : {
        'Schedule range' : 'Zeitplanbereich ',
        'Export from'    : 'Von',
        'Export to'      : 'Zu'
    },
    
    //endregion

    //endregion

    //region Examples

    Column : {
        'Name'            : 'Name',
        'Age'             : 'Alter',
        'City'            : 'Stadt',
        'Food'            : 'Essen',
        'Color'           : 'Farbe',
        'First name'      : 'Vorname',
        'Surname'         : 'Nachname',
        'Team'            : 'Team',
        'Score'           : 'Ergebnis',
        'Rank'            : 'Rang',
        'Percent'         : 'Prozent',
        'Birthplace'      : 'Geburstort',
        'Start'           : 'Anfang',
        'Finish'          : 'Ende',
        'Template'        : 'Vorlage (template)',
        'Date'            : 'Datum',
        'Check'           : 'Check',
        'Contact'         : 'Kontakt',
        'Favorites'       : 'Favoriten',
        'Customer#'       : 'Kunde#',
        'When'            : 'Wann',
        'Brand'           : 'Marke',
        'Model'           : 'Modell',
        'Personal best'   : 'Persönlicher rekord',
        'Current rank'    : 'Aktueller rang',
        'Hometown'        : 'Heimatstadt',
        'Satisfaction'    : 'Zufriedenheit',
        'Favorite color'  : 'Lieblingsfarbe',
        'Rating'          : 'Wertung',
        'Cooks'           : 'Zuberaiten',
        'Birthday'        : 'Geburstag',
        'Staff'           : 'Personal',
        'Machines'        : 'Maschinen',
        'Type'            : 'Typ',
        'Task color'      : 'Aufgabe farbe',
        'Employment type' : 'Beschäftigungsverhältnis',
        'Capacity'        : 'Kapazität',
        'Production line' : 'Fließband',
        'Company'         : 'Firma',
        'End'             : 'Ende'
    },

    Shared : {
        'Locale changed' : 'Sprache geändert'
    }

    //endregion

};
