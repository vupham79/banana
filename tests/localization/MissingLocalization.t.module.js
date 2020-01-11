// Ignore translations completely
// IMPORTANT!!! Do not add translations which are the same to En to ignoreList
const ignoreList = {
    Common : [
        /DateHelper.unitAbbreviations\.\d\.\d/,      // Number of abbreviations can vary
        /DateHelper.unitNames.\d.canonicalUnitName/
    ],
    De : [
        'Column', // used in the "localization" demo
        'Shared' // used in the "localization" demo
    ]
};

// Ignore translations for which En = locale
const universalList = {
    Common : [
        /DateHelper.unitNames\.\d/,
        'RecurrenceLegend.daysFormat'
    ],
    Nl : [
        'AssignmentGrid.%',
        'DateHelper.week',
        'DependencyEdit.Type',
        'DependencyTab.ID',
        'DependencyTab.Type',
        'EventEdit.Resource',
        'EventEdit.Start',
        'EventModeColumn.Auto',
        'Filter.filter',
        'RecurrenceConfirmationPopup.width',
        'ResourcesTab.Resource',
        'ResourcesTab.Resources',
        'WBSColumn.WBS',
        'ExportDialog.width',
        'ExportDialog.labelWidth',
        'ExportDialog.columns'
    ],
    SvSE : [
        'AssignmentGrid.%',
        'DateHelper.shortQuarter',
        'DependencyTab.ID',
        'EventEdit.Start',
        'Filter.filter',
        'SchedulerProCommon.SS',
        'SchedulerProCommon.dependencyTypes.0',
        'GeneralTab.Start',
        'SchedulerGeneralTab.Start',
        'SchedulingModePicker.Normal',
        'StartDateColumn.Start',
        'TaskEditorBase.Information',
        'TaskEditorBase.editorWidth',
        'ExportDialog.width'
    ],
    De : [
        'AssignmentGrid.%',
        'DateHelper.shortQuarter',
        'DateHelper.shortWeek',
        'DependencyTab.ID',
        'DependencyTab.Name',
        'EventEdit.Name',
        'EventEdit.Start',
        'EventModeColumn.Auto',
        'Filter.filter',
        'GeneralTab.Name',
        'GeneralTab.Start',
        'RecurrenceConfirmationPopup.width',
        'SchedulerGeneralTab.Name',
        'SchedulerGeneralTab.Start',
        'ResourcesTab.Resource',
        'SchedulingModePicker.Normal',
        'Tree.noTreeColumn',
        'WBSColumn.WBS',
        'ExportDialog.width',
        'ExportDialog.labelWidth',
        'ExportDialog.export'
    ],
    Ru : [
        'AssignmentGrid.%',
        'RecurrenceConfirmationPopup.width',
        'ExportDialog.width'
    ]
};

// **IMPORTANT** The test is used in all projects
// If you feel like to change something in it, please go to other and change it there also

StartTest('All locales should have corresponding to English locale translations', t => {

    // Locales are loaded in "tests/index.js?437987" file in Localization test group in "alsoPreloads"
    const
        locales        = window.bryntum.locales,
        originalLocale = locales.En;

    // Current locale for test
    let locale, localeDesc, localeName;

    function isIgnored(list, str) {
        return (list[localeName] || []).concat(list.Common || []).some(item => {
            return item instanceof RegExp ? item.test(str) : item === str;
        });
    }

    function assertMissing(t, original, asserted, path = '') {
        Object.keys(original).forEach(key => {
            const currentPath = path ? `${path}.${key}` : key;
            // if path should not be ignored
            if (!isIgnored(ignoreList, currentPath)) {
                // localization is found
                if (key in asserted && typeof asserted[key] === typeof original[key]) {
                    // If value type is an object go inside
                    if (typeof original[key] === 'object') {
                        assertMissing(t, original[key], asserted[key], currentPath);
                    }
                    // values are the same then probably it's a copy-paste from asserted locale
                    else if (original[key] === asserted[key]) {
                        if (!isIgnored(universalList, currentPath)) {
                            t.fail(`'${currentPath}' in ${localeName} locale matches ${originalLocale.localeName} locale (add to universalList to ignore).`);
                        }
                        else {
                            // Remove from universalList to check redundant strings
                            const index = universalList[localeName].indexOf(currentPath);
                            if (index !== -1) universalList[localeName].splice(index, 1);
                        }
                    }
                }
                // localization not found
                else {
                    t.fail(`'${currentPath}' is not localized in ${localeName} locale (add to ignoreList to ignore).`);
                }
            }
        });
    }

    function assertRedundant(t, master, asserted, path = '') {
        Object.keys(asserted).forEach(localeKey => {
            const currentPath = path ? `${path}.${localeKey}` : localeKey;

            if (!isIgnored(ignoreList, currentPath)) {
                // if not found in master
                if (!(localeKey in master) || (typeof master[localeKey] !== typeof asserted[localeKey])) {
                    t.fail(`'${currentPath}' is redundant in ${localeName} locale (add to ignoreList to ignore).`);
                }
                else if (typeof asserted[localeKey] === 'object') {
                    assertRedundant(t, master[localeKey], asserted[localeKey], currentPath);
                }
            }
        });
    }

    function assertArrowFunction(t, asserted, path = '') {
        Object.keys(asserted).forEach(localeKey => {
            const currentPath = path ? `${path}.${localeKey}` : localeKey;
            // if not found in master
            if (typeof asserted[localeKey] === 'function') {
                if (/=>/.test(asserted[localeKey])) {
                    t.fail(`ES6 Arrow function found in '${currentPath}' in ${localeName}.`);
                }
            }
            else if (typeof asserted[localeKey] === 'object') {
                assertArrowFunction(t,  asserted[localeKey], currentPath);
            }
        });
    }

    // skip En locale during iterations
    delete locales.En;

    Object.keys(locales).forEach(name => {
        t.it(`Check ${name} locale`, t => {
            locale   = locales[name];
            localeDesc = locale.localeDesc;
            localeName = locale.localeName;

            t.ok(localeName, `Locale name is specified for ${name}`);
            t.ok(localeDesc, `Locale description is specified for ${name}`);

            // We suppose to use ES5 format for De localization
            locale === locales.De && assertArrowFunction(t, locale);

            // Checking Missing Translations
            assertMissing(t, originalLocale, locale);

            //Checking Redundant Translations
            assertRedundant(t, originalLocale, locale);

            //Checking Redundant strings in test's universalList to keep test clean
            const uList = (universalList[localeName] || []).filter(str => typeof str === 'string');
            if (uList.length > 0) {
                t.fail(`Redundant strings found in universalList.${localeName}: ${JSON.stringify(uList)}`);
            }
        });
    });
});
