/*

Bryntum Gantt (TRIAL VERSION) 2.0.0
Copyright(c) 2019 Bryntum AB
https://bryntum.com/contact
https://bryntum.com/license

*/
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("SvSE",[],t):"object"==typeof exports?exports.SvSE=t():(e.bryntum=e.bryntum||{},e.bryntum.locales=e.bryntum.locales||{},e.bryntum.locales.SvSE=t())}(window,(function(){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([,function(e,t,n){"use strict";n.r(t);var a={localeName:"SvSE",localeDesc:"Svenska",Object:{Yes:"Ja",No:"Nej",Cancel:"Avbryt"},InstancePlugin:{fnMissing:function(e){return"Försöker att länka fn ".concat(e.plugIntoName,"#").concat(e.fnName,", men plugin fn ").concat(e.pluginName,"#").concat(e.fnName," finns inte")},overrideFnMissing:function(e){return"Försöker att skriva över fn ".concat(e.plugIntoName,"#").concat(e.fnName,", men plugin fn ").concat(e.pluginName,"#").concat(e.fnName," finns inte")}},Field:{invalidValue:"Ogiltigt värde",minimumValueViolation:"För lågt värde",maximumValueViolation:"För högt värde",fieldRequired:"Detta fält är obligatoriskt",validateFilter:"Värdet måste väljas från listan"},DateField:{invalidDate:"Ogiltigt datum"},TimeField:{invalidTime:"Ogiltig tid"},DateHelper:{locale:"sv-SE",shortWeek:"V",shortQuarter:"q",week:"Vecka",weekStartDay:1,unitNames:[{single:"millisekund",plural:"millisekunder",abbrev:"ms"},{single:"sekund",plural:"sekunder",abbrev:"s"},{single:"minut",plural:"minuter",abbrev:"min"},{single:"timme",plural:"timmar",abbrev:"tim"},{single:"dag",plural:"dagar",abbrev:"d"},{single:"vecka",plural:"vecka",abbrev:"v"},{single:"månad",plural:"månader",abbrev:"mån"},{single:"kvartal",plural:"kvartal",abbrev:"kv"},{single:"år",plural:"år",abbrev:"år"}],unitAbbreviations:[["ms","mil"],["s","sek"],["m","min"],["t","tim","h"],["d"],["v","ve"],["må","mån"],["kv","kva"],[]],ordinalSuffix:function(e){var t=e[e.length-1];return e+("11"===e||"12"===e||"1"!==t&&"2"!==t?"e":"a")},parsers:{L:"YYYY-MM-DD",LT:"HH:mm"}},PagingToolbar:{firstPage:"Gå till första sidan",prevPage:"Gå till föregående sida",page:"Sida",nextPage:"Gå till nästa sida",lastPage:"Gå till sista sidan",reload:"Ladda om den aktuella sidan",noRecords:"Inga rader att visa",pageCountTemplate:function(e){return"av ".concat(e.lastPage)},summaryTemplate:function(e){return"Visar poster ".concat(e.start," - ").concat(e.end," av ").concat(e.allCount)}},List:{loading:"Laddar..."}},r={TemplateColumn:{noTemplate:"TemplateColumn kräver en template",noFunction:"TemplateColumn.template måste vara en funktion"},ColumnStore:{columnTypeNotFound:function(e){return"Kolumntypen '".concat(e.type,"' är inte registrerad")}},ColumnPicker:{columnsMenu:"Kolumner",hideColumn:"Dölj kolumn",hideColumnShort:"Dölj"},Filter:{applyFilter:"Använd filter",editFilter:"Redigera filter",filter:"Filter",on:"På",before:"Före",after:"Efter",equals:"Lika med",lessThan:"Mindre än",moreThan:"Större än",removeFilter:"Ta bort filter"},FilterBar:{enableFilterBar:"Visa filterrad",disableFilterBar:"Dölj filterrad"},Group:{groupAscending:"Gruppera stigande",groupDescending:"Gruppera fallande",groupAscendingShort:"Stigande",groupDescendingShort:"Fallande",stopGrouping:"Sluta gruppera",stopGroupingShort:"Sluta"},Search:{searchForValue:"Sök efter värde"},Sort:{sortAscending:"Sortera stigande",sortDescending:"Sortera fallande",multiSort:"Multisortering",addSortAscending:"Lägg till stigande",addSortDescending:"Lägg till fallande",toggleSortAscending:"Ändra till stigande",toggleSortDescending:"Ändra till fallande",removeSorter:"Ta bort sorterare",sortAscendingShort:"Stigande",sortDescendingShort:"Fallande",removeSorterShort:"Ta bort",addSortAscendingShort:"+ Stigande",addSortDescendingShort:"+ Fallande"},Tree:{noTreeColumn:"För att använda featuren tree måste en kolumn vara konfigurerad med tree: true"},Grid:{featureNotFound:function(e){return"Featuren '".concat(e,"' är inte tillgänglig, kontrollera att den är importerad")},invalidFeatureNameFormat:function(e){return"Ogiltigt funktionsnamn '".concat(e,"' måste börja med en liten bokstav")},removeRow:"Ta bort rad",removeRows:"Ta bort rader",loadFailedMessage:"Ett fel har uppstått, vänligen försök igen.",moveColumnLeft:"Flytta till vänstra sektionen",moveColumnRight:"Flytta till högra sektionen"},GridBase:{loadMask:"Laddar...",noRows:"Inga rader att visa"},PdfExport:{"Waiting for response from server...":"Väntar på svar från servern..."},ExportDialog:{width:"40em",labelWidth:"13em",exportSettings:"Exportera inställningar",export:"Exportera",exporterType:"Styra sidbrytningarna",cancel:"Avbryt",fileFormat:"Filformat",rows:"Кader",alignRows:"Anpassa raderna",columns:"Kolumner",paperFormat:"Pappersformat",orientation:"Orientering"},ExportRowsCombo:{all:"Alla rader",visible:"Synliga rader"},ExportOrientationCombo:{portrait:"Stående",landscape:"Liggande"},SinglePageExporter:{singlepage:"En sida"},MultiPageExporter:{multipage:"Flera sidor",exportingPage:function(e){var t=e.currentPage,n=e.totalPages;return"Exporterar sidan ".concat(t,"/").concat(n)}}};for(var l in a)r[l]=a[l];var i=r,o={SchedulerCommon:{},ExcelExporter:{"No resource assigned":"Ingen resurs tilldelad"},ResourceInfoColumn:{eventCountText:function(e){return e+" händelse"+(1!==e?"r":"")}},Dependencies:{from:"Från",to:"Till",valid:"Giltig",invalid:"Ogiltig",Checking:"Kontrollerar…"},EventEdit:{Name:"Namn",Resource:"Resurs",Start:"Start",End:"Slut",Save:"Spara",Delete:"Ta bort",Cancel:"Avbryt","Edit Event":"Redigera bokning",Repeat:"Upprepa"},DependencyEdit:{From:"Från",To:"Till",Type:"Typ",Lag:"Fördröjning","Edit dependency":"Ändra beroende",Save:"Spara",Delete:"Ta bort",Cancel:"Avbryt",StartToStart:"Start till Start",StartToEnd:"Start till Slut",EndToStart:"Slut till Start",EndToEnd:"Slut till Slut"},Scheduler:{"Add event":"Lägg till bokning","Delete event":"Ta bort bokning","Unassign event":"Ta bort resurskoppling"},HeaderContextMenu:{pickZoomLevel:"Välj zoomnivå",activeDateRange:"Aktivt datumintervall",startText:"Start datum",endText:"Slut datum",todayText:"I dag"},EventFilter:{filterEvents:"Filtrera händelser",byName:"Med namn"},TimeRanges:{showCurrentTimeLine:"Visa aktuell tidslinje"},PresetManager:{minuteAndHour:{topDateFormat:"ddd, DD/MM, h:mm"},hourAndDay:{topDateFormat:"ddd DD/MM"},weekAndDay:{displayDateFormat:"HH:mm"}},RecurrenceConfirmationPopup:{"delete-title":"Borttagning av bokning","delete-all-message":"Vill du ta bort alla instanser av denna bokning?","delete-further-message":"Vill du ta bort denna och alla framtida instanser av denna bokning, eller bara denna?","delete-further-btn-text":"Ta bort alla framtida","delete-only-this-btn-text":"Ta bort endast denna","update-title":"Redigering av upprepad bokning","update-all-message":"Vill du ändra alla instanser av denna bokning?","update-further-message":"Vill du ändra på endast denna instans, eller denna och alla framtida?","update-further-btn-text":"Alla framtida","update-only-this-btn-text":"Endast denna",Yes:"Ja",Cancel:"Avbryt",width:500},RecurrenceLegend:{" and ":" och ",Daily:"Daglig","Weekly on {1}":function(e){var t=e.days;return"Veckovis på ".concat(t)},"Monthly on {1}":function(e){var t=e.days;return"Måntaligen den ".concat(t)},"Yearly on {1} of {2}":function(e){var t=e.days,n=e.months;return"Årligen ".concat(t," ").concat(n)},"Every {0} days":function(e){var t=e.interval;return"Var ".concat(t," dag")},"Every {0} weeks on {1}":function(e){var t=e.interval,n=e.days;return"Var ".concat(t," vecka på ").concat(n)},"Every {0} months on {1}":function(e){var t=e.interval,n=e.days;return"Var ".concat(t," månad ").concat(n)},"Every {0} years on {1} of {2}":function(e){var t=e.interval,n=e.days,a=e.months;return"Var ".concat(t," år på ").concat(n," av ").concat(a)},position1:"den första",position2:"den andra",position3:"den tredje",position4:"den fjärde",position5:"den femte","position-1":"den sista",day:"dagen",weekday:"veckodagen","weekend day":"dagen i veckoslut",daysFormat:function(e){var t=e.position,n=e.days;return"".concat(t," ").concat(n)}},RecurrenceEditor:{"Repeat event":"Upprepa bokning",Cancel:"Avbryt",Save:"Spara",Frequency:"Frekvens",Every:"Var",DAILYintervalUnit:"dag",WEEKLYintervalUnit:"vecka på:",MONTHLYintervalUnit:"månad",YEARLYintervalUnit:"år i:",Each:"Varje","On the":"På den","End repeat":"Avsluta upprepning","time(s)":"upprepningar"},RecurrenceDaysCombo:{day:"dagen",weekday:"veckodagen","weekend day":"dagen i veckoslutet"},RecurrencePositionsCombo:{position1:"första",position2:"andra",position3:"tredje",position4:"fjärde",position5:"femte","position-1":"sista"},RecurrenceStopConditionCombo:{Never:"Aldrig",After:"Efter","On date":"På datum"},RecurrenceFrequencyCombo:{Daily:"Daglig",Weekly:"Veckovis",Monthly:"Månatlig",Yearly:"Årlig"},RecurrenceCombo:{None:"Ingen","Custom...":"Anpassad..."},ScheduleRangeCombo:{completeview:"Hela schemat",currentview:"Aktuell vy",daterange:"Datumintervall",completedata:"Hela schemat (alla aktiviteter)"},SchedulerExportDialog:{"Schedule range":"Tidsintervall","Export from":"Från","Export to":"Till"}};for(var d in i)o[d]=i[d];var s=o,u={SchedulerProCommon:{SS:"SS",SF:"SA",FS:"AS",FF:"AA",StartToStart:"Start-Till-Start",StartToEnd:"Start-Till-Avslut",EndToStart:"Avslut-Till-Start",EndToEnd:"Avslut-Till-Avslut",dependencyTypes:["SS","SA","AS","AA"],dependencyTypesLong:["Start-Till-Start","Start-Till-Avslut","Avslut-Till-Start","Avslut-Till-Avslut"]},ConstraintTypePicker:{"Must start on":"Måste starta","Must finish on":"Måste avslutas","Start no earlier than":"Starta tidigast","Start no later than":"Starta senast","Finish no earlier than":"Avsluta tidigast","Finish no later than":"Avsluta senast"},ProTaskEdit:{"Edit event":"Redigera händelse"},TaskEditorBase:{editorWidth:"45em",Information:"Information",Save:"Spara",Cancel:"Avbryt",Delete:"Ta bort"},SchedulerGeneralTab:{labelWidth:"11.0em",General:"Allmänt",Name:"Namn","% complete":"% Färdig",Duration:"Varaktighet",Start:"Start",Finish:"Slut",Effort:"Arbetsinsats",Dates:"Datum","Manually scheduled":"Manuellt planerad",Calendar:"Kalender"},GeneralTab:{labelWidth:"8em",General:"Allmänt",Name:"Namn","% complete":"% Färdig",Duration:"Varaktighet",Start:"Start",Finish:"Slut",Effort:"Arbetsinsats",Dates:"Datum"},AdvancedTab:{labelWidth:"11em",Advanced:"Avancerat",Calendar:"Kalender","Scheduling mode":"Aktivitetstyp","Effort driven":"Insatsdriven","Manually scheduled":"Manuellt planerad","Constraint type":"Villkorstyp","Constraint date":"Måldatum",Constraint:"Villkor"},DependencyTab:{Predecessors:"Föregångare",Successors:"Efterföljare",ID:"ID",Name:"Namn",Type:"Typ",Lag:"Fördröjning","Cyclic dependency has been detected":"Cycliskt beroende"},ResourcesTab:{unitsTpl:function(e){var t=e.value;return"".concat(t,"%")},Resources:"Resurser",Resource:"Resurs",Units:"Enheter"},NotesTab:{Notes:"Anteckning"},SchedulingModePicker:{Normal:"Normal","Fixed Duration":"Fast varaktighet","Fixed Units":"Fasta enheter","Fixed Effort":"Fast arbete"}};for(var c in s)u[c]=s[c];var m=u,g={AddNewColumn:{"New Column":"Lägg till ny kolumn..."},EarlyStartDateColumn:{"Early Start":"Tidig Start"},EarlyEndDateColumn:{"Early End":"Tidigt Slut"},LateStartDateColumn:{"Late Start":"Sen Start"},LateEndDateColumn:{"Late End":"Sent Slut"},TotalSlackColumn:{"Total Slack":"Totalt slack"},MilestoneColumn:{Milestone:"Milstolpe (v)"},EffortColumn:{Effort:"Arbetsinsats"},CalendarColumn:{Calendar:"Kalender"},ConstraintDateColumn:{"Constraint Date":"Måldatum"},ConstraintTypeColumn:{"Constraint Type":"Villkorstyp"},DependencyColumn:{"Invalid dependency found, change is reverted":"Ogiltigt beroende hittades, ändringen ej utförd"},DurationColumn:{Duration:"Varaktighet"},EndDateColumn:{Finish:"Slut"},NameColumn:{Name:"Aktivitet"},NoteColumn:{Note:"Anteckning"},PercentDoneColumn:{"% Done":"% Färdig"},PredecessorColumn:{Predecessors:"Föregående"},ResourceAssignmentColumn:{"Assigned Resources":"Tilldelade Resurser"},SchedulingModeColumn:{"Scheduling Mode":"Läge"},SequenceColumn:{Sequence:"#"},StartDateColumn:{Start:"Start"},ShowInTimelineColumn:{"Show in timeline":"Visa i tidslinje"},SuccessorColumn:{Successors:"Efterföljande"},WBSColumn:{WBS:"Strukturkod"},EventModeColumn:{"Event mode":"Händelse läge",Manual:"Manuell",Auto:"Automatiskt"},ManuallyScheduledColumn:{"Manually scheduled":"Manuellt planerad"},ProjectLines:{"Project Start":"Projektstart","Project End":"Projektslut"},TaskTooltip:{Start:"Börjar",End:"Slutar",Duration:"Längd",Complete:"Färdig"},AssignmentGrid:{Name:"Resursnamn",Units:"Enheter","%":"%",unitsTpl:function(e){var t=e.value;return t?t+"%":""}},AssignmentPicker:{Save:"Spara",Cancel:"Avbryt"},AssignmentEditGrid:{Name:"Resursnamn",Units:"Enheter"},Gantt:{Add:"Lägg till...","New Task":"Ny aktivitet","Task above":"Aktivtitet över","Task below":"Aktivitet under","Delete task":"Ta bort aktivitet(er)",Milestone:"?Milestone","Sub-task":"Milstolpe",Successor:"Efterföljare",Predecessor:"Föregångare",changeRejected:"Schemaläggningsmotorn avvisade ändringarna"},GanttCommon:{},ProTaskEdit:{"Edit event":"Redigera uppgift"}};for(var p in m)g[p]=m[p];t.default=g}]).default}));