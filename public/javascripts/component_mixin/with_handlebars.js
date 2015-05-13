"use strict";

define(
  [
    'require',
    'handlebars'
  ],

  function(require, Handlebars) {

    function withHandlebars() {

      Handlebars.registerHelper('formatDate', function(timestamp) {
        return new Date(timestamp).toLocaleDateString();
      });

      Handlebars.registerHelper('pad', function(num, size) {
        var s = num + '';
        while (s.length < size) s = "0" + s;
        return s;
      });

      Handlebars.registerHelper('t', function(key, context) {
        var result = key || '';
        return Handlebars.compile(result)(context.data.root);
      });

      Handlebars.registerHelper('dam', function(num, size, str) {
        if (num == -1) {
          return str;
        }
        var s = num + '';
        while (s.length < size) s = "0" + s;
        return s;
      });

      Handlebars.registerHelper('selected', function(option, value){
        if (option === value) {
          return ' selected';
        } else {
          return ''
        }
      });

      Handlebars.registerHelper('checked', function (currentValue) {
        return currentValue == true ? ' checked ' : '';
      });

      Handlebars.registerHelper('not', function (value) {
        return !value;
      });

      this.compile = Handlebars.compile;
    }

    return withHandlebars;
  }
);
