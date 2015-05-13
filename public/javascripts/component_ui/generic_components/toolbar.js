'use strict';

define(function (require) {
  var defineComponent = require('flight').component;

  return defineComponent(toolbar);

  function toolbar() {

    this.attributes({
      toolbarSelector: '.js-new-selector',
      newEventTarget: null,
      newEvent: null
    });

    this.handleNew = function (e) {
      e.preventDefault();
      this.trigger(this.attr.newEventTarget, this.attr.newEvent);
      this.trigger('uiNeedsWidgetStatusChange', {
        widgetStatus: 'minimized'
      });
    };

    this.after('initialize', function () {
      this.on('click', {
        toolbarSelector: this.handleNew
      });
    });
  }
});
