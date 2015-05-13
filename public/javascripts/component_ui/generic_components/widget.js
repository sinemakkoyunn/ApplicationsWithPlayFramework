"use strict";

define(function(require) {
  var flight = require('flight');
  var withHandlebars = require('component_mixin/with_handlebars');

  return flight.component(withHandlebars, widget);

  function widget() {
    this.attributes({
      template:
        '<div class="{{clazz}} js-widget">\
          <div class="panel panel-default">\
            <div class="panel-heading">\
              <span>{{{heading}}}</span>\
              <div class="pull-right">\
                <button class="js-minimize btn btn-default btn-xs {{#if minimized}}hide{{/if}}">\
                  <span class="glyphicon glyphicon-resize-small"></span>\
                </button>\
                <button class="js-maximize btn btn-default btn-xs {{#unless minimized}}hide{{/unless}}">\
                  <span class="glyphicon glyphicon-resize-full"></span>\
                </button>\
                {{#if closable}}\
                <button class="js-close btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>\
                {{/if}}\
              </div>\
            </div>\
            <div class="panel-body">{{{bodyTemplate}}}</div>\
          </div>\
        </div>',
      widgetStatus: null, // maximized or minimized
      closed: false,
      minClazz: null,
      maxClazz: null,
      heading: null,
      closable: false,
      widgetSelector: '.js-widget',
      minimizeSelector: '.js-minimize',
      maximizeSelector: '.js-maximize',
      closeSelector: '.js-close',
      childSelectors: null
    });

    this.refreshChildren = function() {
      var self = this;
      this.attr.childSelectors.forEach(function(selector) {
        self.trigger(selector, 'uiNeedsWidgetChildStatusChange', {
          widgetStatus: self.widgetStatus
        });
      });
    };

    this.handleMinimize = function(e) {
      e.preventDefault();
      this.widgetStatus = 'minimized';
      this.select('maximizeSelector').removeClass('hide');
      this.select('minimizeSelector').addClass('hide');
      this.select('widgetSelector').removeClass(this.attr.maxClazz);
      this.select('widgetSelector').addClass(this.attr.minClazz);
      this.refreshChildren();
    };

    this.handleMaximize = function(e) {
      e.preventDefault();
      this.widgetStatus = 'maximized';
      this.select('maximizeSelector').addClass('hide');
      this.select('minimizeSelector').removeClass('hide');
      this.select('widgetSelector').removeClass(this.attr.minClazz);
      this.select('widgetSelector').addClass(this.attr.maxClazz);
      this.refreshChildren();
    };

    this.handleClose = function(e) {
      if(!this.attr.closable) {
        return;
      }
      e.preventDefault();
      this.widgetStatus = 'closed';
      this.hide();
    };

    this.show = function() {
      this.$node.removeClass('hide');
    };

    this.hide = function() {
      this.$node.addClass('hide');
    };

    this.after('initialize', function() {
      this.on('uiNeedsWidgetShow', this.show);
      this.on('uiNeedsWidgetHide', this.hide);
      this.on('uiNeedsWidgetStatusChange', function(e, data) {
        if(data.widgetStatus === 'maximized') {
          this.handleMaximize(e);
        } else {
          this.handleMinimize(e);
        }
      });
      this.on('click', {
        minimizeSelector: this.handleMinimize,
        maximizeSelector: this.handleMaximize,
        closeSelector: this.handleClose
      });

      this.widgetStatus = this.attr.widgetStatus;
      this.bodyTemplate = this.$node.html();
      this.template = this.compile(this.attr.template);

      var html = this.template({
        clazz: this.widgetStatus === 'maximized' ? this.attr.maxClazz : this.attr.minClazz,
        bodyTemplate: this.bodyTemplate,
        heading: this.attr.heading,
        closable: this.attr.closable,
        minimized: this.widgetStatus === 'minimized'
      });

      this.$node.html(html);

      if(!this.attr.closed) {
        this.show();
      }
    });
  }
});
