"use strict";

StartTest(function (t) {
  //All locales are preloaded via alsoPreload in tests/index.js
  function applyLocale(t, name) {
    t.diag("Applying locale ".concat(name));
    return LocaleManager.locale = window.bryntum.locales[name];
  }

  var editor;
  t.beforeEach(function (t, next) {
    editor && !editor.isDestroyed && editor.destroy();
    editor = new TaskEditor({
      appendTo: document.body
    }); // Wait for locales to load

    t.waitFor(function () {
      return window.bryntum.locales;
    }, next);
  });
  t.it('Should localize TaskEditor', function (t) {
    Object.keys(window.bryntum.locales).forEach(function (name) {
      t.describe("".concat(name, " locale is ok"), function (t) {
        var locale = applyLocale(t, name);
        var tabs = document.querySelectorAll('.b-gantt-taskeditor .b-tabpanel-tab');
        t.contentLike(tabs[0], locale.GeneralTab.General, 'General tab localization is ok');
        t.contentLike(tabs[1], locale.DependencyTab.Successors, 'Successors tab localization is ok');
        t.contentLike(tabs[2], locale.DependencyTab.Predecessors, 'Predecessors tab localization is ok');
        t.contentLike(tabs[3], locale.ResourcesTab.Resources, 'Resources tab localization is ok');
        t.contentLike(tabs[4], locale.AdvancedTab.Advanced, 'Advanced tab localization is ok');
        t.contentLike(tabs[5], locale.NotesTab.Notes, 'Notes tab localization is ok');
        t.is(document.querySelector('.b-gantt-taskeditor .b-header-title').textContent, locale.TaskEditorBase.Information, 'Information currentLocale is ok');
        t.is(editor.widgetMap.saveButton.element.textContent, locale.TaskEditorBase.Save, 'Save button currentLocale is ok');
        t.is(editor.widgetMap.cancelButton.element.textContent, locale.TaskEditorBase.Cancel, 'Cancel button currentLocale is ok');
      });
    });
  }); // TODO: enable this back when https://app.assembla.com/spaces/bryntum/tickets/8034 is fixed

  /*
  t.it('Should localize TaskEditor width', t => {
      Object.keys(window.bryntum.locales).forEach(name => {
          t.describe(`${name} locale is ok`, t => {
              const locale = applyLocale(t, name);
              let eventEditorWidth = locale.TaskEditorBase.editorWidth;
               if (/em/.test(eventEditorWidth)) {
                  let size = parseInt(eventEditorWidth),
                      fontSize = parseInt(window.getComputedStyle(editor.element).fontSize),
                      expectedWidth = size * fontSize;
                  t.is(editor.width, expectedWidth, 'Width is properly localized');
              }
          });
      });
  });
  */
});