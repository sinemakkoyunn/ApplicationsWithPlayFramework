'use strict';

/*

 Attributes

 editableElements: (selector) elements to attach editable
 placement: x-editable placement option
 url: x-editable ajax call url
 ajaxOptions: (object) ajax options for x-editable
 editableEnableEvent: (event) enable x-editable on selected elements
 editableDisableEvent: (event) disable x-editable on selected elements
 onSuccess: (array) array of objects to call events after save
 {event: (event) event to fire
 eventListener: (selector) event listener
 eventData: (object) data object to send with event

 */

define(['require', 'bootstrap-editable'], function (require) {

  var defineComponent = require('flight').component;

  // define the component
  return defineComponent(editable);

  function editable() {
    this.defaultAttrs({
      editableElements: '.js-editable',
      placement: 'bottom',
      url: '#',
      ajaxOptions: {type: "PUT"},
      editableEnableEvent: 'uiWantsToBeEditable',
      editableDisableEvent: 'uiWantsNotToBeEditable',
      onSuccess: [
        {event: 'uiEditableSuccess',
          eventListener: document,
          eventData: {}
        }
      ]
    });

    this.handleEnable = function () {
      var self = this;

      //Fire events after save
      this.select('editableElements').on('save', function (e, params) {
        self.attr.onSuccess.map(function (success) {
          self.trigger(success.eventListener, success.event, success.eventData);
        });
      });

      //Set elements editable
      this.select('editableElements').editable({
        placement: self.attr.placement,
        url: self.attr.url,
        ajaxOptions: self.attr.ajaxOptions,
        disabled: false,
        error: function (response, newValue) {
          return response.responseText;
        }
      });
    }

    this.handleDisable = function () {
      this.select('editableElements').editable({
        disabled: true
      });
    }

    this.after('initialize', function () {
      this.on(this.attr.editableEnableEvent, this.handleEnable);
      this.on(this.attr.editableDisableEvent, this.handleDisable);
    });
  }
});
