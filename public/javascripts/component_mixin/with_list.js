"use strict";

define(function(require) {

  var compose = require('flight').compose;
  var withHandlebars = require('component_mixin/with_handlebars');

  function withList() {
    compose.mixin(this, [withHandlebars]);

    this.attributes({
      receivedDataEvent: null,
      needsDataEvent: null,
      template: null,
      noResultsTemplate: null
    });

    this.handleDataReceived = function(e, data) {
      this.data = data;
      this.render();
    };

    this.render = function() {
      if(this.data == null) {
        return;
      }

      var template;
      if(this.data.meta.toplam == 0) {
        template = this.noResultsTemplate;
      } else {
        template = this.currentTemplate;
      }

      var html = template(this.data);
      this.$node.html(html);
      this.trigger("tableLoaded");
    };

    this.after('initialize', function() {
      this.template = this.compile(this.attr.template);
      this.noResultsTemplate = this.compile(this.attr.noResultsTemplate);
      this.currentTemplate = this.template;
      this.on(document, this.attr.receivedDataEvent, this.handleDataReceived);

      this.trigger(this.attr.needsDataEvent, {
        sayfa: this.attr.sayfa,
        adet: this.attr.adet
      });
    });
  }

  return withList;
});
