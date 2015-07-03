/**
 * Created by snm on 22.06.2015.
 */
'use strict';

define(
  [
    'require',
    'handsontable',
    'flight'
  ],

  function (require) {

    var defineComponent = require('flight').component;

    return defineComponent(handsontableComponent);

    function handsontableComponent() {
      var self;

      this.attributes({
        colHeaders: true,
        rowHeaders: true,
        autoColumnSize: true,
        columnSorting: false,
        contextMenu: false,
        fixedColumnsLeft: 0,
        fixedRowsTop: 0,
        columns: 'undefined',
        startRows: null,
        colWidths: false
      });

      this.enableHandsontable = function () {
        self.hot = new Handsontable(self.$node[0], {
          autoColumnSize: self.attr.autoColumnSize,
          colHeaders: self.attr.colHeaders,
          rowHeaders: self.attr.rowHeaders,
          columnSorting: self.attr.columnSorting,
          contextMenu: self.attr.contextMenu,
          fixedColumnsLeft: self.attr.fixedColumnsLeft,
          fixedRowsTop: self.attr.fixedRowsTop,
          columns: self.attr.columns,
          startRows: self.attr.startRows,
          colWidths: self.attr.colWidths,
          afterChange: function(changes, source) {
            self.trigger(document, 'dataChangedHandsontable', {
              changes: changes,
              source: source
            })
          }
        });
      };

      this.loadTable = function (e, data) {
        self.hot.loadData(data);
      };

      this.sendData = function () {
        var dataContainer = [], data = self.hot.getData();
        dataContainer[0] = data;
        this.trigger(document, 'dataReceivedHandsontableData', dataContainer);
      };

      this.after('initialize', function () {
        self = this;
        this.enableHandsontable();

        this.on(document, 'uiNeedsHandsontableLoad', this.loadTable);
        this.on(document, 'uiNeedsHandsontableData', this.sendData);
      });

    }
  });



