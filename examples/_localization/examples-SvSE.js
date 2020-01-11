import LocaleManager from '../../lib/Core/localization/LocaleManager.js';
import '../../lib/Gantt/localization/SvSE.js';

const examplesLocale = {
    extends : 'SvSE',

    TaskTooltip : {
        'Scheduling Mode' : 'Läge',
        'Calendar'        : 'Kalender',
        'Critical'        : 'Kritisk',
        'Yes'             : 'Ja',
        'No'              : 'Nej'
    },

    Shared : {
        'Locale changed' : 'Språk ändrat'
    }
};

export default examplesLocale;

LocaleManager.extendLocale('SvSE', examplesLocale);
