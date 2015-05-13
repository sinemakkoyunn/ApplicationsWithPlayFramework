"use strict";
define(function(require) {

  var compose = require('flight').compose;
  var withList = require('component_mixin/with_list');

  function withTable() {

    compose.mixin(this, [withList]);

    this.attributes({
      rowDeletedEvent: "rowDeleted",
      sayfa: 1,
      adet: 12,
      noResultsTemplate:
      '<table>\
        <br>\
        <tbody>\
        <tr class="danger">\
          <td><strong>Sonuç bulunamadı</strong></td>\
        </tr>\
        </tbody>\
      </table>'
    });
  }

  return withTable;
});
