"use strict";

/*
 
 For datepicker add this to default attributes
 
 datepicker:[
   {
     selector: (selector) for datepicker dom element
     opts: (object) datepicker compoenent options object
   } 
 ]
 
 */

define([ 'require', 'datepicker.tr' ],

function(require) {

  var compose = require('flight').compose;
  var withI18N = require('component_mixin/with_i18n');

  function withForm() {

    compose.mixin(this, [withI18N]);

    this.defaultAttrs({

    });

    this.handleFormActionChange = function(e, data) {
      this.select('formSelector').attr('action', data.formAction);
    }

    this.handleFormSubmit = function(e, formData) {
      e.preventDefault();
      var self = this;
      var $frm = $(formData.el);

      $.ajax({
        type : $frm.attr('method'),
        url : $frm.attr('action'),
        data : $frm.serialize()
      }).done(
          function(data) {
            $frm.trigger("reset");
            self.$node.addClass('hide');
            self.trigger(self.attr.formSubmitSuccessEventListener,
                self.attr.formSubmitSuccessEvent, data);
          }).fail(
          function(data) {
            self.trigger(self.attr.formSubmitFailEventListener,
                self.attr.formSubmitFailEvent, data);
          }).always(function() {
      });
    }

    this.after('initialize', function() {
      this.on('submit', {
        formSelector : this.handleFormSubmit
      });
      this.on(document, this.attr.formActionChangeEvent,
          this.handleFormActionChange);

      //add datepicker if present
      if (this.attr.datepicker) {
        self = this;
        this.attr.datepicker.map(function(d) {
          d.opts.format = self.messageForKey('date.format');
          d.opts.lang = self.messageForKey('lang');
          $(d.selector, self.$node).datepicker(d.opts);
        });
      }

    });
  }

  return withForm;

});
