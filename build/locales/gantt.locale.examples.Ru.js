/*

Bryntum Gantt (TRIAL VERSION) 2.0.0
Copyright(c) 2019 Bryntum AB
https://bryntum.com/contact
https://bryntum.com/license

*/
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("examples.Ru",[],t):"object"==typeof exports?exports["examples.Ru"]=t():(e.bryntum=e.bryntum||{},e.bryntum.locales=e.bryntum.locales||{},e.bryntum.locales["examples.Ru"]=t())}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";n.r(t);var o={localeName:"Ru",localeDesc:"Russian",Object:{Yes:"Да",No:"Нет",Cancel:"Отмена"},InstancePlugin:{fnMissing:function(e){return"Пытаемся связать метод ".concat(e.plugIntoName,"#").concat(e.fnName,", но в плагине не был найден метод ").concat(e.pluginName,"#").concat(e.fnName)},overrideFnMissing:function(e){return"Пытаемся перегрузить метод ".concat(e.plugIntoName,"#").concat(e.fnName,", но в плагине не был найден метод ").concat(e.pluginName,"#").concat(e.fnName)}},Field:{invalidValue:"Недопустимое значение поля",minimumValueViolation:"Нарушение минимального значения",maximumValueViolation:"Нарушение максимального значения",fieldRequired:"Поле не может быть пустым",validateFilter:"Выберите значение из списка"},DateField:{invalidDate:"Невернывй формат даты"},TimeField:{invalidTime:"Неверный формат времени"},DateHelper:{locale:"ru",shortWeek:"нед",shortQuarter:"квар",week:"Hеделя",weekStartDay:1,unitNames:[{single:"миллисек",plural:"миллисек",abbrev:"мс"},{single:"секунда",plural:"секунд",abbrev:"с"},{single:"минута",plural:"минут",abbrev:"мин"},{single:"час",plural:"часов",abbrev:"ч"},{single:"день",plural:"дней",abbrev:"д"},{single:"неделя",plural:"недели",abbrev:"нед"},{single:"месяц",plural:"месяцев",abbrev:"мес"},{single:"квартал",plural:"кварталов",abbrev:"квар"},{single:"год",plural:"лет",abbrev:"г"}],unitAbbreviations:[["мс","мил"],["с","сек"],["м","мин"],["ч"],["д","ден","дне"],["н","нед"],["мес"],["к","квар","квр"],["г"]],parsers:{L:"DD.MM.YYYY",LT:"HH:mm"},ordinalSuffix:function(e){return"".concat(e,"-й")}},PagingToolbar:{firstPage:"Перейти на первую страницу",prevPage:"Перейти на предыдущую страницу",page:"страница",nextPage:"Перейти на следующую страницу",lastPage:"Перейти на последнюю страницу",reload:"Перезагрузить текущую страницу",noRecords:"Нет записей для отображения",pageCountTemplate:function(e){return"из ".concat(e.lastPage)},summaryTemplate:function(e){return"Показаны записи ".concat(e.start," - ").concat(e.end," из ").concat(e.allCount)}},List:{loading:"Загрузка..."}},a={TemplateColumn:{noTemplate:"TemplateColumn необходим шаблон",noFunction:"TemplateColumn.template должен быть функцией"},ColumnStore:{columnTypeNotFound:function(e){return"Тип колонки '".concat(e.type,"' не зарегистрирован")}},ColumnPicker:{columnsMenu:"Колонки",hideColumn:"Спрятать колонку",hideColumnShort:"Спрятать"},Filter:{applyFilter:"Применить фильтр",filter:"Фильтр",editFilter:"Изменить фильтр",on:"В этот день",before:"До",after:"После",equals:"Равно",lessThan:"Меньше, чем",moreThan:"Больше, чем",removeFilter:"Убрать фильтр"},FilterBar:{enableFilterBar:"Показать панель фильтров",disableFilterBar:"Спрятать панель фильтров"},Group:{groupAscending:"Группа по возрастанию",groupDescending:"Группа по убыванию",groupAscendingShort:"Возрастание",groupDescendingShort:"Убывание",stopGrouping:"Убрать группу",stopGroupingShort:"Убрать"},Search:{searchForValue:"Найти значение"},Sort:{sortAscending:"Сортировать по возрастанию",sortDescending:"Сортировать по убыванию",multiSort:"Сложная сортировка",removeSorter:"Убрать сортировку",addSortAscending:"Добавить сортировку по возрастанию",addSortDescending:"Добавить сортировку по убыванию",toggleSortAscending:"Сортировать по возрастанию",toggleSortDescending:"Сортировать по убыванию",sortAscendingShort:"Возрастание",sortDescendingShort:"Убывание",removeSorterShort:"Убрать",addSortAscendingShort:"+ Возраст...",addSortDescendingShort:"+ Убыв..."},Tree:{noTreeColumn:"Чтобы использовать дерево необходимо чтобы одна колонка имела настройку tree: true"},Grid:{featureNotFound:function(e){return"Опция '".concat(e,"' недоступна, убедитесь что она импортирована")},invalidFeatureNameFormat:function(e){return"Неверное имя функциональности '".concat(e,"', так как оно должно начинаться с маленькой буквы")},removeRow:"Удалить запись",removeRows:"Удалить записи",loadFailedMessage:"Не удалось загрузить",moveColumnLeft:"Передвинуть в левую секцию",moveColumnRight:"Передвинуть в правую секцию"},GridBase:{loadMask:"Загрузка...",noRows:"Нет записей для отображения"},PdfExport:{"Waiting for response from server...":"Ожидание ответа от сервера..."},ExportDialog:{width:"40em",labelWidth:"13em",exportSettings:"Настройки",export:"Экспорт",exporterType:"Разбивка на страницы",cancel:"Отмена",fileFormat:"Формат файла",rows:"Строки",alignRows:"Выровнять строки",columns:"Колонки",paperFormat:"Размер листа",orientation:"Ориентация"},ExportRowsCombo:{all:"Все строки",visible:"Видимые строки"},ExportOrientationCombo:{portrait:"Портретная",landscape:"Ландшафтная"},SinglePageExporter:{singlepage:"Одна страница"},MultiPageExporter:{multipage:"Многостраничный",exportingPage:function(e){var t=e.currentPage,n=e.totalPages;return"Экспорт страницы ".concat(t,"/").concat(n)}}};for(var r in o)a[r]=o[r];var i=a,l={SchedulerCommon:{},ExcelExporter:{"No resource assigned":"Ресурс не назначен"},ResourceInfoColumn:{eventCountText:function(e){return e+" "+(e>=2&&e<=4?"события":1!==e?"событий":"событие")}},Dependencies:{from:"От",to:"К",valid:"Верная",invalid:"Неверная",Checking:"Проверяю…"},EventEdit:{Name:"Название",Resource:"Ресурс",Start:"Начало",End:"Конец",Save:"Сохранить",Delete:"Удалить",Cancel:"Отмена","Edit Event":"Изменить событие",Repeat:"Повтор"},DependencyEdit:{From:"От",To:"К",Type:"Тип",Lag:"Запаздывание","Edit dependency":"Редактировать зависимость",Save:"Сохранить",Delete:"Удалить",Cancel:"Отменить",StartToStart:"Начало к Началу",StartToEnd:"Начало к Окончанию",EndToStart:"Окончание к Началу",EndToEnd:"Окончание к Окончанию"},Scheduler:{"Add event":"Добавить событие","Delete event":"Удалить событие","Unassign event":"Убрать назначение с события"},HeaderContextMenu:{pickZoomLevel:"Выберите масштаб",activeDateRange:"Диапазон дат",startText:"Начало",endText:"Конец",todayText:"Сегодня"},EventFilter:{filterEvents:"Фильтровать задачи",byName:"По имени"},TimeRanges:{showCurrentTimeLine:"Показать текущую шкалу времени"},PresetManager:{minuteAndHour:{topDateFormat:"ddd DD.MM, HH:mm"},hourAndDay:{topDateFormat:"ddd DD.MM"},weekAndDay:{displayDateFormat:"HH:mm"}},RecurrenceConfirmationPopup:{"delete-title":"Вы удаляете повторяющееся событие","delete-all-message":"Хотите удалить все повторения этого события?","delete-further-message":"Хотите удалить это и все последующие повторения этого события или только выбранное?","delete-further-btn-text":"Удалить все будущие повторения","delete-only-this-btn-text":"Удалить только это событие","update-title":"Вы изменяете повторяющееся событие","update-all-message":"Изменить все повторения события?","update-further-message":"Изменить только это повторение или это и все последующие повторения события?","update-further-btn-text":"Все будущие повторения","update-only-this-btn-text":"Только это событие",Yes:"Да",Cancel:"Отменить",width:600},RecurrenceLegend:{" and ":" и ",Daily:"Ежедневно","Weekly on {1}":function(e){var t=e.days;return"Еженедельно (".concat(t,")")},"Monthly on {1}":function(e){var t=e.days;return"Ежемесячно (день: ".concat(t,")")},"Yearly on {1} of {2}":function(e){var t=e.days,n=e.months;return"Ежегодно (день: ".concat(t,", месяц: ").concat(n,")")},"Every {0} days":function(e){var t=e.interval;return"Каждый ".concat(t," день")},"Every {0} weeks on {1}":function(e){var t=e.interval,n=e.days;return"Каждую ".concat(t," неделю, день: ").concat(n)},"Every {0} months on {1}":function(e){var t=e.interval,n=e.days;return"Каждый ".concat(t," месяц, день: ").concat(n)},"Every {0} years on {1} of {2}":function(e){var t=e.interval,n=e.days,o=e.months;return"Каждый ".concat(t," год, день: ").concat(n," месяц: ").concat(o)},position1:"первый",position2:"второй",position3:"третий",position4:"четвертый",position5:"пятый","position-1":"последний",day:"день",weekday:"будний день","weekend day":"выходной день",daysFormat:function(e){var t=e.position,n=e.days;return"".concat(t," ").concat(n)}},RecurrenceEditor:{"Repeat event":"Повторять событие",Cancel:"Отменить",Save:"Сохранить",Frequency:"Как часто",Every:"Каждый(ую)",DAILYintervalUnit:"день",WEEKLYintervalUnit:"неделю по:",MONTHLYintervalUnit:"месяц",YEARLYintervalUnit:"год/лет в:",Each:"Какого числа","On the":"В следующие дни","End repeat":"Прекратить","time(s)":"раз(а)"},RecurrenceDaysCombo:{day:"день",weekday:"будний день","weekend day":"выходной день"},RecurrencePositionsCombo:{position1:"первый",position2:"второй",position3:"третий",position4:"четвертый",position5:"пятый","position-1":"последний"},RecurrenceStopConditionCombo:{Never:"Никогда",After:"После","On date":"В дату"},RecurrenceFrequencyCombo:{Daily:"Каждый день",Weekly:"Каждую неделю",Monthly:"Каждый месяц",Yearly:"Каждый год"},RecurrenceCombo:{None:"Не выбрано","Custom...":"Настроить..."},ScheduleRangeCombo:{completeview:"Полное расписание",currentview:"Текущая видимая область",daterange:"Диапазон дат",completedata:"Полное расписание (по всем событиям)"},SchedulerExportDialog:{"Schedule range":"Диапазон расписания","Export from":"С","Export to":"По"}};for(var u in i)l[u]=i[u];var c=l,s={SchedulerProCommon:{SS:"НН",SF:"НО",FS:"ОН",FF:"ОО",StartToStart:"Начало-Начало",StartToEnd:"Начало-Окончание",EndToStart:"Окончание-Начало",EndToEnd:"Окончание-Окончание",dependencyTypes:["НН","НО","ОН","ОО"],dependencyTypesLong:["Начало-Начало","Начало-Окончание","Окончание-Начало","Окончание-Окончание"]},ConstraintTypePicker:{"Must start on":"Фиксированное начало","Must finish on":"Фиксированное окончание","Start no earlier than":"Начало не раньше","Start no later than":"Начало не позднее","Finish no earlier than":"Окончание не раньше","Finish no later than":"Окончание не позднее"},ProTaskEdit:{"Edit event":"Изменить событие"},TaskEditorBase:{editorWidth:"60em",Information:"Информация",Save:"Сохранить",Cancel:"Отменить",Delete:"Удалить"},SchedulerGeneralTab:{labelWidth:"18em",General:"Основные",Name:"Имя","% complete":"% выполнено",Duration:"Длительность",Start:"Начало",Finish:"Окончание",Effort:"Трудозатраты",Dates:"Даты","Manually scheduled":"Ручное планирование",Calendar:"Календарь"},GeneralTab:{labelWidth:"9em",General:"Основные",Name:"Имя","% complete":"% выполнено",Duration:"Длительность",Start:"Начало",Finish:"Окончание",Effort:"Трудозатраты",Dates:"Даты"},AdvancedTab:{labelWidth:"18em",Advanced:"Дополнительные",Calendar:"Календарь","Scheduling mode":"Тип планирования","Effort driven":"Управляемое трудозатратами","Manually scheduled":"Ручное планирование","Constraint type":"Тип ограничения","Constraint date":"Дата ограничения",Constraint:"Ограничение"},DependencyTab:{Predecessors:"Предшественники",Successors:"Последователи",ID:"Идентификатор",Name:"Имя",Type:"Тип",Lag:"Запаздывание","Cyclic dependency has been detected":"Обнаружена цикличная зависимость"},ResourcesTab:{unitsTpl:function(e){var t=e.value;return"".concat(t,"%")},Resources:"Ресурсы",Resource:"Ресурс",Units:"% Занятости"},NotesTab:{Notes:"Заметки"},SchedulingModePicker:{Normal:"Нормальный","Fixed Duration":"Фиксированная длительность","Fixed Units":"Фиксированные единицы","Fixed Effort":"Фиксированные трудозатраты"}};for(var d in c)s[d]=c[d];var m=s,p={AddNewColumn:{"New Column":"Добавить столбец..."},EarlyStartDateColumn:{"Early Start":"Раннее начало"},EarlyEndDateColumn:{"Early End":"Раннее окончание"},LateStartDateColumn:{"Late Start":"Позднее начало"},LateEndDateColumn:{"Late End":"Позднее окончание"},TotalSlackColumn:{"Total Slack":"Общий временной резерв"},MilestoneColumn:{Milestone:"Веха"},EffortColumn:{Effort:"Трудозатраты"},CalendarColumn:{Calendar:"Календарь"},ConstraintDateColumn:{"Constraint Date":"Дата ограничения"},ConstraintTypeColumn:{"Constraint Type":"Тип ограничения"},DependencyColumn:{"Invalid dependency found, change is reverted":"Найдена неверная зависимость, изменение отменено"},DurationColumn:{Duration:"Длительность"},EndDateColumn:{Finish:"Конец"},NameColumn:{Name:"Наименование задачи"},NoteColumn:{Note:"Примечание"},PercentDoneColumn:{"% Done":"% завершения"},PredecessorColumn:{Predecessors:"Предшествующие"},ResourceAssignmentColumn:{"Assigned Resources":"Назначенные ресурсы"},SchedulingModeColumn:{"Scheduling Mode":"Режим"},SequenceColumn:{Sequence:"#"},StartDateColumn:{Start:"Начало"},ShowInTimelineColumn:{"Show in timeline":"Показать на временной шкале"},SuccessorColumn:{Successors:"Последующие"},WBSColumn:{WBS:"СДР"},EventModeColumn:{"Event mode":"Режим расчёта",Manual:"Ручной",Auto:"Автоматический"},ManuallyScheduledColumn:{"Manually scheduled":"Ручное планирование"},ProjectLines:{"Project Start":"Начало проекта","Project End":"Окончание проекта"},TaskTooltip:{Start:"Начинается",End:"Заканчивается",Duration:"Длительность",Complete:"Выполнено"},AssignmentGrid:{Name:"Имя ресурса",Units:"Занятость","%":"%",unitsTpl:function(e){var t=e.value;return t?t+"%":""}},AssignmentPicker:{Save:"Сохранить",Cancel:"Отменить"},AssignmentEditGrid:{Name:"Имя ресурса",Units:"Единицы"},Gantt:{Add:"Добавить...","New Task":"Новая задача","Task above":"Задачу выше","Task below":"Задачу ниже","Delete task":"Удалить задачу(и)",Milestone:"Веху","Sub-task":"Под-задачу",Successor:"Последующую задачу",Predecessor:"Предшествующую задачу",changeRejected:"Планирование двигателя отклонило изменения"},GanttCommon:{},ProTaskEdit:{"Edit event":"Редактировать задачу"}};for(var f in m)p[f]=m[f];t.default=p},,,,function(e,t,n){"use strict";n.r(t);n(0);t.default={extends:"Ru",TaskTooltip:{"Scheduling Mode":"Тип планирования",Calendar:"Календарь",Critical:"Критично",Yes:"Да",No:"Нет"},Shared:{"Locale changed":"Язык изменен",Fullscreen:"На весь экран","Click to show the built in code editor":"Показать редактор кода","Click to show info and switch theme or locale":"Показать информацию, переключить тему или язык","Select theme":"Выбрать тему","Select locale":"Выбрать язык","Select size":"Выбрать размер","Full size":"Полный размер","Phone size":"Экран смартфона","Display hints":"Показать подсказки",Automatically:"Автоматически","Check to automatically display hints when loading the example":"Автоматически показывать подсказки при загрузке примера"},CodeEditor:{"Code editor":"Редактор кода","Download code":"Скачать код","Auto apply":"Применять автоматически",Apply:"Применить"}}}]).default}));