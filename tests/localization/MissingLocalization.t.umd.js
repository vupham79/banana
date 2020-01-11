"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Ignore translations completely
// IMPORTANT!!! Do not add translations which are the same to En to ignoreList
var ignoreList = {
  Common: [/DateHelper.unitAbbreviations\.\d\.\d/, // Number of abbreviations can vary
  /DateHelper.unitNames.\d.canonicalUnitName/],
  De: ['Column', // used in the "localization" demo
  'Shared' // used in the "localization" demo
  ]
}; // Ignore translations for which En = locale

var universalList = {
  Common: [/DateHelper.unitNames\.\d/, 'RecurrenceLegend.daysFormat'],
  Nl: ['AssignmentGrid.%', 'DateHelper.week', 'DependencyEdit.Type', 'DependencyTab.ID', 'DependencyTab.Type', 'EventEdit.Resource', 'EventEdit.Start', 'EventModeColumn.Auto', 'Filter.filter', 'RecurrenceConfirmationPopup.width', 'ResourcesTab.Resource', 'ResourcesTab.Resources', 'WBSColumn.WBS', 'ExportDialog.width', 'ExportDialog.labelWidth', 'ExportDialog.columns'],
  SvSE: ['AssignmentGrid.%', 'DateHelper.shortQuarter', 'DependencyTab.ID', 'EventEdit.Start', 'Filter.filter', 'SchedulerProCommon.SS', 'SchedulerProCommon.dependencyTypes.0', 'GeneralTab.Start', 'SchedulerGeneralTab.Start', 'SchedulingModePicker.Normal', 'StartDateColumn.Start', 'TaskEditorBase.Information', 'TaskEditorBase.editorWidth', 'ExportDialog.width'],
  De: ['AssignmentGrid.%', 'DateHelper.shortQuarter', 'DateHelper.shortWeek', 'DependencyTab.ID', 'DependencyTab.Name', 'EventEdit.Name', 'EventEdit.Start', 'EventModeColumn.Auto', 'Filter.filter', 'GeneralTab.Name', 'GeneralTab.Start', 'RecurrenceConfirmationPopup.width', 'SchedulerGeneralTab.Name', 'SchedulerGeneralTab.Start', 'ResourcesTab.Resource', 'SchedulingModePicker.Normal', 'Tree.noTreeColumn', 'WBSColumn.WBS', 'ExportDialog.width', 'ExportDialog.labelWidth', 'ExportDialog.export'],
  Ru: ['AssignmentGrid.%', 'RecurrenceConfirmationPopup.width', 'ExportDialog.width']
}; // **IMPORTANT** The test is used in all projects
// If you feel like to change something in it, please go to other and change it there also

StartTest('All locales should have corresponding to English locale translations', function (t) {
  // Locales are loaded in "tests/index.js" file in Localization test group in "alsoPreloads"
  var locales = window.bryntum.locales,
      originalLocale = locales.En; // Current locale for test

  var locale, localeDesc, localeName;

  function isIgnored(list, str) {
    return (list[localeName] || []).concat(list.Common || []).some(function (item) {
      return item instanceof RegExp ? item.test(str) : item === str;
    });
  }

  function assertMissing(t, original, asserted) {
    var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    Object.keys(original).forEach(function (key) {
      var currentPath = path ? "".concat(path, ".").concat(key) : key; // if path should not be ignored

      if (!isIgnored(ignoreList, currentPath)) {
        // localization is found
        if (key in asserted && _typeof(asserted[key]) === _typeof(original[key])) {
          // If value type is an object go inside
          if (_typeof(original[key]) === 'object') {
            assertMissing(t, original[key], asserted[key], currentPath);
          } // values are the same then probably it's a copy-paste from asserted locale
          else if (original[key] === asserted[key]) {
              if (!isIgnored(universalList, currentPath)) {
                t.fail("'".concat(currentPath, "' in ").concat(localeName, " locale matches ").concat(originalLocale.localeName, " locale (add to universalList to ignore)."));
              } else {
                // Remove from universalList to check redundant strings
                var index = universalList[localeName].indexOf(currentPath);
                if (index !== -1) universalList[localeName].splice(index, 1);
              }
            }
        } // localization not found
        else {
            t.fail("'".concat(currentPath, "' is not localized in ").concat(localeName, " locale (add to ignoreList to ignore)."));
          }
      }
    });
  }

  function assertRedundant(t, master, asserted) {
    var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    Object.keys(asserted).forEach(function (localeKey) {
      var currentPath = path ? "".concat(path, ".").concat(localeKey) : localeKey;

      if (!isIgnored(ignoreList, currentPath)) {
        // if not found in master
        if (!(localeKey in master) || _typeof(master[localeKey]) !== _typeof(asserted[localeKey])) {
          t.fail("'".concat(currentPath, "' is redundant in ").concat(localeName, " locale (add to ignoreList to ignore)."));
        } else if (_typeof(asserted[localeKey]) === 'object') {
          assertRedundant(t, master[localeKey], asserted[localeKey], currentPath);
        }
      }
    });
  }

  function assertArrowFunction(t, asserted) {
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    Object.keys(asserted).forEach(function (localeKey) {
      var currentPath = path ? "".concat(path, ".").concat(localeKey) : localeKey; // if not found in master

      if (typeof asserted[localeKey] === 'function') {
        if (/=>/.test(asserted[localeKey])) {
          t.fail("ES6 Arrow function found in '".concat(currentPath, "' in ").concat(localeName, "."));
        }
      } else if (_typeof(asserted[localeKey]) === 'object') {
        assertArrowFunction(t, asserted[localeKey], currentPath);
      }
    });
  } // skip En locale during iterations


  delete locales.En;
  Object.keys(locales).forEach(function (name) {
    t.it("Check ".concat(name, " locale"), function (t) {
      locale = locales[name];
      localeDesc = locale.localeDesc;
      localeName = locale.localeName;
      t.ok(localeName, "Locale name is specified for ".concat(name));
      t.ok(localeDesc, "Locale description is specified for ".concat(name)); // We suppose to use ES5 format for De localization

      locale === locales.De && assertArrowFunction(t, locale); // Checking Missing Translations

      assertMissing(t, originalLocale, locale); //Checking Redundant Translations

      assertRedundant(t, originalLocale, locale); //Checking Redundant strings in test's universalList to keep test clean

      var uList = (universalList[localeName] || []).filter(function (str) {
        return typeof str === 'string';
      });

      if (uList.length > 0) {
        t.fail("Redundant strings found in universalList.".concat(localeName, ": ").concat(JSON.stringify(uList)));
      }
    });
  });
});