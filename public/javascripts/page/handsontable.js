/**
 * Created by snm on 22.06.2015.
 */

define(
  [
    'component_mixin/handsontable_component',
    'bootstrap'
  ],

     function(HandsonTable) {

         var numeric = {type: 'numeric', format: '0,0.00'}
             , readOnly = {readOnly: true}
             , columns = []
             , colHeaders = []
             , i;

         colHeaders[0] = "day";
         colHeaders[1] = "type";
         for (i = 0; i < 2; i++) {
             columns[i] = readOnly;
         }
         for (i = 2; i < 10; i++) {
             columns[i] = numeric;
             colHeaders[i] = i - 2;
         }

         HandsonTable.attachTo('.js-handsontable', {
             colHeaders: colHeaders,
             rowHeaders: false,
             columns: columns,
             fixedColumnsLeft: 2,
             startRows: 24
         });


});