"use strict";

define(function(require) {
  var flight = require('flight');
  var withHandlebars = require('component_mixin/with_handlebars');

  function withMinimizable() {
    flight.compose.mixin(this, [withHandlebars]);

    this.attributes({
      widgetStatus: null,
      minTemplate: null
    });

    this.setWidgetStatus = function(widgetStatus) {
      switch(widgetStatus) {
        case 'maximized':
          this.widgetStatus = widgetStatus;
          this.currentTemplate = this.template;
          break;
        case 'minimized':
          this.widgetStatus = widgetStatus;
          this.currentTemplate = this.minTemplate;
          break;
        default:
          throw "Unknown widgetStatus";
      }
    };

    this.handleWidgetStatusChange = function(e, data) {
      this.setWidgetStatus(data.widgetStatus);
      this.render();
    };

    this.after('initialize', function() {
      this.minTemplate = this.compile(this.attr.minTemplate);
      this.setWidgetStatus(this.attr.widgetStatus);
      this.on('uiNeedsWidgetChildStatusChange', this.handleWidgetStatusChange);
    });
  }

  return withMinimizable;
});
