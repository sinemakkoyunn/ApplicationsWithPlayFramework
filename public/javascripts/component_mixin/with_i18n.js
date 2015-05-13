"use strict";

define(function(require) {

  function withI18N() {
    this.i18n = function(data) {
      data = data || {};

      data.i18n = function () {
        return function (i18nKey) {
          return _i18nMessages[i18nKey];
        };
      };

      return data;
    };

    this.messageForKey = function(i18nKey) {
      return _i18nMessages[i18nKey];
    };
  }

  return withI18N;
});
